export const COOKIE_NAME = "app_session_id";
export const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;
export const AXIOS_TIMEOUT_MS = 30_000;
export const UNAUTHED_ERR_MSG = 'Lütfen giriş yapın (10001)';
export const NOT_ADMIN_ERR_MSG = 'Yetkiniz bulunmamaktadır (10002)';

// Site bilgileri
export const SITE_INFO = {
  name: "Shining Beauty Spa & Wellness",
  tagline: "Adana'nın En Modern ve Lüks Spa Merkezi",
  description: "Profesyonel ekibimizle cilt bakımı, masaj, wellness ve daha fazlası. Şimdi randevu alın, kendinizi ödüllendirin!",
  phone: "+90 505 071 95 01",
  email: "shinings.pw@ud.me",
  address: {
    street: "Gazipaşa",
    city: "Adana",
    country: "Türkiye",
    postalCode: "01000",
  },
  social: {
    instagram: "https://www.instagram.com/shining.beauty.wellness",
    whatsapp: "https://wa.me/905050719501",
    facebook: "https://www.facebook.com/shiningbeauty",
  },
  hours: {
    weekdays: "09:00 - 20:00",
    saturday: "09:00 - 20:00",
    sunday: "Kapalı",
  },
};

// Hizmet kategorileri
export const SERVICE_CATEGORIES = [
  { id: "spa", name: "Spa & Masaj", icon: "🧖‍♀️" },
  { id: "skincare", name: "Cilt Bakımı", icon: "✨" },
  { id: "hair-removal", name: "Lazer Epilasyon", icon: "💆‍♀️" },
  { id: "wellness", name: "Wellness", icon: "🌿" },
  { id: "beauty", name: "Güzellik", icon: "💅" },
];

// Randevu saatleri (9:00 - 20:00 arası 30 dakikalık slotlar)
export const APPOINTMENT_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30",
];

// Çalışma günleri (0 = Pazar, 6 = Cumartesi)
export const WORKING_DAYS = [1, 2, 3, 4, 5, 6]; // Pazartesi - Cumartesi
