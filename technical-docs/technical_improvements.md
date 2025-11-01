# Shining Beauty Website - Teknik İyileştirmeler

## 1. Form Validation Düzeltmeleri

### Telefon Alanı Validation
```html
<!-- Mevcut -->
<input type="tel" name="phone" placeholder="05XX XXX XX XX">

<!-- Düzeltilmiş -->
<input 
  type="tel" 
  name="phone" 
  placeholder="05XX XXX XX XX"
  required
  pattern="[0-9]{10,11}"
  title="Lütfen geçerli bir telefon numarası girin (10-11 rakam)"
  class="form-input"
  id="phone"
>
```

### Hizmet Seçimi Validation
```html
<!-- Mevcut -->
<select name="service">
  <option value="">Hizmet seçiniz</option>
  ...
</select>

<!-- Düzeltilmiş -->
<select 
  name="service" 
  required
  class="form-select"
  id="service"
>
  <option value="">Hizmet seçiniz</option>
  <option value="head-massage">Kafa Masajı</option>
  <option value="swedish-massage">İsveç Masajı</option>
  <option value="hot-stone">Sıcak Taş Masajı</option>
  <option value="hydrafacial">Hydrafacial</option>
  <option value="anti-aging">Anti-Aging Bakımı</option>
</select>
```

### JavaScript Validation Enhancement
```javascript
// Form validation ve visual feedback
document.getElementById('contactForm').addEventListener('submit', function(e) {
  const phone = document.getElementById('phone');
  const service = document.getElementById('service');
  
  // Telefon validation
  if (!phone.value || phone.value.length < 10) {
    e.preventDefault();
    phone.classList.add('border-red-500');
    showError('Lütfen geçerli bir telefon numarası girin');
    return false;
  }
  
  // Hizmet validation
  if (!service.value) {
    e.preventDefault();
    service.classList.add('border-red-500');
    showError('Lütfen bir hizmet seçin');
    return false;
  }
  
  return true;
});

// Real-time validation feedback
document.querySelectorAll('.form-input, .form-select').forEach(input => {
  input.addEventListener('blur', function() {
    if (this.required && !this.value) {
      this.classList.add('border-red-500');
    } else {
      this.classList.remove('border-red-500');
    }
  });
});
```

---

## 2. Instagram API Güncelleme

### Mevcut Durum (Basic Display API - Deprecated)
```javascript
// Eski ve çalışmayan kod
fetch('https://graph.instagram.com/me/media?fields=id,caption,media_url&access_token=...')
```

### Yeni Implementasyon (Graph API)

#### Backend (Next.js API Route)
```javascript
// pages/api/instagram.js
export default async function handler(req, res) {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  
  try {
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${accessToken}`
    );
    
    const data = await response.json();
    
    // Cache for 1 hour
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Instagram data' });
  }
}
```

#### Frontend
```javascript
// components/InstagramFeed.jsx
import { useEffect, useState } from 'react';

export default function InstagramFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/instagram')
      .then(res => res.json())
      .then(data => {
        setPosts(data.data.slice(0, 6)); // Son 6 post
        setLoading(false);
      })
      .catch(err => {
        console.error('Instagram feed error:', err);
        setLoading(false);
      });
  }, []);
  
  if (loading) return <div>Yükleniyor...</div>;
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {posts.map(post => (
        <a 
          key={post.id} 
          href={post.permalink} 
          target="_blank"
          className="relative overflow-hidden rounded-lg hover:opacity-80 transition"
        >
          <img 
            src={post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url}
            alt={post.caption?.substring(0, 50)}
            className="w-full h-full object-cover"
          />
        </a>
      ))}
    </div>
  );
}
```

---

## 3. Google Maps API Güncelleme

### Places API v1 → v2 Migration

#### Eski Kod (v1)
```javascript
const service = new google.maps.places.PlacesService(map);
service.getDetails({
  placeId: 'ChIJ...',
  fields: ['name', 'formatted_address', 'geometry']
}, callback);
```

#### Yeni Kod (v2)
```javascript
// Field masking ile optimize edilmiş
const { Place } = await google.maps.importLibrary("places");

const place = new Place({
  id: 'ChIJ...',
  requestedLanguage: 'tr'
});

await place.fetchFields({
  fields: ['displayName', 'formattedAddress', 'location', 'rating', 'photos']
});

// Fotoğrafları yükleme (yeni API)
if (place.photos && place.photos.length > 0) {
  const photoUrl = place.photos[0].getURI({ maxHeight: 400 });
  document.getElementById('place-photo').src = photoUrl;
}
```

### Maliyet Optimizasyonu
```javascript
// Sadece ihtiyaç duyulan alanları talep et
const essentialFields = [
  'displayName',
  'formattedAddress', 
  'location'
]; // $0.017 per request

// Tüm alanlar yerine
const allFields = [
  'displayName',
  'formattedAddress',
  'location',
  'rating',
  'photos',
  'reviews',
  'openingHours',
  'phoneNumber',
  'website'
]; // $0.032 per request

// %47 maliyet tasarrufu!
```

---

## 4. Core Web Vitals Optimizasyonu

### INP (Interaction to Next Paint) İyileştirme

#### JavaScript Optimizasyonu
```javascript
// Ağır işlemleri böl
function processLargeArray(items) {
  const chunkSize = 50;
  let index = 0;
  
  function processChunk() {
    const chunk = items.slice(index, index + chunkSize);
    chunk.forEach(item => {
      // İşlem yap
    });
    
    index += chunkSize;
    
    if (index < items.length) {
      // Tarayıcıya nefes alma fırsatı ver
      requestIdleCallback(processChunk);
    }
  }
  
  processChunk();
}
```

#### Third-party Script Erteleme
```html
<!-- Kritik olmayan scriptleri ertele -->
<script src="analytics.js" defer></script>
<script src="chatbot.js" async></script>

<!-- Font Awesome'ı optimize et -->
<link rel="preload" href="fontawesome.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

### LCP (Largest Contentful Paint) İyileştirme

#### Görsel Optimizasyonu
```html
<!-- WebP formatı + lazy loading -->
<picture>
  <source srcset="hero-image.webp" type="image/webp">
  <source srcset="hero-image.jpg" type="image/jpeg">
  <img 
    src="hero-image.jpg" 
    alt="Shining Beauty Spa"
    loading="lazy"
    width="1920"
    height="1080"
  >
</picture>
```

#### Kritik CSS
```html
<head>
  <!-- Inline critical CSS -->
  <style>
    /* Above-the-fold styles */
    .hero { ... }
    .navbar { ... }
  </style>
  
  <!-- Defer non-critical CSS -->
  <link rel="preload" href="styles.css" as="style" onload="this.rel='stylesheet'">
</head>
```

### CLS (Cumulative Layout Shift) Düzeltme

#### Görsel Boyutları Belirt
```html
<!-- CLS'yi önle -->
<img 
  src="image.jpg" 
  width="800" 
  height="600"
  alt="..."
>

<!-- Veya CSS ile -->
<style>
  .image-container {
    aspect-ratio: 16 / 9;
  }
</style>
```

---

## 5. PWA (Progressive Web App) Implementasyonu

### Service Worker
```javascript
// sw.js
const CACHE_NAME = 'shining-beauty-v1';
const urlsToCache = [
  '/',
  '/styles.css',
  '/script.js',
  '/shining-logo.png',
  '/offline.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
```

### Web App Manifest
```json
{
  "name": "Shining Beauty & Wellness",
  "short_name": "Shining Beauty",
  "description": "Adana'nın en lüks spa ve wellness merkezi",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#181818",
  "theme_color": "#d9b36a",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Push Notifications
```javascript
// Randevu hatırlatmaları için
async function subscribeToPush() {
  const registration = await navigator.serviceWorker.ready;
  
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: 'YOUR_PUBLIC_VAPID_KEY'
  });
  
  // Subscription'ı backend'e gönder
  await fetch('/api/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
```

---

## 6. SEO İyileştirmeleri

### Schema Markup (JSON-LD)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "name": "Shining Beauty & Wellness",
  "image": "https://shinings.pw/shining-logo.png",
  "@id": "https://shinings.pw",
  "url": "https://shinings.pw",
  "telephone": "+905050719501",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "63003 sokak, Cemalpaşa mahallesi Gazipaşa Rezidans asma kat no:3",
    "addressLocality": "Seyhan",
    "addressRegion": "Adana",
    "postalCode": "01120",
    "addressCountry": "TR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 37.0,
    "longitude": 35.3
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "20:00"
    }
  ],
  "sameAs": [
    "https://www.instagram.com/shining.beauty.wellness",
    "https://www.facebook.com/shiningbeauty"
  ]
}
</script>
```

### Meta Tags Optimization
```html
<head>
  <!-- Primary Meta Tags -->
  <title>Shining Beauty | Adana'nın En Lüks Spa & Wellness Merkezi</title>
  <meta name="title" content="Shining Beauty | Adana'nın En Lüks Spa & Wellness Merkezi">
  <meta name="description" content="Profesyonel kafa masajı, Hydrafacial, cilt bakımı ve wellness hizmetleri. Doğal ürünlerle, uzman ekibimizle hizmetinizdeyiz. Hemen randevu alın!">
  <meta name="keywords" content="adana spa, adana masaj, kafa masajı adana, hydrafacial adana, cilt bakımı adana, wellness adana">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://shinings.pw/">
  <meta property="og:title" content="Shining Beauty | Adana'nın En Lüks Spa & Wellness Merkezi">
  <meta property="og:description" content="Profesyonel kafa masajı, Hydrafacial, cilt bakımı ve wellness hizmetleri.">
  <meta property="og:image" content="https://shinings.pw/og-image.jpg">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://shinings.pw/">
  <meta property="twitter:title" content="Shining Beauty | Adana'nın En Lüks Spa & Wellness Merkezi">
  <meta property="twitter:description" content="Profesyonel kafa masajı, Hydrafacial, cilt bakımı ve wellness hizmetleri.">
  <meta property="twitter:image" content="https://shinings.pw/og-image.jpg">
  
  <!-- Canonical -->
  <link rel="canonical" href="https://shinings.pw/">
</head>
```

---

## 7. Performance Monitoring

### Google Analytics 4 Setup
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
  
  // Custom events
  gtag('event', 'appointment_request', {
    'service': 'head_massage',
    'value': 1
  });
</script>
```

### Core Web Vitals Monitoring
```javascript
// web-vitals kütüphanesi ile
import {getCLS, getFID, getFCP, getLCP, getTTFB} from 'web-vitals';

function sendToAnalytics(metric) {
  const body = JSON.stringify(metric);
  // Analytics endpoint'e gönder
  (navigator.sendBeacon && navigator.sendBeacon('/analytics', body)) ||
    fetch('/analytics', {body, method: 'POST', keepalive: true});
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

---

## Uygulama Öncelik Sırası

### Hafta 1 (Kritik)
1. ✅ Form validation düzeltmeleri
2. ✅ Instagram API güncelleme
3. ✅ Google Maps API v2 migration

### Hafta 2 (Yüksek)
4. ✅ Core Web Vitals optimizasyonu
5. ✅ Görsel optimizasyonu (WebP)
6. ✅ SEO meta tags ve schema markup

### Hafta 3 (Orta)
7. ✅ PWA implementasyonu
8. ✅ Analytics kurulumu
9. ✅ Performance monitoring

### Hafta 4 (Düşük)
10. ✅ Push notifications
11. ✅ A/B testing setup
12. ✅ Advanced caching strategies

