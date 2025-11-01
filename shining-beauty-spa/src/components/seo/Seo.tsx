import { Helmet } from 'react-helmet-async'

export interface SeoProps {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  image?: string
  locale?: string
  type?: 'website' | 'article' | 'profile' | 'product'
  siteName?: string
  structuredData?: Record<string, unknown> | Record<string, unknown>[]
  noindex?: boolean
}

const DEFAULT_LOCALE = 'tr-TR'

export function Seo({
  title,
  description,
  keywords = [],
  canonical,
  image,
  locale = DEFAULT_LOCALE,
  type = 'website',
  siteName = 'Shining Beauty & Wellness',
  structuredData,
  noindex,
}: SeoProps) {
  const keywordContent = keywords.join(', ')
  const structuredJson = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : []

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      {keywordContent && <meta name="keywords" content={keywordContent} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content={siteName} />

      {image && <meta property="og:image" content={image} />}
      {canonical && <link rel="canonical" href={canonical} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {structuredJson.map((item, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  )
}

export default Seo
