import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import * as db from "./db";

// Admin-only procedure
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin yetkisi gerekli' });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ============ SERVICES ============
  services: router({
    list: publicProcedure.query(async () => {
      return await db.getAllServices(true);
    }),
    
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const service = await db.getServiceBySlug(input.slug);
        if (!service) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Hizmet bulunamadı' });
        }
        return service;
      }),
    
    // Admin operations
    listAll: adminProcedure.query(async () => {
      return await db.getAllServices(false);
    }),
    
    create: adminProcedure
      .input(z.object({
        slug: z.string(),
        title: z.string(),
        description: z.string().optional(),
        shortDescription: z.string().optional(),
        durationMin: z.number(),
        benefits: z.string().optional(),
        contraindications: z.string().optional(),
        gallery: z.string().optional(),
        category: z.string().optional(),
        price: z.number().optional(),
        active: z.boolean().default(true),
        featured: z.boolean().default(false),
        order: z.number().default(0),
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await db.createService(input);
        return { success: true };
      }),
    
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        updates: z.object({
          slug: z.string().optional(),
          title: z.string().optional(),
          description: z.string().optional(),
          shortDescription: z.string().optional(),
          durationMin: z.number().optional(),
          benefits: z.string().optional(),
          contraindications: z.string().optional(),
          gallery: z.string().optional(),
          category: z.string().optional(),
          price: z.number().optional(),
          active: z.boolean().optional(),
          featured: z.boolean().optional(),
          order: z.number().optional(),
          metaTitle: z.string().optional(),
          metaDescription: z.string().optional(),
        }),
      }))
      .mutation(async ({ input }) => {
        await db.updateService(input.id, input.updates);
        return { success: true };
      }),
    
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteService(input.id);
        return { success: true };
      }),
  }),

  // ============ STAFF ============
  staff: router({
    list: publicProcedure.query(async () => {
      return await db.getAllStaff(true);
    }),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const member = await db.getStaffById(input.id);
        if (!member) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Personel bulunamadı' });
        }
        return member;
      }),
    
    listAll: adminProcedure.query(async () => {
      return await db.getAllStaff(false);
    }),
    
    create: adminProcedure
      .input(z.object({
        name: z.string(),
        title: z.string().optional(),
        bio: z.string().optional(),
        photo: z.string().optional(),
        specialties: z.string().optional(),
        availability: z.string().optional(),
        active: z.boolean().default(true),
        order: z.number().default(0),
      }))
      .mutation(async ({ input }) => {
        await db.createStaff(input);
        return { success: true };
      }),
    
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        updates: z.object({
          name: z.string().optional(),
          title: z.string().optional(),
          bio: z.string().optional(),
          photo: z.string().optional(),
          specialties: z.string().optional(),
          availability: z.string().optional(),
          active: z.boolean().optional(),
          order: z.number().optional(),
        }),
      }))
      .mutation(async ({ input }) => {
        await db.updateStaff(input.id, input.updates);
        return { success: true };
      }),
  }),

  // ============ APPOINTMENTS ============
  appointments: router({
    create: protectedProcedure
      .input(z.object({
        serviceId: z.number(),
        staffId: z.number().optional(),
        customerName: z.string(),
        customerEmail: z.string().email(),
        customerPhone: z.string(),
        appointmentDate: z.date(),
        startTime: z.date(),
        endTime: z.date(),
        note: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        // Çakışma kontrolü
        const hasConflict = await db.checkAppointmentConflict(
          input.staffId || null,
          input.startTime,
          input.endTime
        );
        
        if (hasConflict) {
          throw new TRPCError({ 
            code: 'CONFLICT', 
            message: 'Bu saat diliminde başka bir randevu mevcut' 
          });
        }
        
        await db.createAppointment({
          ...input,
          userId: ctx.user.id,
          status: 'pending',
        });
        
        return { success: true, message: 'Randevunuz oluşturuldu. En kısa sürede onaylanacaktır.' };
      }),
    
    myAppointments: protectedProcedure.query(async ({ ctx }) => {
      return await db.getAppointmentsByUser(ctx.user.id);
    }),
    
    listAll: adminProcedure.query(async () => {
      return await db.getAllAppointments();
    }),
    
    updateStatus: adminProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(['pending', 'confirmed', 'cancelled', 'completed']),
        cancellationReason: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await db.updateAppointment(input.id, {
          status: input.status,
          cancellationReason: input.cancellationReason,
        });
        return { success: true };
      }),
    
    getByDateRange: adminProcedure
      .input(z.object({
        startDate: z.date(),
        endDate: z.date(),
      }))
      .query(async ({ input }) => {
        return await db.getAppointmentsByDateRange(input.startDate, input.endDate);
      }),
  }),

  // ============ REVIEWS ============
  reviews: router({
    list: publicProcedure
      .input(z.object({ serviceId: z.number().optional() }).optional())
      .query(async ({ input }) => {
        return await db.getApprovedReviews(input?.serviceId);
      }),
    
    featured: publicProcedure.query(async () => {
      return await db.getFeaturedReviews();
    }),
    
    create: protectedProcedure
      .input(z.object({
        serviceId: z.number().optional(),
        customerName: z.string(),
        rating: z.number().min(1).max(5),
        comment: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        await db.createReview({
          ...input,
          userId: ctx.user.id,
          isApproved: false, // Moderasyon gerekli
        });
        return { success: true, message: 'Yorumunuz incelendikten sonra yayınlanacaktır.' };
      }),
    
    listAll: adminProcedure.query(async () => {
      return await db.getAllReviews();
    }),
    
    approve: adminProcedure
      .input(z.object({
        id: z.number(),
        isApproved: z.boolean(),
        isFeatured: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        await db.updateReview(input.id, {
          isApproved: input.isApproved,
          isFeatured: input.isFeatured,
        });
        return { success: true };
      }),
  }),

  // ============ BLOG ============
  blog: router({
    list: publicProcedure.query(async () => {
      return await db.getPublishedBlogPosts();
    }),
    
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const post = await db.getBlogPostBySlug(input.slug);
        if (!post || !post.published) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Blog yazısı bulunamadı' });
        }
        
        // View count artır
        await db.incrementBlogViewCount(post.id);
        
        return post;
      }),
    
    listAll: adminProcedure.query(async () => {
      return await db.getAllBlogPosts();
    }),
    
    create: adminProcedure
      .input(z.object({
        slug: z.string(),
        title: z.string(),
        excerpt: z.string().optional(),
        content: z.string(),
        coverImage: z.string().optional(),
        category: z.string().optional(),
        tags: z.string().optional(),
        published: z.boolean().default(false),
        featured: z.boolean().default(false),
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        await db.createBlogPost({
          ...input,
          authorId: ctx.user.id,
          publishedAt: input.published ? new Date() : undefined,
        });
        return { success: true };
      }),
    
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        updates: z.object({
          slug: z.string().optional(),
          title: z.string().optional(),
          excerpt: z.string().optional(),
          content: z.string().optional(),
          coverImage: z.string().optional(),
          category: z.string().optional(),
          tags: z.string().optional(),
          published: z.boolean().optional(),
          featured: z.boolean().optional(),
          metaTitle: z.string().optional(),
          metaDescription: z.string().optional(),
        }),
      }))
      .mutation(async ({ input }) => {
        const updates = { ...input.updates };
        
        // Eğer published true yapılıyorsa publishedAt'i set et
        if (updates.published === true) {
          const existingPost = await db.getBlogPostBySlug(''); // ID ile al
          // @ts-ignore
          updates.publishedAt = new Date();
        }
        
        await db.updateBlogPost(input.id, updates);
        return { success: true };
      }),
  }),

  // ============ CONTACT ============
  contact: router({
    send: publicProcedure
      .input(z.object({
        name: z.string(),
        email: z.string().email(),
        phone: z.string().optional(),
        subject: z.string().optional(),
        message: z.string(),
      }))
      .mutation(async ({ input }) => {
        await db.createContactMessage(input);
        
        // TODO: E-posta bildirimi gönder
        
        return { success: true, message: 'Mesajınız alındı. En kısa sürede dönüş yapacağız.' };
      }),
    
    listAll: adminProcedure.query(async () => {
      return await db.getAllContactMessages();
    }),
    
    markAsRead: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.markContactMessageAsRead(input.id);
        return { success: true };
      }),
  }),

  // ============ SITE SETTINGS ============
  settings: router({
    get: publicProcedure
      .input(z.object({ key: z.string() }))
      .query(async ({ input }) => {
        return await db.getSiteSetting(input.key);
      }),
    
    getAll: publicProcedure.query(async () => {
      return await db.getAllSiteSettings();
    }),
    
    set: adminProcedure
      .input(z.object({
        key: z.string(),
        value: z.string(),
        description: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await db.setSiteSetting(input.key, input.value, input.description);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
