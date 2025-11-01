import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, datetime } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 20 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Services table - Spa, masaj, cilt bakımı vb. hizmetler
 */
export const services = mysqlTable("services", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  shortDescription: varchar("shortDescription", { length: 500 }),
  durationMin: int("durationMin").notNull(), // Dakika cinsinden süre
  benefits: text("benefits"), // JSON array olarak saklanacak
  contraindications: text("contraindications"), // JSON array
  gallery: text("gallery"), // JSON array - görsel URL'leri
  category: varchar("category", { length: 100 }), // spa, masaj, cilt-bakimi, vb.
  price: int("price"), // Opsiyonel - fiyat gösterilmeyebilir
  active: boolean("active").default(true).notNull(),
  featured: boolean("featured").default(false).notNull(),
  order: int("order").default(0), // Sıralama için
  metaTitle: varchar("metaTitle", { length: 255 }),
  metaDescription: varchar("metaDescription", { length: 500 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Service = typeof services.$inferSelect;
export type InsertService = typeof services.$inferInsert;

/**
 * Staff table - Personel/uzmanlar
 */
export const staff = mysqlTable("staff", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }), // Ör: "Cilt Bakım Uzmanı"
  bio: text("bio"),
  photo: varchar("photo", { length: 500 }),
  specialties: text("specialties"), // JSON array
  availability: text("availability"), // JSON - haftalık müsaitlik takvimi
  active: boolean("active").default(true).notNull(),
  order: int("order").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Staff = typeof staff.$inferSelect;
export type InsertStaff = typeof staff.$inferInsert;

/**
 * Appointments table - Randevular
 */
export const appointments = mysqlTable("appointments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(), // users tablosuna referans
  serviceId: int("serviceId").notNull(), // services tablosuna referans
  staffId: int("staffId"), // Opsiyonel - belirli bir personel seçilebilir
  customerName: varchar("customerName", { length: 255 }).notNull(),
  customerEmail: varchar("customerEmail", { length: 320 }).notNull(),
  customerPhone: varchar("customerPhone", { length: 20 }).notNull(),
  appointmentDate: datetime("appointmentDate").notNull(), // Randevu tarihi ve saati
  startTime: datetime("startTime").notNull(),
  endTime: datetime("endTime").notNull(),
  note: text("note"), // Müşteri notu
  status: mysqlEnum("status", ["pending", "confirmed", "cancelled", "completed"]).default("pending").notNull(),
  cancellationReason: text("cancellationReason"),
  reminderSent: boolean("reminderSent").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Appointment = typeof appointments.$inferSelect;
export type InsertAppointment = typeof appointments.$inferInsert;

/**
 * Reviews table - Müşteri yorumları
 */
export const reviews = mysqlTable("reviews", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"), // Opsiyonel - kayıtlı kullanıcı
  serviceId: int("serviceId"), // Hangi hizmet için
  customerName: varchar("customerName", { length: 255 }).notNull(),
  rating: int("rating").notNull(), // 1-5 yıldız
  comment: text("comment").notNull(),
  isApproved: boolean("isApproved").default(false).notNull(), // Moderasyon
  isFeatured: boolean("isFeatured").default(false).notNull(), // Öne çıkan yorumlar
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;

/**
 * Blog posts table
 */
export const blogPosts = mysqlTable("blogPosts", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  excerpt: varchar("excerpt", { length: 500 }),
  content: text("content").notNull(), // Markdown veya HTML
  coverImage: varchar("coverImage", { length: 500 }),
  authorId: int("authorId").notNull(), // users tablosuna referans
  category: varchar("category", { length: 100 }),
  tags: text("tags"), // JSON array
  published: boolean("published").default(false).notNull(),
  featured: boolean("featured").default(false).notNull(),
  viewCount: int("viewCount").default(0).notNull(),
  metaTitle: varchar("metaTitle", { length: 255 }),
  metaDescription: varchar("metaDescription", { length: 500 }),
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;

/**
 * Contact messages table - İletişim formu mesajları
 */
export const contactMessages = mysqlTable("contactMessages", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  subject: varchar("subject", { length: 255 }),
  message: text("message").notNull(),
  isRead: boolean("isRead").default(false).notNull(),
  isReplied: boolean("isReplied").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = typeof contactMessages.$inferInsert;

/**
 * Site settings table - Genel site ayarları
 */
export const siteSettings = mysqlTable("siteSettings", {
  id: int("id").autoincrement().primaryKey(),
  key: varchar("key", { length: 100 }).notNull().unique(),
  value: text("value"),
  description: varchar("description", { length: 500 }),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SiteSetting = typeof siteSettings.$inferSelect;
export type InsertSiteSetting = typeof siteSettings.$inferInsert;
