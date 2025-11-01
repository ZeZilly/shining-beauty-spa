import { eq, and, gte, lte, desc, asc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, users, 
  services, Service, InsertService,
  staff, Staff, InsertStaff,
  appointments, Appointment, InsertAppointment,
  reviews, Review, InsertReview,
  blogPosts, BlogPost, InsertBlogPost,
  contactMessages, ContactMessage, InsertContactMessage,
  siteSettings, SiteSetting, InsertSiteSetting
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ============ USER OPERATIONS ============

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "phone", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ============ SERVICE OPERATIONS ============

export async function getAllServices(activeOnly = true) {
  const db = await getDb();
  if (!db) return [];
  
  const query = activeOnly 
    ? db.select().from(services).where(eq(services.active, true)).orderBy(asc(services.order))
    : db.select().from(services).orderBy(asc(services.order));
  
  return await query;
}

export async function getServiceBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(services).where(eq(services.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getServiceById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(services).where(eq(services.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createService(service: InsertService) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(services).values(service);
  return result;
}

export async function updateService(id: number, updates: Partial<InsertService>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(services).set(updates).where(eq(services.id, id));
}

export async function deleteService(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(services).where(eq(services.id, id));
}

// ============ STAFF OPERATIONS ============

export async function getAllStaff(activeOnly = true) {
  const db = await getDb();
  if (!db) return [];
  
  const query = activeOnly 
    ? db.select().from(staff).where(eq(staff.active, true)).orderBy(asc(staff.order))
    : db.select().from(staff).orderBy(asc(staff.order));
  
  return await query;
}

export async function getStaffById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(staff).where(eq(staff.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createStaff(member: InsertStaff) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(staff).values(member);
  return result;
}

export async function updateStaff(id: number, updates: Partial<InsertStaff>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(staff).set(updates).where(eq(staff.id, id));
}

// ============ APPOINTMENT OPERATIONS ============

export async function createAppointment(appointment: InsertAppointment) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(appointments).values(appointment);
  return result;
}

export async function getAppointmentById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(appointments).where(eq(appointments.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAppointmentsByUser(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(appointments)
    .where(eq(appointments.userId, userId))
    .orderBy(desc(appointments.appointmentDate));
}

export async function getAppointmentsByDateRange(startDate: Date, endDate: Date) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(appointments)
    .where(
      and(
        gte(appointments.appointmentDate, startDate),
        lte(appointments.appointmentDate, endDate)
      )
    )
    .orderBy(asc(appointments.appointmentDate));
}

export async function checkAppointmentConflict(
  staffId: number | null,
  startTime: Date,
  endTime: Date,
  excludeAppointmentId?: number
) {
  const db = await getDb();
  if (!db) return false;
  
  let query = db.select().from(appointments).where(
    and(
      staffId ? eq(appointments.staffId, staffId) : undefined,
      // Çakışma kontrolü: yeni randevu mevcut randevularla çakışıyor mu?
      // (start < existing.end) AND (end > existing.start)
      // Status cancelled olmayanları kontrol et
      eq(appointments.status, "confirmed")
    )
  );
  
  const existingAppointments = await query;
  
  return existingAppointments.some(apt => {
    if (excludeAppointmentId && apt.id === excludeAppointmentId) return false;
    
    const aptStart = new Date(apt.startTime);
    const aptEnd = new Date(apt.endTime);
    
    return (startTime < aptEnd && endTime > aptStart);
  });
}

export async function updateAppointment(id: number, updates: Partial<InsertAppointment>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(appointments).set(updates).where(eq(appointments.id, id));
}

export async function getAllAppointments() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(appointments).orderBy(desc(appointments.appointmentDate));
}

// ============ REVIEW OPERATIONS ============

export async function getApprovedReviews(serviceId?: number) {
  const db = await getDb();
  if (!db) return [];
  
  const query = serviceId
    ? db.select().from(reviews).where(
        and(
          eq(reviews.isApproved, true),
          eq(reviews.serviceId, serviceId)
        )
      ).orderBy(desc(reviews.createdAt))
    : db.select().from(reviews).where(eq(reviews.isApproved, true)).orderBy(desc(reviews.createdAt));
  
  return await query;
}

export async function getFeaturedReviews() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(reviews)
    .where(
      and(
        eq(reviews.isApproved, true),
        eq(reviews.isFeatured, true)
      )
    )
    .orderBy(desc(reviews.createdAt))
    .limit(6);
}

export async function createReview(review: InsertReview) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(reviews).values(review);
  return result;
}

export async function getAllReviews() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(reviews).orderBy(desc(reviews.createdAt));
}

export async function updateReview(id: number, updates: Partial<InsertReview>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(reviews).set(updates).where(eq(reviews.id, id));
}

// ============ BLOG OPERATIONS ============

export async function getPublishedBlogPosts() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(blogPosts)
    .where(eq(blogPosts.published, true))
    .orderBy(desc(blogPosts.publishedAt));
}

export async function getBlogPostBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createBlogPost(post: InsertBlogPost) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(blogPosts).values(post);
  return result;
}

export async function updateBlogPost(id: number, updates: Partial<InsertBlogPost>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(blogPosts).set(updates).where(eq(blogPosts.id, id));
}

export async function getAllBlogPosts() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
}

export async function incrementBlogViewCount(id: number) {
  const db = await getDb();
  if (!db) return;
  
  const post = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
  if (post.length > 0) {
    await db.update(blogPosts)
      .set({ viewCount: (post[0].viewCount || 0) + 1 })
      .where(eq(blogPosts.id, id));
  }
}

// ============ CONTACT MESSAGE OPERATIONS ============

export async function createContactMessage(message: InsertContactMessage) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(contactMessages).values(message);
  return result;
}

export async function getAllContactMessages() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
}

export async function markContactMessageAsRead(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(contactMessages).set({ isRead: true }).where(eq(contactMessages.id, id));
}

// ============ SITE SETTINGS OPERATIONS ============

export async function getSiteSetting(key: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(siteSettings).where(eq(siteSettings.key, key)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function setSiteSetting(key: string, value: string, description?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const existing = await getSiteSetting(key);
  
  if (existing) {
    await db.update(siteSettings)
      .set({ value, description: description || existing.description })
      .where(eq(siteSettings.key, key));
  } else {
    await db.insert(siteSettings).values({ key, value, description });
  }
}

export async function getAllSiteSettings() {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(siteSettings);
}
