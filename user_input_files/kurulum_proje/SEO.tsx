import { useEffect } from "react";
import { SITE_INFO } from "@shared/const";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
}

export function SEO({
  title,
  description = SITE_INFO.description,
  keywords = "spa, masaj, cilt bakımı, lazer epilasyon, wellness, güzellik merkezi, Adana",
  image = "/shining-logo.png",
  url,
  type = "website"
}: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_INFO.name}` : SITE_INFO.name;
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  useEffect(() => {
    // Title
    document.title = fullTitle;

    // Meta tags
    const metaTags = [
      { name: "description", content: description },
      { name: "keywords", content: keywords },
      
      // Open Graph
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: currentUrl },
      { property: "og:image", content: image },
      { property: "og:site_name", content: SITE_INFO.name },
      
      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
      
      // Additional
      { name: "robots", content: "index, follow" },
      { name: "author", content: SITE_INFO.name },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    ];

    metaTags.forEach(({ name, property, content }) => {
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
      let element = document.querySelector(selector);
      
      if (!element) {
        element = document.createElement("meta");
        if (name) element.setAttribute("name", name);
        if (property) element.setAttribute("property", property);
        document.head.appendChild(element);
      }
      
      element.setAttribute("content", content);
    });

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", currentUrl);

    // JSON-LD Structured Data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BeautySalon",
      "name": SITE_INFO.name,
      "description": SITE_INFO.description,
      "url": currentUrl,
      "telephone": SITE_INFO.phone,
      "email": SITE_INFO.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": SITE_INFO.address.street,
        "addressLocality": SITE_INFO.address.city,
        "addressCountry": SITE_INFO.address.country,
        "postalCode": SITE_INFO.address.postalCode
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "20:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "09:00",
          "closes": "20:00"
        }
      ],
      "sameAs": [
        SITE_INFO.social.instagram,
        SITE_INFO.social.facebook
      ]
    };

    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);
  }, [fullTitle, description, keywords, image, currentUrl, type]);

  return null;
}
