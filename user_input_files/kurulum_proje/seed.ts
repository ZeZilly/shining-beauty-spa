import { drizzle } from "drizzle-orm/mysql2";
import { services, staff, reviews, blogPosts, siteSettings } from "../drizzle/schema";

const db = drizzle(process.env.DATABASE_URL!);

async function seed() {
  console.log("🌱 Veritabanı seed işlemi başlıyor...");

  // Hizmetler
  console.log("📝 Hizmetler ekleniyor...");
  await db.insert(services).values([
    {
      slug: "spa-masaj",
      title: "Spa Masajı",
      description: "Rahatlatıcı spa masajı ile stresinizi atın ve kaslarınızı gevşetin. Aromaterapi yağları ile yapılan masajımız, vücudunuzu ve zihninizi dinlendirir.",
      shortDescription: "Rahatlatıcı spa masajı ile stresinizi atın",
      durationMin: 60,
      benefits: JSON.stringify([
        "Stres ve gerginliği azaltır",
        "Kan dolaşımını iyileştirir",
        "Kas ağrılarını hafifletir",
        "Uyku kalitesini artırır",
        "Zihinsel berraklık sağlar"
      ]),
      contraindications: JSON.stringify([
        "Hamilelik",
        "Yüksek tansiyon",
        "Kalp hastalıkları",
        "Açık yaralar"
      ]),
      category: "spa",
      active: true,
      featured: true,
      order: 1,
      metaTitle: "Spa Masajı | Shining Beauty",
      metaDescription: "Rahatlatıcı spa masajı ile stresinizi atın. Aromaterapi yağları ile profesyonel masaj hizmeti."
    },
    {
      slug: "cilt-bakimi",
      title: "Profesyonel Cilt Bakımı",
      description: "Cilt tipinize özel hazırlanan profesyonel cilt bakımı ile cildinizi yenileyin. Derinlemesine temizlik, peeling, maske ve nemlendirme aşamalarını içerir.",
      shortDescription: "Cilt tipinize özel profesyonel bakım",
      durationMin: 90,
      benefits: JSON.stringify([
        "Cildi derinlemesine temizler",
        "Gözenekleri sıkılaştırır",
        "Cilt tonunu eşitler",
        "Kırışıklıkları azaltır",
        "Cildi nemlendirir ve parlatır"
      ]),
      contraindications: JSON.stringify([
        "Aktif akne",
        "Egzama",
        "Sedef hastalığı",
        "Güneş yanığı"
      ]),
      category: "skincare",
      active: true,
      featured: true,
      order: 2,
      metaTitle: "Profesyonel Cilt Bakımı | Shining Beauty",
      metaDescription: "Cilt tipinize özel profesyonel cilt bakımı. Derinlemesine temizlik, peeling, maske ve nemlendirme."
    },
    {
      slug: "lazer-epilasyon",
      title: "Lazer Epilasyon",
      description: "Son teknoloji lazer cihazları ile kalıcı tüy azaltma. Tüm vücut bölgeleri için uygulanabilir, ağrısız ve etkili sonuçlar.",
      shortDescription: "Kalıcı tüy azaltma çözümü",
      durationMin: 45,
      benefits: JSON.stringify([
        "Kalıcı sonuçlar",
        "Ağrısız uygulama",
        "Tüm cilt tiplerine uygun",
        "Hızlı ve etkili",
        "Ciltte tahriş yapmaz"
      ]),
      contraindications: JSON.stringify([
        "Hamilelik ve emzirme",
        "Epilepsi",
        "Aktif cilt enfeksiyonları",
        "Son 2 hafta içinde güneşlenme"
      ]),
      category: "hair-removal",
      active: true,
      featured: true,
      order: 3,
      metaTitle: "Lazer Epilasyon | Shining Beauty",
      metaDescription: "Son teknoloji lazer epilasyon ile kalıcı tüy azaltma. Ağrısız ve etkili sonuçlar."
    },
    {
      slug: "derin-doku-masaji",
      title: "Derin Doku Masajı",
      description: "Kronik kas gerginliği ve ağrıları için özel olarak tasarlanmış derin doku masajı. Kasların derin katmanlarına ulaşarak gerginliği çözer.",
      shortDescription: "Kronik ağrılar için derin masaj",
      durationMin: 75,
      benefits: JSON.stringify([
        "Kronik ağrıları azaltır",
        "Kas sertliğini giderir",
        "Postürü iyileştirir",
        "Hareket kabiliyetini artırır",
        "Yaralanma iyileşmesini hızlandırır"
      ]),
      category: "spa",
      active: true,
      order: 4
    },
    {
      slug: "anti-aging-bakim",
      title: "Anti-Aging Cilt Bakımı",
      description: "Yaşlanma karşıtı özel serum ve maskelerle cildinizi gençleştirin. Kolajen üretimini artıran ve kırışıklıkları azaltan profesyonel bakım.",
      shortDescription: "Gençleştirici cilt bakımı",
      durationMin: 120,
      benefits: JSON.stringify([
        "Kırışıklıkları azaltır",
        "Cilt elastikiyetini artırır",
        "Kolajen üretimini destekler",
        "Cilt tonunu eşitler",
        "Yaşlılık lekelerini azaltır"
      ]),
      category: "skincare",
      active: true,
      order: 5
    },
    {
      slug: "aromaterapi-masaji",
      title: "Aromaterapi Masajı",
      description: "Doğal uçucu yağlar ile yapılan rahatlatıcı masaj. Lavanta, gül, portakal gibi yağlar ile hem bedeninizi hem de zihninizi dinlendirin.",
      shortDescription: "Doğal yağlarla rahatlatıcı masaj",
      durationMin: 60,
      benefits: JSON.stringify([
        "Stresi azaltır",
        "Ruh halini iyileştirir",
        "Uyku kalitesini artırır",
        "Bağışıklık sistemini güçlendirir",
        "Cildi besler"
      ]),
      category: "spa",
      active: true,
      order: 6
    }
  ]);

  // Personel
  console.log("👥 Personel ekleniyor...");
  await db.insert(staff).values([
    {
      name: "Ayşe Yılmaz",
      title: "Cilt Bakım Uzmanı",
      bio: "10 yıllık deneyime sahip profesyonel cilt bakım uzmanı. Uluslararası sertifikalara sahip, cilt sağlığı konusunda uzman.",
      specialties: JSON.stringify(["Cilt Bakımı", "Anti-Aging", "Akne Tedavisi"]),
      availability: JSON.stringify({
        monday: { start: "09:00", end: "18:00" },
        tuesday: { start: "09:00", end: "18:00" },
        wednesday: { start: "09:00", end: "18:00" },
        thursday: { start: "09:00", end: "18:00" },
        friday: { start: "09:00", end: "18:00" },
        saturday: { start: "10:00", end: "17:00" }
      }),
      active: true,
      order: 1
    },
    {
      name: "Zeynep Kaya",
      title: "Masaj Terapisti",
      bio: "Spa ve masaj terapisi alanında 8 yıllık deneyim. İsveç masajı, derin doku masajı ve aromaterapi konularında uzman.",
      specialties: JSON.stringify(["Spa Masajı", "Derin Doku", "Aromaterapi"]),
      availability: JSON.stringify({
        monday: { start: "10:00", end: "19:00" },
        tuesday: { start: "10:00", end: "19:00" },
        wednesday: { start: "10:00", end: "19:00" },
        thursday: { start: "10:00", end: "19:00" },
        friday: { start: "10:00", end: "19:00" },
        saturday: { start: "09:00", end: "18:00" }
      }),
      active: true,
      order: 2
    },
    {
      name: "Elif Demir",
      title: "Lazer Epilasyon Uzmanı",
      bio: "Lazer epilasyon ve cilt tedavileri konusunda 6 yıllık deneyim. Son teknoloji cihazlarla güvenli ve etkili uygulamalar.",
      specialties: JSON.stringify(["Lazer Epilasyon", "Cilt Tedavileri"]),
      availability: JSON.stringify({
        tuesday: { start: "09:00", end: "17:00" },
        wednesday: { start: "09:00", end: "17:00" },
        thursday: { start: "09:00", end: "17:00" },
        friday: { start: "09:00", end: "17:00" },
        saturday: { start: "10:00", end: "16:00" }
      }),
      active: true,
      order: 3
    }
  ]);

  // Yorumlar
  console.log("⭐ Müşteri yorumları ekleniyor...");
  await db.insert(reviews).values([
    {
      customerName: "Merve A.",
      rating: 5,
      comment: "Spa masajı harikaydı! Ayşe hanımın ellerine sağlık, çok rahatladım. Kesinlikle tavsiye ederim.",
      isApproved: true,
      isFeatured: true
    },
    {
      customerName: "Selin K.",
      rating: 5,
      comment: "Cilt bakımı sonrası cildin inanılmaz pürüzsüz oldu. Profesyonel ekip ve hijyenik ortam için teşekkürler!",
      isApproved: true,
      isFeatured: true
    },
    {
      customerName: "Deniz Y.",
      rating: 5,
      comment: "Lazer epilasyon için 3. seansımdayım, sonuçlar muhteşem! Ağrısız ve çok etkili. Elif hanıma teşekkürler.",
      isApproved: true,
      isFeatured: true
    },
    {
      customerName: "Burcu T.",
      rating: 5,
      comment: "Derin doku masajı sırt ağrılarım için çok iyi geldi. Zeynep hanım çok profesyonel, kesinlikle tekrar geleceğim.",
      isApproved: true,
      isFeatured: true
    },
    {
      customerName: "Aylin S.",
      rating: 5,
      comment: "Anti-aging bakımdan sonra cildimdeki değişimi herkes fark etti. Harika bir deneyimdi, herkese tavsiye ederim!",
      isApproved: true,
      isFeatured: true
    },
    {
      customerName: "Gizem M.",
      rating: 5,
      comment: "Aromaterapi masajı tam bir rüya gibiydi. Hem rahatladım hem de cildin çok güzel koktu. Muhteşem!",
      isApproved: true,
      isFeatured: true
    }
  ]);

  // Blog yazıları
  console.log("📰 Blog yazıları ekleniyor...");
  await db.insert(blogPosts).values([
    {
      slug: "spa-masaji-faydalari",
      title: "Spa Masajı: Faydaları, Süre ve Kimler İçin Uygun?",
      excerpt: "Spa masajının vücudunuza ve zihninize sağladığı inanılmaz faydaları keşfedin. Stres azaltmadan kas gevşemesine kadar her şeyi öğrenin.",
      content: `# Spa Masajı: Faydaları, Süre ve Kimler İçin Uygun?

Spa masajı, günümüzün stresli yaşam temposunda kendinize ayırabileceğiniz en değerli hediyelerden biridir. Peki spa masajı tam olarak nedir ve vücudunuza ne gibi faydalar sağlar?

## Spa Masajı Nedir?

Spa masajı, aromaterapi yağları ve özel teknikler kullanılarak yapılan rahatlatıcı bir masaj türüdür. Genellikle sakin bir ortamda, yumuşak müzik eşliğinde uygulanır.

## Faydaları

- **Stres Azaltma**: Kortizol seviyesini düşürerek stresi azaltır
- **Kas Gevşemesi**: Gergin kasları rahatlatır ve ağrıları hafifletir
- **Kan Dolaşımı**: Kan dolaşımını iyileştirerek oksijen taşınmasını artırır
- **Uyku Kalitesi**: Daha iyi ve derin uyku sağlar
- **Bağışıklık Sistemi**: Bağışıklık sistemini güçlendirir

## Kimler İçin Uygun?

Spa masajı genel olarak herkes için uygundur, ancak bazı durumlarda doktor onayı gerekebilir...`,
      category: "Spa & Masaj",
      tags: JSON.stringify(["spa", "masaj", "sağlık", "wellness"]),
      published: true,
      featured: true,
      publishedAt: new Date(),
      authorId: 1,
      metaTitle: "Spa Masajı Faydaları ve Kimler İçin Uygun? | Shining Beauty",
      metaDescription: "Spa masajının vücudunuza ve zihninize sağladığı faydaları keşfedin. Uzman tavsiyeleri ile spa masajı hakkında her şey."
    },
    {
      slug: "cilt-bakimi-rehberi",
      title: "Cilt Bakımında Profesyonel Protokoller ve Ev Rutini",
      excerpt: "Profesyonel cilt bakımı ile ev bakımı arasındaki farkları öğrenin ve cildiniz için en iyi rutini oluşturun.",
      content: `# Cilt Bakımında Profesyonel Protokoller ve Ev Rutini

Sağlıklı ve parlak bir cilt için hem profesyonel bakım hem de düzenli ev rutini önemlidir...`,
      category: "Cilt Bakımı",
      tags: JSON.stringify(["cilt bakımı", "güzellik", "skincare"]),
      published: true,
      publishedAt: new Date(),
      authorId: 1
    }
  ]);

  // Site ayarları
  console.log("⚙️ Site ayarları ekleniyor...");
  await db.insert(siteSettings).values([
    {
      key: "site_name",
      value: "Shining Beauty Spa & Wellness",
      description: "Site adı"
    },
    {
      key: "site_tagline",
      value: "Adana'nın En Modern ve Lüks Spa Merkezi",
      description: "Site sloganı"
    },
    {
      key: "contact_phone",
      value: "+90 505 071 95 01",
      description: "İletişim telefonu"
    },
    {
      key: "contact_email",
      value: "shinings.pw@ud.me",
      description: "İletişim e-postası"
    },
    {
      key: "instagram_url",
      value: "https://www.instagram.com/shining.beauty.wellness",
      description: "Instagram profil linki"
    },
    {
      key: "whatsapp_url",
      value: "https://wa.me/905050719501",
      description: "WhatsApp iletişim linki"
    }
  ]);

  console.log("✅ Seed işlemi tamamlandı!");
}

seed()
  .catch((error) => {
    console.error("❌ Seed işlemi başarısız:", error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
