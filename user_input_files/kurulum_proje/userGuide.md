# Shining Beauty Spa & Wellness - Kullanıcı Kılavuzu

## Website Bilgileri

**Website URL:** https://shining-beauty.manus.space (yayınlandıktan sonra aktif olacak)

**Amaç:** Shining Beauty Spa & Wellness merkezi için modern, profesyonel bir web sitesi. Müşteriler hizmetleri inceleyebilir, randevu oluşturabilir ve blog yazılarını okuyabilir. Admin paneli üzerinden randevular ve içerikler yönetilebilir.

**Erişim:** Genel ziyaretçiler tüm sayfalara erişebilir. Randevu oluşturmak için giriş gereklidir. Admin paneline sadece admin rolüne sahip kullanıcılar erişebilir.

## Powered by Manus

Bu web sitesi Manus platformu üzerinde geliştirilmiştir ve modern web teknolojileri kullanılarak oluşturulmuştur.

**Teknoloji Altyapısı:**
- **Frontend:** React 19 + TypeScript + Tailwind CSS 4 + shadcn/ui component library ile modern, responsive kullanıcı arayüzü
- **Backend:** Node.js + Express 4 + tRPC 11 ile tip güvenli API katmanı
- **Veritabanı:** MySQL/TiDB ile ölçeklenebilir veri yönetimi, Drizzle ORM ile tip güvenli veritabanı işlemleri
- **Authentication:** Manus OAuth ile güvenli kullanıcı kimlik doğrulama sistemi
- **Deployment:** Otomatik ölçeklendirme altyapısı ile global CDN desteği

**Tasarım Özellikleri:**
- Koyu gri arka plan + altın vurgular ile premium görünüm
- Google Fonts (Montserrat, Playfair Display, Pacifico) ile profesyonel tipografi
- Tam mobil uyumlu responsive tasarım
- Smooth animasyonlar ve geçiş efektleri
- Modern card-based layout sistemi

**SEO ve Performans:**
- Dinamik meta etiketleri (Open Graph, Twitter Card)
- JSON-LD structured data (BeautySalon schema)
- Canonical URL'ler ve robots.txt yapılandırması
- Optimized asset loading ve caching stratejileri

## Web Sitenizi Kullanma

### Hizmetleri İnceleme

Ana sayfada "Hizmetlerimiz" butonuna tıklayın veya doğrudan "/hizmetler" sayfasına gidin. Burada tüm spa ve güzellik hizmetlerini görebilirsiniz. Arama kutusunu kullanarak hizmet arayabilir veya kategori butonlarıyla filtreleyebilirsiniz. Her hizmet kartında süre ve kısa açıklama bulunur. "Detayları Gör" butonuna tıklayarak hizmetin faydalarını, kontrendikasyonlarını ve tam açıklamasını görebilirsiniz.

### Randevu Oluşturma

Ana sayfada "Randevu Al" butonuna tıklayın. İlk olarak giriş yapmanız istenecek. Giriş yaptıktan sonra:

1. **Hizmet Seçimi:** Dropdown menüden almak istediğiniz hizmeti seçin
2. **Uzman Seçimi:** İsterseniz tercih ettiğiniz uzmanı seçin (opsiyonel)
3. **Tarih Seçimi:** Takvimden uygun bir tarih seçin (Pazar günleri kapalı)
4. **Saat Seçimi:** Müsait saat dilimlerinden birini seçin (09:00 - 20:00 arası)
5. **İletişim Bilgileri:** Ad, e-posta ve telefon bilgilerinizi girin
6. **Not:** Varsa özel isteklerinizi not alanına yazın

"Randevu Oluştur" butonuna tıkladığınızda randevunuz sisteme kaydedilir. Admin onayladıktan sonra e-posta ile bilgilendirilirsiniz.

### Blog Okuma

Ana sayfada "Güzellik ve Sağlık İpuçları" bölümünde blog yazılarını görebilirsiniz. "Devamını Oku" butonuna tıklayarak tam yazıyı okuyabilirsiniz. Blog yazıları cilt bakımı, spa terapileri ve wellness konularında uzman tavsiyeleri içerir.

### İletişim

Ana sayfanın en altında iletişim bilgilerimiz bulunur:
- **Telefon:** +90 505 071 95 01 (tıklayarak arayabilirsiniz)
- **E-posta:** shinings.pw@ud.me (tıklayarak e-posta gönderebilirsiniz)
- **Adres:** Gazipaşa, Adana
- **Sosyal Medya:** Instagram ve WhatsApp ikonlarına tıklayarak bize ulaşabilirsiniz

Sağ alt köşedeki yeşil WhatsApp butonuna tıklayarak doğrudan mesaj gönderebilirsiniz.

## Web Sitenizi Yönetme

### Admin Paneline Erişim

Admin rolüne sahip kullanıcılar "/admin" adresine giderek admin paneline erişebilir. Dashboard'da şu istatistikler görüntülenir:
- Bekleyen randevular sayısı
- Onaylı randevular sayısı
- Bekleyen yorumlar sayısı
- Okunmamış mesajlar sayısı

### Randevu Yönetimi

Admin panelinde "Randevular" kartına tıklayın veya "/admin/appointments" adresine gidin. Burada:
- Tüm randevuları tablo halinde görebilirsiniz
- Durum filtreleme yapabilirsiniz (Tümü, Bekliyor, Onaylandı, Tamamlandı, İptal)
- Bekleyen randevuları "Onayla" butonuyla onaylayabilirsiniz
- İstenmeyen randevuları "İptal" butonuyla iptal edebilirsiniz
- Onaylanan randevuları "Tamamlandı" olarak işaretleyebilirsiniz

### Veritabanı Yönetimi

Management UI'da "Database" panelini açarak:
- Tüm tabloları görüntüleyebilirsiniz (services, staff, appointments, reviews, blogPosts, vb.)
- Kayıtları ekleyebilir, düzenleyebilir veya silebilirsiniz
- Veritabanı bağlantı bilgilerine sol alt köşedeki ayarlardan erişebilirsiniz (SSL aktif etmeyi unutmayın)

### Site Ayarları

Management UI'da "Settings" panelini açarak:
- **General:** Site adı ve logo URL'sini değiştirebilirsiniz (VITE_APP_TITLE, VITE_APP_LOGO)
- **Domains:** Otomatik oluşturulan domain prefix'ini değiştirebilir veya özel domain bağlayabilirsiniz
- **Secrets:** Environment variable'ları görüntüleyebilir, düzenleyebilir veya silebilirsiniz

### Kod Yönetimi

Management UI'da "Code" panelini açarak:
- Tüm dosya ağacını görüntüleyebilirsiniz
- Dosyaları indirebilirsiniz
- "Download all files" seçeneğiyle tüm projeyi indirebilirsiniz

## Sonraki Adımlar

Manus AI ile istediğiniz zaman konuşarak web sitenizde değişiklik yapabilir veya yeni özellikler ekleyebilirsiniz. Örneğin:

- Blog yönetim sayfası ekleyebilirsiniz
- Galeri sayfası oluşturabilirsiniz
- İletişim formu ekleyebilirsiniz
- Hizmet yönetim paneli geliştirebilirsiniz
- Online ödeme sistemi entegre edebilirsiniz
- Çok dilli destek ekleyebilirsiniz

Web siteniz şu anda tam fonksiyonel ve yayına hazır durumda. Yayınlamak için Management UI'daki "Publish" butonuna tıklayın (önce checkpoint oluşturulması gerekir).

---

**Destek:** Herhangi bir sorunuz veya isteğiniz için Manus AI ile sohbet edebilirsiniz.
