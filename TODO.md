# Shining Beauty & Wellness — Geliştirme TODO Listesi

## Durum ve Hızlı Özet
- Yerel geliştirme sunucusu çalışıyor (http://localhost:5173) ✅
- UI/UX iyileştirmeleri başladı (ServiceCards, Floating WhatsApp, Navbar) ✅

## Yapılacaklar

### Kurulum ve Altyapı
- [x] Depoyu klonla ve bağımlılıkları kur
- [x] Geliştirme sunucusunu çalıştır ve doğrula
- [ ] Vite build ve preview akışını doğrula (build:prod)

### UI/UX İyileştirmeleri
- [x] Modern ServiceCards komponentini oluştur
- [x] ServiceCards komponentini HomePage'e entegre et
- [x] Floating WhatsApp komponentini modernleştir
- [x] Navbar mikro etkileşimlerini iyileştir (hover/underline/transition)
- [ ] Testimonials bileşeni için hafif animasyonlar (fade/scale) ekle
- [ ] Gallery grid için modern layout + lazy loading ekle

### Form ve İşlevsellik
- [ ] Randevu/iletişim formu: Telefon required + maske (TR formatı), Hizmet seçimi required
- [ ] Form hata mesajları ve görsel geri bildirim (aria + accessible)
- [ ] Supabase edge function (create-appointment) ile bağlantıyı tekrar doğrula

### Entegrasyonlar
- [ ] Instagram Feed: Graph API'ye geçiş (token yönetimi + caching)
- [ ] (Opsiyonel) Supabase Edge Function ile Instagram proxy endpoint oluştur
- [ ] Google Maps Places API v2 migration (field masking + foto URL)

### Performans ve Core Web Vitals
- [ ] Görselleri WebP/AVIF + responsive srcset ile optimize et
- [ ] Kritik CSS ve üçüncü parti script erteleme (defer/async)
- [ ] Kod bölme (code-splitting) ve route-level lazy loading

### SEO ve İçerik
- [ ] JSON-LD (BeautySalon) schema markup ekle (global)
- [ ] Open Graph / Twitter meta etiketleri, canonical ve alt metinler
- [ ] sitemap.xml ve robots.txt güncelle
- [ ] Blog sayfasına ilk 3 yazıyı ekle (hazır içeriklerden)
- [ ] Galeri sayfasını medya ile doldur (lazy ve alt metinli)

### PWA ve Analitik
- [ ] Web App Manifest (ikonlar, theme_color, start_url)
- [ ] Service Worker (offline cache, offline.html)
- [ ] Google Analytics 4 (gtag) kurulumu + temel event’ler
- [ ] Web Vitals ölçümleyip analytics’e gönderme

### QA, Test ve Yayınlama
- [ ] E2E manuel test: navigasyon, formlar, mobil viewport
- [ ] Erişilebilirlik hızlı tarama (kontrast, odak sırası, aria)
- [ ] Vercel’e Deploy (preview -> production) ve smoke test
- [ ] İzleme/Monitoring kurulumu ve son kontroller
