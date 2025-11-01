# Instagram Graph API Entegrasyonu — Shining Beauty & Wellness

Bu doküman, Instagram’ın modern özelliklerini (fotoğraf, video, carousel) doğrudan web sitenizde göstermek için Instagram Graph API’nin nasıl yapılandırılacağını ve projede nasıl kullanılacağını anlatır.

## Neler Uygulandı (Projede Hazır)
- Supabase Edge Function: `instagram-feed` (server-side güvenli istek + cache)
- Frontend bileşeni: `src/components/InstagramFeed.tsx` gerçek veriyi çekecek şekilde güncellendi
- Yardımcı fonksiyon: `getInstagramFeed(limit)` (`src/lib/supabase.ts`)

Bu sayede:
- Video postlar için thumbnail görüntülenir (tıklayınca Instagram’a gider)
- Carousel/Video/Fotograf türü rozeti gösterilir
- Lazy loading + hafif hover efektleri
- Edge Function üzerinde 1 saatlik cache ve stale-while-revalidate uygulanır

## Gerekenler (Sizden İstenenler)
1) Instagram Business veya Creator hesabı (kişisel hesap uygun değildir)
2) Instagram hesabı ile bağlantılı bir Facebook Sayfası
3) Meta Developers üzerinde bir uygulama (App) ve erişim izni
4) `IG_ACCESS_TOKEN` (uzun ömürlü User Access Token) ve `IG_USER_ID`

## Adım Adım Kurulum

### 1. Instagram hesabınızı doğrulayın
- Instagram hesabınız Business veya Creator olmalı
- Instagram hesabınız bir Facebook Sayfasına bağlı olmalı (Instagram uygulamasından Ayarlar → İşletme → Bağlı hesaplar)

### 2. Meta Developers’ta App oluşturun
- https://developers.facebook.com/apps/ üzerinden bir App oluşturun
- Ürüne “Instagram Graph API” ekleyin
- Geliştirici/tester rolleri atayın (gerekirse)

### 3. Gerekli izinler (scopes/permissions)
Görsel içerikleri listelemek için minimum gerekli izin:
- `instagram_basic`

Sayfa/IG kullanıcı eşlemesi ve sayfalara erişim için ek olarak şu izinlere ihtiyaç duyabilirsiniz:
- `pages_show_list` (Facebook sayfalarını listelemek için)
- `pages_read_engagement` (sayfa verileri okuma)

Not: Üretim ortamında Uygulamanızı “Live Mode”a almak ve App Review sürecinden geçmek gerekebilir. Geliştirme sürecinde rol atanmış kullanıcılar ile test yapabilirsiniz.

### 4. IG User ID’yi bulun
Elinizde Facebook Page ID varsa IG User ID’yi şöyle çekebilirsiniz:

```bash
# Kullanıcı Access Token ile hesabınızdaki sayfaları listeleyin
curl -s "https://graph.facebook.com/v19.0/me/accounts?access_token=USER_ACCESS_TOKEN"

# Bir Page ID aldıktan sonra, o sayfanın IG hesabını çekin
curl -s "https://graph.facebook.com/v19.0/PAGE_ID?fields=instagram_business_account&access_token=USER_ACCESS_TOKEN"
# Yanıttaki: { instagram_business_account: { id: "<IG_USER_ID>" } }
```

Alternatif: Eğer IG User ID’yi biliyorsanız bu adımı atlayabilirsiniz.

### 5. Uzun ömürlü (long-lived) User Access Token oluşturma
Geliştirme için kısa ömürlü token’ı Graph API Explorer ile alabilirsiniz.
Üretim için uzun ömürlü token gereklidir:

```bash
# Kısa ömürlü USER_ACCESS_TOKEN’ı uzun ömürlüye çevirin
curl -G \
  -d "grant_type=fb_exchange_token" \
  -d "client_id=APP_ID" \
  -d "client_secret=APP_SECRET" \
  -d "fb_exchange_token=SHORT_LIVED_USER_ACCESS_TOKEN" \
  "https://graph.facebook.com/v19.0/oauth/access_token"

# YANIT: { access_token: "LONG_LIVED_USER_ACCESS_TOKEN", expires_in: ... }
```

Üretimde periyodik yenileme gerektirebilir. Alternatif olarak Business Manager üzerinden “System User Token” yöntemi de kullanılabilir.

### 6. Supabase Edge Function gizli değişkenleri (secrets)
Projede halihazırda kullanılan Supabase projesi:
- `https://jaeuwzrvvrfhxwgakykn.supabase.co`

Edge Function için şu secret’ları set edin:

```bash
# Supabase CLI ile (project-ref’i kendi projenize göre ayarlayın)
supabase secrets set IG_ACCESS_TOKEN="LONG_LIVED_USER_ACCESS_TOKEN" IG_USER_ID="<IG_USER_ID>" --project-ref jaeuwzrvvrfhxwgakykn
```

### 7. Edge Function’ı deploy edin

```bash
# Depoladığımız fonksiyon adı: instagram-feed
supabase functions deploy instagram-feed --project-ref jaeuwzrvvrfhxwgakykn
```

Başarılı deploy sonrasında endpoint:
```
https://jaeuwzrvvrfhxwgakykn.supabase.co/functions/v1/instagram-feed?limit=8
```
Fonksiyon, şu alanları döndürür: `id, caption, media_type, media_url, thumbnail_url, permalink, timestamp`.

### 8. Frontend’de kullanım (zaten entegre)
- Bileşen: `src/components/InstagramFeed.tsx`
- Yardımcı fonksiyon: `getInstagramFeed(limit)`

Bileşen otomatik olarak edge function’dan veri çekiyor. Limit’i `maxPosts` prop’u ile değiştirebilirsiniz.

## Sık Karşılaşılan Sorunlar
- 400/403 hatası: Token veya izin eksikliği. `instagram_basic` iznini ve token’ın geçerliliğini kontrol edin.
- Boş liste: IG hesabı Business/Creator değil veya Page bağlantısı yok.
- Video’lar: `media_type === 'VIDEO'` için thumbnail_url kullanılabilir. Yoksa `media_url` fallback.
- Rate limit: Edge Function üzerinde 1 saatlik cache var. Gerektiğinde `s-maxage` süresini ayarlayın.

## Güvenlik Notları
- `IG_ACCESS_TOKEN` kesinlikle client’ta tutulmamalı. Edge Function bu sebeple eklendi.
- Token’ı Supabase Secrets ile saklayın. Depoya .env dosyası olarak koymayın.

## Geliştirme Yol Haritası (Opsiyonel)
- Lightbox/Modal ile siteden çıkmadan video/fotoğraf önizleme
- Carousel desteği (çoklu görsel gösterimi için küçük slider)
- Hashtag/mention bazlı filtreler
- Reels sekmesi (API desteği uygunluk durumuna göre)

---

Sorunuz olursa: Bu dosyaya göre ilerleyelim; token ve IG User ID’yi sağladığınızda üretime hazır hale getirip test edeceğim.
