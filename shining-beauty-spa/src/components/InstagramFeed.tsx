import { useEffect, useState } from 'react'
import { InstagramPost, getInstagramFeed } from '@/lib/supabase'

interface InstagramFeedProps {
  title?: string
  subtitle?: string
  showButton?: boolean
  maxPosts?: number
}

const InstagramFeed = ({ 
  title = "Sosyal Medyada Bizi Takip Edin",
  subtitle = "En son paylaşımlarımız, özel kampanyalar ve güzellik ipuçları için Instagram'da bizi takip edin",
  showButton = true,
  maxPosts = 8
}: InstagramFeedProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const instagramHandle = 'shining.beauty.wellness'
  const instagramUrl = `https://www.instagram.com/${instagramHandle}`

  useEffect(() => {
    let isMounted = true
    async function load() {
      try {
        setIsLoading(true)
        const data = await getInstagramFeed(maxPosts)
        if (isMounted) setPosts(data)
      } catch (e) {
        console.error('Instagram feed fetch error:', e)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }
    load()
    return () => { isMounted = false }
  }, [maxPosts])

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <p className="text-accent text-sm uppercase tracking-widest mb-2">Instagram</p>
        <h2 className="text-4xl font-heading font-bold text-gold mb-4">
          {title}
        </h2>
        <p className="text-beige/80 mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>
        {showButton && (
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 text-white rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg hover:shadow-2xl"
          >
            <i className="fab fa-instagram text-2xl"></i>
            <span>@{instagramHandle}</span>
          </a>
        )}
      </div>

      {/* Instagram Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-primary rounded-2xl p-8 border border-gold/20 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {(isLoading ? Array.from({ length: maxPosts }) : posts).map((item, index) => {
              const post = item as unknown as InstagramPost | undefined
              const isVideo = post?.media_type === 'VIDEO'
              const src = isVideo ? (post?.thumbnail_url || post?.media_url || '') : (post?.media_url || '')
              const alt = post?.caption?.slice(0, 80) || 'Instagram post'

              return (
                <a
                  key={post?.id || index}
                  href={post?.permalink || instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aspect-square rounded-xl overflow-hidden border border-gold/20 group hover:border-accent transition-all duration-300 hover:shadow-xl hover:scale-105 relative bg-primary-light"
                  aria-label={alt}
                >
                  {isLoading || !src ? (
                    <div className="w-full h-full animate-pulse bg-gradient-to-br from-primary-light via-primary to-primary-light" />
                  ) : (
                    <img
                      src={src}
                      alt={alt}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-orange-500/0 group-hover:from-purple-500/20 group-hover:via-pink-500/20 group-hover:to-orange-500/20 transition-all duration-300" />

                  {/* Type badge */}
                  {!isLoading && post && (
                    <div className="absolute top-2 right-2 text-xs px-2 py-1 rounded-md bg-black/50 text-white backdrop-blur-sm">
                      {isVideo ? 'Video' : post.media_type === 'CAROUSEL_ALBUM' ? 'Carousel' : 'Fotoğraf'}
                    </div>
                  )}
                </a>
              )
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-8 text-center">
            <p className="text-beige/60 text-sm mb-4 flex items-center justify-center gap-2">
              <i className="fas fa-heart text-accent"></i>
              <span>En güncel içerikler, özel teklifler ve müşteri yorumları için Instagram sayfamızı ziyaret edin</span>
            </p>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent hover:text-gold transition-colors font-semibold group"
            >
              Tüm Paylaşımları Görüntüle
              <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstagramFeed
