# Google Maps Platform API 2025: Spa/Güzellik Merkezleri İçin Optimizasyon ve Local SEO Entegrasyonu

## 1) Yönetici Özeti ve Stratejik Öne Çıkanlar

Google Haritalar, yerel keşfinin varsayılan başlangıç noktası olduğundan, spa ve güzellik merkezleri için görünürlük ve dönüşümün stratejik kalbidir. 2025 itibarıyla Google Maps Platform (GMP) üç kritik eksende olgunlaştı: 1) fiyatlandırma ve lisanslamada ürün kümeleriyle sadeleşme ve ücretsiz kullanım kaplarına geçiş; 2) gömme ve interaktivitede Maps Embed API ile hızlı, maliyet etkin deploy ve Maps JavaScript API ile ileri özelleştirme; 3) veri ve içerikte fotogerçekçi 3D haritaların genel kullanılabilirliği, yeni Place Photos akışı ve Google İşletme Profili (Google Business Profile, GBP) API’leriyle anlık bildirim ve güncellemeler. Bu dönüşümler birlikte, hem web deneyimini zenginleştiriyor hem de GBP üzerinden gerçek zamanlı işletme verisinin doğruluğunu artırıyor.[^9][^11][^6][^5][^1]

Bu rapor, pazarlama ve ürün ekiplerinin Google Haritalar üzerinden görünürlüğü ve rezervasyon/ilk temas dönüşümlerini artırmak için izleyeceği uygulanabilir bir yol haritası sunar. Teknik mimari, Place ID ile veri bütünlüğü, interaktif harita gömme seçenekleri, yorum ve fotoğraf entegrasyonu, anlık bilgi güncellemeleri, Türkiye’ye özgü lokalizasyon, Local SEO en iyi uygulamaları ve 2025 fiyatlandırma/lisans etkileri adım adım ele alınır.

Beklenen iş etkileri üç başlıkta toplanır: 
- Görünürlük: Doğru kategori/anahtar kelime stratejisi, güncel GBP verileri ve tutarlı NAP (Ad-Adres-Telefon) ile Haritalar’daki konumlandırmanın güçlendirilmesi.[^20][^19]
- İtibar: Yorumların hızla yanıtlanması, yüksek kaliteli görsellerin düzenli yenilenmesi ve yerel geri bağlantılarla tanınırlığın artırılması.[^19][^17]
- Rezervasyon ve ilk temas dönüşümleri: Harita ve GBP üzerinden doğrudan arama/yol tarifi/WhatsApp/telefon aksiyonlarının artırılması; web’de uygun gömme yönteminin seçimiyle sürtünmenin azaltılması.[^11][^18]

## 2) 2025 Değişim Özeti ve Etkileri

GMP, Mart 2025’te üç ürün kümesi (Essentials, Pro, Enterprise) altında sadeleşmiş bir yapıya geçti; aylık 200 dolar sabit kredi yerine SKU bazlı ücretsiz kullanım kapları ve genişletilmiş hacim indirimleri devreye girdi.[^9][^8][^10] Bu, düşük/orta ölçekli işletmeler için maliyet öngörülebilirliğini artırırken, yüksek hacimli kullanımda indirim eşiklerini optimize etmeyi gerektirir. Ayrıca bazı servislerde “Legacy” statüye çekilmeler yaşandı; yönlendirme ve geçiş planları 2025 boyunca gündemde kaldı.[^30][^29][^31]

Tablo 1, başlıca ürün kümeleri ve ücretsiz kullanım mantığını özetler.

Tablo 1 — Ürün kümeleri ve ücretsiz kullanım (Mart 2025 sonrası)
| Ürün Kümesi | Örnek API/Servisler | Ücretsiz Kullanım Yaklaşımı | Notlar |
|---|---|---|---|
| Essentials | Geocoding, Maps JavaScript kullanımına bağlı bazı SKU’lar | SKU başına aylık ücretsiz kota | Hacim indirimleri genişletildi; kuruma göre değişebilir.[^9][^10] |
| Pro | Places (New), Routes, Advanced Marks | SKU başına ücretsiz kota; aşımda artan birim maliyet | Places ve Routes yoğun senaryolarda maliyet optimizasyonu önemlidir.[^9][^8] |
| Enterprise | 3D/Photorealistic Tiles, gelişmiş analitik | Özel lisanslama ve sözleşme koşulları | Kurumsal projelerde fiyatlandırma proje bazlı değerlendirilebilir.[^9] |

Kritik etki: Sabit 200$ kredi yerine SKU bazlı ücretsiz kapalar, düşük trafiğe sahip spa/güzellik sitelerinde maliyeti fiilen sıfıra yaklaştırabilir; ancak yerel yoğun sezonlarda (ör. yaz dönemi) Places/Details çağrılarında maliyet kontrol mekanizmaları (cache, debouncing, alan maskeleri) şarttır.[^9][^10][^27]

Legacy ve geçiş sinyalleri: Bazı üçüncüü parti destek kaynakları, 2025’te Directions ve Distance Matrix API’lerinin “Legacy” olarak işaretlendiğini, yeni talepler için Routes API’ye geçilmesi gerektiğini belirtir.[^30][^29][^31] Bu nedenle rota ve mesafe hesaplamaları içeren uygulamalarda Routes API planlaması yapılmalıdır.

Bilgi boşluğu notu: Ürün kümelerine göre net fiyat/miktar eşikleri ve SLA detayları proje/hesap bazında değişebildiğinden, kesin rakamsal eşikler bu raporda verilmemektedir; fiyatlandırma sayfalarından ve sözleşmelerden teyit edilmelidir.[^9][^8][^10]

## 3) Teknik Mimari ve Entegrasyon Kararları

Spa/güzellik zincirleri için önerilen üst düzey mimari, üç kanatlı bir yaklaşımı benimser:

- Kanat A — Harita gömmeleri: Ziyaretçi trafiğine uygun hızda deploy ve düşük bakım yükü için Maps Embed API ile başlamak; ileri özelleştirme, iş kurallarına bağlı marker/katman mantığı ve 3D görselleştirme gerektiğinde Maps JavaScript API’ye yükseltmek.[^11][^7][^6]
- Kanat B — Yer verisi ve içerik: Place ID’yi veri modelinin ana anahtarı olarak benimsemek; Places (New) ile detay/fotoğraf ve Autocomplete (New) ile arama deneyimini zenginleştirmek; ilgili alan maskeleriyle maliyeti ve gecikmeyi yönetmek.[^13][^14][^28][^27]
- Kanat C — GBP senkronizasyon ve operasyon: GBP API’leriyle saatler, gönderiler, fotoğraflar ve yorum verilerini yönetmek; gerçek zamanlı bildirimlerle uyumsuzlukları yakalamak; web veri katmanından (ör. mağaza saatleri değişimleri) GBP’ye tek kaynak doğrulukla akış sağlamak.[^1][^3][^24]

Güvenlik ve uyumluluk, mimarinin çekirdeğidir: API anahtarlarının domain/HTTP referrer ve IP kısıtlarıyla korunması, yalnızca gerekli alanların talep edilmesi (alan maskeleri), verilerin uygun şekilde atıflandırılması ve önbellekleme kurallarına uyulması (özellikle fotoğraf ve içerik için).[^32][^14][^2]

Tablo 2 — Harita gömme seçenekleri karşılaştırması
| Ölçüt | Embed API | Maps JavaScript API |
|---|---|---|
| Entegrasyon hızı | Çok hızlı (iframe/HTTP) | Orta (JS SDK yükleme, kontrol setleri) |
| JavaScript gereksinimi | Yok | Var |
| Özelleştirme kapsamı | Sınırlı (mod/katman yok; hızlı kullanım) | Geniş (marker, event, 3D, ileri katmanlar) |
| Bakım yükü | Düşük | Orta/Yüksek |
| Önerilen kullanım | Basit gömme, hızlı yayına alma, düşük bütçe | Zengin etkileşim, iş kuralları, 3D deneyim |

Bu karşılaştırmaya göre, başlangıç aşamasında hızlı değer üretmek için Embed API, ürün-pazar uyumu test edildikten sonra JavaScript API ile derinleşmek mantıklıdır.[^11][^7][^6]

## 4) Place ID ile Veri Modelleme ve Bütünlük

Place ID, Google veri evreninde bir işletmenin “kimlik anahtarı”dır; adres değişse bile çoğu durumda Place ID ile veri bütünlüğü korunur.[^13] Place Details (New) yanıtında dönen `name` alanı, fotoğraf ve detay çağrıları için referans görevi görür; bu alanlar (özellikle fotoğraf `name`) geçici olduğundan önbelleğe alınmamalı, her ihtiyaç duyulduğunda güncel yanıttan yenilenmelidir.[^14][^2]

Pratik veri modelleme önerisi:
- Mağaza varlığı (Store) -> tek Place ID.
- İkincil varlıklar: Place Photos (her fotoğrafın `name`'i ayrı), yorumlar (GBP tarafında), saatler/iletişim (GBP + Places Details’te).[^14][^1]
- Operasyonel kontrol: Otomasyonla Place Details (New) ve GBP verilerini karşılaştır; saatler/URL/telefon uyuşmazlıklarında uyarı/alarm kuralları tetikle.[^14][^1]

Tablo 3 — Place Details (New) alan maskesi örnekleri ve senaryo eşlemesi
| Senaryo | Önerilen Alan Maskesi (fieldMask) | Not |
|---|---|---|
| Mağaza ana sayfa kartı (harita üstü basit bilgi) | `displayName,formattedAddress,location,regularOpeningHours,websiteUri,nationalPhoneNumber,internationalPhoneNumber` | Yalnızca gerekli alanları çağırmak gecikmeyi ve maliyeti düşürür.[^14][^27] |
| Detay sayfası (geniş içerik) | `displayName,formattedAddress,location,regularOpeningHours,websiteUri,nationalPhoneNumber,internationalPhoneNumber,regularPriceLevel,userRatingCount,ratingHistogram,photos` | Sadece kullanıcıya göstereceğiniz alanları talep edin; fotoğraflar için ayrı çağrı gerekir.[^14][^2][^27] |
| Rezervasyon/CTA ağırlıklı | `displayName,formattedAddress,location,regularOpeningHours,websiteUri,nationalPhoneNumber,internationalPhoneNumber` | CTA’ları destekleyen alanlara odaklanın.[^14][^27] |

### Places API v1 vs v2: Kapsamlı Karşılaştırma

Google Places API'sinin yeni sürümü (v2), önceki sürüme (v1) göre önemli iyileştirmeler sunmaktadır. Bu değişim, spa ve güzellik merkezlerinin Google Maps üzerindeki görünürlüğünü doğrudan etkilemektedir.[^27]

Tablo 3a — Places API v1 vs v2 Detaylı Karşılaştırma
| Özellik | Places API v1 (Legacy) | Places API v2 (New) | İyileştirme |
|---|---|---|---|
| **Veritabanı Boyutu** | Sınırlı veri | 200+ milyon işletme ve POI | %300+ artış |
| **Yer Türleri** | Temel kategoriler | Genişletilmiş türler (EV istasyonları, kahve dükkanları vb.) | Kapsamlı genişletme |
| **Gerçek Zamanlı Veri** | Statik veriler | Benzin fiyatları, şarj cihazı müsaitliği | Dinamik güncellemeler |
| **Konum Detayları** | Temel bilgiler | Ödeme yöntemleri, otopark türleri, evcil hayvan dostu | Zengin içerik |
| **Performans** | Klasik API performansı | İyileştirilmiş hız ve verimlilik | %40+ hız artışı |
| **Fiyatlandırma** | Karmaşık modeller | Kullanım tabanlı (sadece istenen veri için ödeme) | Optimize edilmiş |
| **Arama Özellikleri** | Temel arama | Gelişmiş otomatik tamamlama ve filtreleme | Akıllı arama |
| **Erişilebilirlik** | Sınırlı | Tuvalet mevcudiyeti, tekerlekli sandalye erişimi | Kapsayıcı tasarım |

## 4.1) API Optimization Stratejileri

Google Maps Platform optimization guide, güvenlik, performans ve maliyet yönetimi açısından kapsamlı stratejiler sunmaktadır:[^26]

### Güvenlik Optimizasyonu
- **API Anahtar Yönetimi**: HTTP referrer, IP ve mobil SDK kısıtlamaları ile anahtarları koruma
- **Proje Merkezli Kimlik**: API anahtarlarının proje bazlı yönetimi
- **İstenmeyen Kullanım Koruması**: Kotanın kötüye kullanılmasını önleyici güvenlik katmanları

### Performans Optimizasyonu
- **Exponential Backoff**: 500'li hatalar için otomatik geri çekilme mekanizması
- **User-Triggered Requests**: API çağrılarını sadece kullanıcı etkileşimi ile tetikleme
- **Marker Optimization**: Çoklu işaretleyicileri tek statik öğe olarak birleştirme
- **Marker Clustering**: Google'ın resmi Clusterer kütüphanesini kullanma

### Maliyet Optimizasyonu
- **Field Masking**: Sadece gerekli veri alanlarını talep etme
- **Request Batching**: Birden fazla isteği tek seferde gruplandırma
- **Rate Limiting**: Otomatik kota yönetimi ve uyarı sistemleri

Not: Alan maskeleri (field masks) hem isabeti hem de maliyet/performansı doğrudan etkiler. Yeni Places (New) sürümünde istek başına yalnızca gerekli alanları istemek iyi bir uygulamadır.[^14][^27]

## 5) Interactive Maps Embedding Seçenekleri ve Uygulama

Spa/güzellik merkezleri için interaktif harita, keşfi kolaylaştıran, güveni pekiştiren ve ilk teması tetikleyen bir dönüşüm bileşenidir. Embed API ile hızlı gömme mümkündür; daha ileri etkileşim, katman ve görselleştirme gerektiren deneyimler için Maps JavaScript API tercih edilmelidir.[^11][^7] 2025 itibarıyla fotogerçekçi 3D haritaların web’de genel kullanılabilirliği (GA) ileri seviye deneyimlerin önünü açmıştır; özellikle merkez mimarisi, çevre bağlamı ve erişilebilirlik bilgisi gibi içerikler 3D ortamda daha anlaşılır sunulabilir.[^6]

Mobilde performans, kullanıcı deneyiminin kritik belirleyicisidir. Harita yükleme stratejilerinde lazy-loading, kod bölünmesi ve CDN kullanımı gibi yöntemler, First Input Delay (FID) ve Cumulative Layout Shift (CLS) gibi metrikleri iyileştirir. Düşük bağlantı hızlarında görsel kalite/çözünürlük ayarları ve katmanları ertelemeli yüklemek faydalıdır.[^7]

Tablo 4 — Gömme yöntemleri karar matrisi
| Durum | Embed API | JS API | Not |
|---|---|---|---|
| Basit “Bizi bulun” kartı | Evet | Gerek yok | Düşük bakım, hızlı yayın.[^11] |
| Çoklu lokasyon, marker kümesi, filtre | Kısmi | Evet | JS API’de marker clustering ve event yönetimi gerekli.[^7] |
| 3D tur/immersive deneyim | Hayır | Evet | 3D Maps GA; mimari görselleştirmede güçlü.[^6] |
| Bütçe/ekip kısıtlı | Evet | Orta vadede | Önce hızlı değer, sonra ölçekleme. |

### API Rate Limits ve Optimizasyon (2025)

Google Maps Platform'un yeni fiyatlandırma yapısı ile birlikte API rate limits de güncellenmiştir:[^27]

- **Maps JavaScript API**: 3,000 element/dakika limit
- **Geocoding API**: 10,000 ücretsiz çağrı/ay (yeni model)
- **Places API**: SKU bazlı fiyatlandırma ile optimize edilmiş kullanım

### Önerilen Optimizasyon Teknikleri
1. **Request Caching**: Aynı veriler için gereksiz API çağrılarını önleme
2. **Progressive Loading**: Harita içeriğini kullanıcı etkileşimine göre yükleme
3. **Error Handling**: Exponential backoff ile hata yönetimi
4. **Quota Monitoring**: Gerçek zamanlı kullanım takibi ve uyarılar

## 6) Yorumlar ve Social Proof Entegrasyonu

Haritalar’daki yorumlar, yerel tanınırlık ve güvenin en görünür göstergelerinden biridir. GBP API’leri, yorumları listeleme ve yanıtlama işlevlerini destekler; ancak resmi API tarafında otomatik yanıt için bir “otomatik-reply” uç noktası yoktur. Bu nedenle moderasyon ve içerik kontrolü işletme tarafında kalmalıdır.[^17][^24]

Yorum stratejisinin omurgası:
- İzleme: Yeni yorumların bildirimini GBP API gerçek zamanlı bildirim akışlarıyla yakalamak.[^1][^3]
- Yanıt hızı ve ton: Olumlu/olumsuz tüm yorumlara hızlı, kişiselleştirilmiş ve çözüm odaklı yanıt vermek; ses tonunu kurumsal rehberle standardize etmek.[^17]
- Uygunsuz içerik: Spam/sahte yorumları GBP politikalarına uygun şekilde işaretleme/yönetme; süreç dokümantasyonu oluşturmak.[^24]

Tablo 5 — Yorum akışı ve sorumlu ekipler
| Adım | Açıklama | Araç/Kaynak | Sorumlu |
|---|---|---|---|
| 1. Yorum izleme | Yeni yorum bildirimi | GBP real-time notifications | Operasyon |
| 2. Kategorize etme | Olumlu/nötr/olumsuz; konu etiketi | Dahili etiketleme | Operasyon |
| 3. Taslak yanıt | Kurumsal tonla kişiselleştirme | Şablon + insan onayı | Pazarlama |
| 4. Yayınlama | Yanıtı yayınlama | GBP API veya panel | Operasyon |
| 5. İzleme | Yanıt sonrası etki ve yeni yorumlar | GBP performans metrikleri | Analitik |

Otomasyon sınırı: GBP’de resmi “otomatik yanıt” özelliği yoktur; araçlar yalnızca yardımcı iş akışları sunabilir. Tüm yanıtlar insan denetiminden geçmelidir.[^24]

## 7) Fotoğraf Galerisi Gömme ve Optimizasyon

Yeni Place Photos servisi, bir yerle ilgili fotoğrafları yüksek kalitede ve istenen boyutlarda sunar. İki aşamalı bir akışla çalışır: 1) Place Details/Nearby/Text Search yanıtlarında `photos[]` dizisinden fotoğraf `name` alanını çekmek; 2) Her `name` için Place Photos isteği göndererek görsele erişmek. `skipHttpRedirect=true` ile JSON içinde `photoUri` döndürüp istemci tarafında `<img>` ile göstermek, geliştirici deneyimini sadeleştirir. Dönen görsel JPEG/PNG/GIF olabilir; format garantisi yoktur.[^2]

Atıf ve uyumluluk kritik önemdedir: Yanıtta `authorAttributions` alanı varsa, görselin görüntülendiği her yerde atıf gereklidir. Fotoğraf `name` değerleri geçicidir ve önbelleğe alınmamalıdır; her kullanımda Places yanıtından yeni bir isim alınmalıdır.[^2]

Tablo 6 — Place Photos akışı kontrol listesi
| Adım | Kontrol | Not |
|---|---|---|
| 1 | `photos[]` alan maskesi | Place Details/Nearby/Text Search yanıtına `photos` dahil edilmeli.[^14][^2] |
| 2 | `name` doğruluğu | Her görsel için `places/.../photos/...` formatındaki `name` kullanılmalı.[^2] |
| 3 | Boyut parametreleri | `maxHeightPx` ve/veya `maxWidthPx` belirtilmeli (1–4800).[^2] |
| 4 | `skipHttpRedirect` tercihi | JSON `photoUri` için `true` önerilir; doğrudan görüntü için `false`.[^2] |
| 5 | Atıf | `authorAttributions` varsa görselin yanında/atfında gösterilmeli.[^2] |
| 6 | Hata yönetimi | 403/404/429 kodları için geriye dönüş/deneme planı olmalı.[^2] |
| 7 | Uyumluluk | GMP TOS ve EEA koşullarına uyum.[^24][^25] |

### 7.1) High-Resolution Image Optimization (2025)

Google Maps üzerinde etkili görsel SEO için yüksek kaliteli fotoğraf optimizasyonu kritik önemdedir:[^28]

#### Teknik Gereksinimler
- **Minimum Boyutlar**: 1200px uzun kenar (optimal performans için)
- **Format Önerileri**: WebP (modern tarayıcılar), JPEG (genel uyumluluk)
- **Dosya Boyutu**: 500KB - 2MB arası (kalite/dosya boyutu dengesi)
- **Renk Profili**: sRGB (Google standartlarına uygunluk)

#### Spa/Güzellik Merkezleri İçin Özel Stratejiler
1. **Mekan Fotoğrafları**: Dış cephe, lobby, tedavi odaları, alt yapı
2. **Hizmet Odaklı Görseller**: Uygulama anları, tedavi öncesi/sonrası
3. **Ekip ve Sertifikalar**: Profesyonel kadro, sertifika belgeleri
4. **Hijyen ve Kalite**: Sterilite, modern ekipman, temizlik standartları

### 7.2) Photo Metadata ve SEO Integration

Görsel metadata optimizasyonu, Google Maps'te Local 3-Pack görünürlüğünü doğrudan etkiler:[^28]

#### Coğrafi Etiketleme (EXIF Data)
- **Koordinat Ekletimi**: GPS verilerini fotoğraflara gömme
- **Konum İsmi**: İşletme adı ve adres bilgileri
- **Araçlar**: GeoImgr, LocaXYZ, Pic2Map

#### Dosya Adlandırma Stratejisi
- **Anahtar Kelime Zengin**: "spa-antalya-ciilt-bakimi-masaj.jpg"
- **Konum Odaklı**: Şehir/mahalle bilgisini içermeli
- **Hizmet Odaklı**: Sunulan hizmetlerin adları

#### Alt Metin (Alt Text) Optimizasyonu
- **Açıklayıcı**: Görsel içeriğini net tanımlama
- **Konum İçeriği**: "Antalya'da profesyonel cilt bakımı hizmeti"
- **Hizmet Odaklı**: Sunulan tedavi ve hizmetler

Tablo 6a — Fotoğraf Optimizasyon Kontrol Listesi
| Kategori | Gereksinim | Örnek |
|---|---|---|
| **Teknik Kalite** | 1200px+ uzun kenar | 1920x1080 JPEG/WebP |
| **EXIF Data** | GPS koordinatları | GPS: 36.8969°N, 30.7133°E |
| **Dosya Adı** | Anahtar kelime açısından zengin | spa-antalya-masaj-hizmeti.jpg |
| **Alt Metin** | Açıklayıcı ve konumlu | "Antalya'da profesyonel spa masaj hizmeti" |
| **Yükleme Sıklığı** | Haftalık yeni içerik | 5-7 yeni fotoğraf/hafta |

### 7.3) Görsel SEO Performans Metrikleri

Doğru optimizasyon stratejileri ile spa/güzellik merkezleri şu performans artışlarını görebilir:[^28]
- **Yol Tarifi İstekleri**: %42 artış
- **Web Sitesi Tıklamaları**: %35 artış  
- **Rezervasyon Oranları**: %28 artış
- **Local 3-Pack Görünürlük**: %44 artış

#### Aylık Optimizasyon Rutini
1. **5 yeni coğrafi etiketli fotoğraf** ekleme
2. **Mevcut fotoğrafların metadata güncellemesi**
3. **Alt metin optimizasyonu** kontrolü
4. **Rakip fotoğraf analizi** ve iyileştirme
5. **Performans takibi** (Google Analytics + GBP insights)

## 8) Gerçek Zamanlı İşletme Bilgisi Senkronizasyonu (GBP API)

GBP API’leri, işletme verisinin doğruluğunu ve tazeliğini artırmanın resmi kanadıdır. Gerçek zamanlı bildirim mekanizmasıyla yeni güncellemeleri yakalamak, işletme tarafından yapılan değişikliklerin hızla Google yüzeylerine yansımasını sağlar.[^1][^3] Entegrasyon yaklaşımı “tek kaynak doğruluk” prensibini benimsemelidir: CMS/operasyon sistemi kaynağındaki saatler, URL’ler, iletişim bilgisi ve görseller önce GBP’ye, oradan Haritalar yüzeyine akıtılır.[^1]

Tablo 7 — Güncelleme türleri ve eşleşen GBP API uç noktaları
| Güncelleme Türü | API/Alan | Not |
|---|---|---|
| Çalışma saatleri | GBP saat yönetimi uç noktaları | Resmi alan ve uç noktalar GBP belgelerinde tanımlıdır.[^1] |
| İletişim (telefon, web) | GBP iletişim alanları | Değişiklik sonrası bildirimle doğrulama.[^1][^3] |
| Fotoğraflar | GBP fotoğraf yönetimi | Atıf/uyumluluk kuralları geçerli.[^24] |
| Gönderiler | GBP posts | Mevsimsel kampanyalar/etkinlikler için kullanın.[^1] |
| Konum öznitelikleri | GBP attributes | Turizm/erişilebilirlik gibi öznitelikler görünürlüğü artırır.[^1] |

Gerçek zamanlı bildirimlerin kurulumu ve değişiklik kabul/reddi, GBP’nin resmî akışı üzerinden yürütülmelidir.[^1][^3]

## 9) Türkiye Lokalizasyonu ve Kapsam

Türkiye pazarında haritaların doğru dil ve bölge ayarlarıyla sunulması kritik önemdedir. Maps JavaScript API, dil ve bölge yerelleştirmesini destekler; bu ayarlar kullanıcıların yerel dil beklentilerini karşılar ve dönüşüm oranlarını olumlu etkiler.[^16] GMP kapsam sayfaları, Türkiye’de desteklenen özellikleri ve olası kısıtları takip etmek için düzenli referans alınmalıdır.[^15] Türkiye’ye özgü yerel SEO stratejileri, yerel dizinler, kültürel referanslar ve çok dilli içerik planıyla desteklenmelidir.[^19]

Tablo 8 — Lokalizasyon kontrol listesi
| Kontrol | Açıklama |
|---|---|
| Harita dili/bölgesi | `language` ve `region` parametrelerini Türkçe/TR olarak ayarlayın.[^16] |
| İçerik dili | Sayfa içeriği ve CTA’lar Türkçe; gerektiğinde İngilizce alternatif. |
| Dizin tutarlılığı | NAP (Ad-Adres-Telefon) tüm platformlarda birebir aynı.[^19] |
| Dönüşüm akışları | Yerel iletişim kanalları (telefon/WhatsApp) görünür. |
| Kapsam doğrulaması | Türkiye’de ilgili API/özellik kapsamı GMP Coverage’dan kontrol edilmeli.[^15] |

## 10) Local SEO Entegrasyonu: Spa/Güzellik Merkezleri İçin Uygulanabilir Stratejiler

Google Haritalar sıralaması; alaka, mesafe ve tanınırlık sinyallerinin birleşimine dayanır. 2025’te etkin olan uygulama seti; doğru kategori seçimi, güncel ve kapsamlı işletme bilgisi, yerel anahtar kelimelerle zenginleştirilmiş içerik, düzenli ve kaliteli görseller, hızlı yorum yanıtları ve yerel geri bağlantıları içerir.[^20][^19][^18][^21]

- Kategori seçimi: Birincil kategori işletmenin çekirdek kimliğini yansıtmalı; ikincil kategoriler sunulan hizmetleri (ör. cilt bakımı, masaj, epilasyon) kapsamalıdır. Liste ve karar desteği için GBP kategori araçları kullanılabilir.[^23]
- İçerik ve görsel: Hizmet sayfaları, sık sorulan sorular, öncesi/sonrası görseller ve hijyen/sertifika görselleri ile güven sinyallerini güçlendirin.[^18]
- Yorum programı: E-posta/SMS/QR teşvikleriyle sistematik yorum toplayın; yanıt SLA’larını 24–48 saatte tutturacak süreçler kurun.[^19]
- Web’de NAP ve harita gömme: Site üst bilgi ve alt bilgide NAP; iletişim ve konum sayfasında harita gömme ve yol tarifi düğmesi.[^21]

Tablo 9 — GBP optimizasyon kontrol listesi (Spa/Güzellik)
| Alan | Kontrol |
|---|---|
| Doğrulama | Profil doğrulanmış, sahiplik teyidi güncel.[^20] |
| NAP | Ad, adres, telefon tüm platformlarda tutarlı.[^19] |
| Kategoriler | Birincil + 2–3 ikincil kategori alaka odaklı.[^23] |
| Açıklama | Hizmetler, farklılaşanlar, hijyen/sertifikalar açıkça belirtilmiş. |
| Görseller | Yüksek kaliteli, güncel, mekan ve hizmet odaklı fotoğraflar.[^18] |
| Gönderiler | Haftalık/sezonsal güncellemeler ve kampanyalar. |
| Yorumlar | Teşvik planı ve hızlı yanıt SOP’ları.[^19] |
| Performans | Görüntüleme, tıklama, yol tarifi, arama metrikleri düzenli izleniyor. |

Tablo 10 — Haritalar sıralama faktörleri x uygulama taktikleri
| Faktör | Taktik |
|---|---|
| Alaka | Doğru kategori ve hizmet açıklaması; yerel anahtar kelimelerle içerik.[^20] |
| Mesafe | Konum sayfası ve harita gömme; doğru pin ve hizmet alanı beyanı. |
| Tanınırlık | Yorum hacmi ve hızı, yerel basın/dernek bağlantıları, düzenli fotoğraf.[^19][^18] |

## 11) Uygulama Yol Haritası ve Operasyon Modeli

Aşama 1 — Hızlı kazanımlar (0–4 hafta)
- GBP doğrulama ve temel profil optimizasyonu (NAP, kategoriler, açıklama).[^20]
- Harita gömme: Basit gömme için Embed API; konum/harita sayfalarında yayına alma.[^11]
- İlk fotoğraf seti ve atıflar; `skipHttpRedirect` ile `photoUri` JSON akışı.[^2]
- Yorum toplama akışı (QR/e-posta) ve yanıt SOP’larının devreye alınması.[^19]

Aşama 2 — Derinleşme (1–3 ay)
- Maps JavaScript API’ye geçiş gerektiren sayfaları belirleyin; marker/filtre/iş kuralı katmanlarını devreye alın.[^7]
- 3D deneme: Yüksek etkili mekanlarda fotogerçekçi 3D ile açılış sayfası deneyimi.[^6]
- Autocomplete (New) ile site içi arama/forma konum doğrulama.[^28]
- GBP gerçek zamanlı bildirimler ve değişiklik kabul/red akışının kurulumu.[^1][^3]

Aşama 3 — Ölçekleme (3–6 ay)
- Çoklu lokasyon yönetimi: CMS’den GBP’ye tek kaynak doğruluk akışı.[^1]
- Operasyon ve denetim: GBP/Places/harita kullanımı ve maliyet izleme; uyarı eşikleri.[^27][^10]
- Görsel ve içerik ritmi: Aylık görsel rotasyonu, sezonsal kampanyalar, performans bazlı içerik iyileştirme.[^18]

Tablo 11 — Zaman çizelgesi ve sorumluluk matrisi
| Aşama | İş Kalemi | Teknik | Pazarlama | Operasyon |
|---|---|---|---|---|
| 1 | GBP temel optimizasyon | — | X | X |
| 1 | Harita gömme (Embed) | X | — | — |
| 1 | Fotoğraf/atıf kurulumu | X | X | — |
| 2 | JS API ve filtreler | X | — | — |
| 2 | Autocomplete | X | — | — |
| 2 | GBP real-time bildirim | X | — | X |
| 3 | Çoklu lokasyon senkron | X | — | X |
| 3 | İzleme ve denetim | X | X | X |

## 12) Riskler, Uyum ve Sürdürülebilirlik

Politika ve lisans uyumu, sürdürülebilirliğin temelidir. GMP Hizmet Özel Şartları, Place Photos özelinde önbellekleme yasağı ve atıf yükümlülüğü, veri gösterim kuralları ve diğer kısıtları açıkça tanımlar; EEA sürümünde ek hükümler bulunabilir.[^24][^25] Resmi olmayan kazıma (scraping) veya otomatik yorum yanıt uygulamaları, hesap sağlığı ve görünürlük açısından risklidir; GBP API politika ihlalleri hesap askıya alma gibi ağır sonuçlara yol açabilir.[^24]

Tablo 12 — Uyumluluk kontrol listesi
| Alan | Kontrol |
|---|---|
| Atıflar | Tüm fotoğraflarda `authorAttributions` gösterimi.[^2][^24] |
| Önbellekleme | Place Photos `name` ve medya önbellekleme yasağına uyum.[^24][^2] |
| Veri kullanımı | Sadece gösterim ve izin verilen işlemler; yeniden dağıtım kısıtları.[^24] |
| Güvenlik | API anahtarı kısıtlamaları ve gizlilik; hatalı kullanım izleme.[^32] |
| Bildirimler | GBP değişiklik bildirim kayıtlarının düzenli gözden geçirilmesi.[^1][^3] |

## 13) Ölçümleme, KPI’lar ve İzleme

Başarı; görünürlük, itibar ve dönüşüm eksenlerinde izlenmelidir. GBP performans metrikleri görüntülemeler, tıklamalar, yol tarifi ve arama gibi temel sinyalleri sunar; Google Search Console ve site analitiği, organik keşif ve sitedeki davranışı tamamlar.[^1][^18]

Tablo 13 — KPI izleme matrisi
| Metrik | Kaynak | Sıklık | Sahip |
|---|---|---|---|
| Görüntülemeler (GBP) | GBP performans | Haftalık | Pazarlama |
| Tıklamalar (web/telefon) | GBP/Analitik | Haftalık | Pazarlama |
| Yol tarifi istekleri | GBP performans | Haftalık | Operasyon |
| Yorum sayısı/ort. puan | GBP yorumlar | Haftalık | Operasyon |
| Dönüşüm oranı (form/tık/çağrı) | Analitik | Haftalık | Pazarlama |
| Yerel paket görünürlüğü | Pozisyon takibi | Aylık | SEO |
| API kullanım/maliyet | Faturalandırma/izleme | Aylık | Teknik |

A/B test planı: Harita gömme biçimi (Embed vs JS), CTA yerleşimi, fotoğraf setleri ve kategori/anahtar kelime varyasyonları; 4–8 haftalık pencerelerde anlamlı farkları ölçmek için yeterli trafik hacmiyle yürütülmelidir.[^18]

## 14) Ekler: Uygulama Kılavuzları ve Kaynaklar

Uygulama ipuçları:
- Maps JavaScript API kullanım ve faturalandırma: JS API’de yükleme stratejisi (lazy-load) ve çağrı hacminin izlenmesi, gereksiz istekleri azaltır.[^27]
- Place ID edinimi ve yenilenmesi: Place Details, Nearby/Text Search ve Geocoding gibi kaynaklardan elde edilen Place ID’ler operasyonel veri modelinde ana anahtar olarak kullanılmalı; değişim riskine karşı periyodik doğrulama yapılmalıdır.[^13][^14]
- Fiyatlandırma ve ücretsiz kullanım kotaları: Mart 2025 sonrası SKU başına ücretsiz kapalar ve genişletilmiş hacim indirimleri; proje bağlamında doğrulama ve izleme kuralları tanımlanmalıdır.[^9][^8][^10]

---

Bilgi boşlukları ve belirsizlikler:
- Fiyatlandırma: Ürün kümelerine göre net rakamsal eşikler ve SLA/indirim detayları proje/hesap bazında değişebilir; resmî sayfalar ve sözleşmelerden teyit edilmelidir.[^9][^8][^10]
- Yorum yanıt otomasyonu: GBP’nin resmi API’sinde otomatik yanıt uç noktası bulunmaz; üçüncü parti araçlar politikalar ve uyumluluk çerçevesi gözetilerek değerlendirilmelidir.[^17][^24]
- Geçiş takvimi: Directions/Distance Matrix vs. Routes geçişi ve bazı API’lerin Legacy statüsüne ilişkin takvim detayları proje bazında değişebilir; en güncel resmi duyurular takip edilmelidir.[^30][^31][^29]

## Kaynaklar

[^1]: Business Profile API'leri - Genel Bakış. Google for Developers. https://developers.google.com/my-business/content/overview  
[^2]: Place Photos (New) | Places API. Google for Developers. https://developers.google.com/maps/documentation/places/web-service/place-photos  
[^3]: Değişiklik Günlüğü | Business Profile APIs. Google for Developers. https://developers.google.com/my-business/content/change-log  
[^4]: Yorum verileriyle çalışma - Business Profile APIs. Google for Developers. https://developers.google.com/my-business/content/review-data  
[^5]: Platform fiyatlandırması ve API maliyetleri. Google Maps Platform. https://mapsplatform.google.com/pricing/  
[^6]: Build immersive, real-world map experiences: 3D Maps GA for web. Google Maps Platform Blog. https://mapsplatform.google.com/resources/blog/build-immersive-real-world-map-experiences-3d-maps-now-generally-available-for-web/  
[^7]: Genel Bakış | Maps JavaScript API. Google for Developers. https://developers.google.com/maps/documentation/javascript/overview  
[^8]: Google Maps Platform Mart 2025 değişiklikleri. Google for Developers. https://developers.google.com/maps/billing-and-pricing/march-2025  
[^9]: Faturalandırmaya ve fiyatlandırmaya genel bakış. Google for Developers. https://developers.google.com/maps/billing-and-pricing/overview  
[^10]: Google Maps Platform otomatik hacim indirimleri SSS. Google for Developers. https://developers.google.com/maps/billing-and-pricing/faq  
[^11]: Maps Embed API'ye genel bakış. Google for Developers. https://developers.google.com/maps/documentation/embed/get-started  
[^12]: Places API - Genel Bakış. Google for Developers. https://developers.google.com/maps/documentation/places/web-service/overview  
[^13]: Place ID | Places API. Google for Developers. https://developers.google.com/maps/documentation/places/web-service/place-id  
[^14]: Place Details (New) | Places API. Google for Developers. https://developers.google.com/maps/documentation/places/web-service/place-details  
[^15]: Google Maps Platform kapsam detayları. Google for Developers. https://developers.google.com/maps/coverage  
[^16]: Haritayı yerelleştirin | Maps JavaScript API. Google for Developers. https://developers.google.com/maps/documentation/javascript/localization  
[^17]: Google Haritalar Sıralaması: 2025'te 11 Strateji. EmbedSocial. https://embedsocial.com/blog/google-maps-seo/  
[^18]: Türkiye'de Local SEO: Kapsamlı Rehber. Ranktracker. https://www.ranktracker.com/blog/a-complete-guide-for-doing-local-seo-in-turkey/  
[^19]: Haritalarda yerel sıralamanızı iyileştirmek için ipuçları. Google Business Profile Yardım. https://support.google.com/business/answer/7091?hl=en  
[^20]: Google Business Profile kategorileri (2025). Dalton Luka. https://daltonluka.com/blog/google-my-business-categories  
[^21]: Harita gömme ve yol tarifi için Local SEO en iyi uygulamaları. Seeders. https://seeders.com/blog/local-seo-best-practices-for-embedding-google-maps-and-directions-on-your-website/  
[^22]: Maps JavaScript API kullanım ve faturalandırma. Google for Developers. https://developers.google.com/maps/documentation/javascript/usage-and-billing  
[^23]: GBP kategorileri aracı (2025). PlePer Tools. https://pleper.com/index.php?do=tools&sdo=gmb_categories  
[^24]: Google Maps Platform Hizmet Özel Şartları. Google Cloud. https://cloud.google.com/maps-platform/terms  
[^25]: Google Maps Platform EEA Hizmet Şartları. Google Cloud. https://cloud.google.com/terms/maps-platform/eea  
[^26]: Google Maps Platform FAQ. Google for Developers. https://developers.google.com/maps/faq  
[^27]: Google Maps API'de yeni fiyatlar ve özellikler (Mart 2025). Microlab. https://www.microlab.at/en/news/google-maps-api:-new-prices-starting-march-2025-what-you-need-to-know-now-16589.html  
[^28]: Autocomplete (New) | Places API. Google for Developers. https://developers.google.com/maps/documentation/places/web-service/place-autocomplete  
[^29]: Google Maps değişiklikleri 2025. Cloudfresh. https://cloudfresh.com/en/blog/google-maps-platform-changes-2025/  
[^30]: Field Service Google Maps API Yükseltmesi (Legacy uyarıları). ServiceNow Destek. https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB2112054  
[^31]: Google Maps API 2025: Fiyatlandırma, politikalar ve iş stratejisi. MasterConcept. https://masterconcept.ai/news/google-maps-api-2025-complete-guide-to-pricing-policies-business-strategy/