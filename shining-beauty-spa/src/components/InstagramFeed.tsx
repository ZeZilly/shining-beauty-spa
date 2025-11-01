import { useEffect, useState } from 'react'

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
  const instagramHandle = 'shining.beauty.wellness'
  const instagramUrl = `https://www.instagram.com/${instagramHandle}`

  useEffect(() => {
    // Simulate loading time for skeleton animation
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handlePostClick = (index: number) => {
    // Open Instagram profile - users can navigate to posts from there
    window.open(instagramUrl, '_blank', 'noopener,noreferrer')
  }

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
            {Array.from({ length: maxPosts }).map((_, index) => (
              <div
                key={index}
                onClick={() => handlePostClick(index)}
                className="aspect-square bg-primary-light rounded-xl overflow-hidden border border-gold/20 cursor-pointer group hover:border-accent transition-all duration-300 hover:shadow-xl hover:scale-105 relative"
              >
                {isLoading ? (
                  // Skeleton loading animation
                  <div className="w-full h-full animate-pulse bg-gradient-to-br from-primary-light via-primary to-primary-light bg-[length:200%_200%] animate-shimmer">
                    <div className="w-full h-full flex items-center justify-center">
                      <i className="fab fa-instagram text-4xl text-gold/30"></i>
                    </div>
                  </div>
                ) : (
                  // Instagram post preview with hover effect
                  <div className="w-full h-full bg-gradient-to-br from-primary-light to-primary flex items-center justify-center">
                    <div className="text-center p-4 transition-all duration-300">
                      <div className="relative">
                        <i className="fab fa-instagram text-5xl text-accent mb-2 group-hover:scale-110 transition-transform duration-300"></i>
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-orange-500/0 group-hover:from-purple-500/20 group-hover:via-pink-500/20 group-hover:to-orange-500/20 transition-all duration-300 rounded-lg -m-8"></div>
                      </div>
                      <p className="text-beige/60 text-xs mt-2 group-hover:text-beige transition-colors">
                        Instagram'da Goruntule
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Bottom CTA */}
          <div className="mt-8 text-center">
            <p className="text-beige/60 text-sm mb-4 flex items-center justify-center gap-2">
              <i className="fas fa-heart text-accent"></i>
              <span>En guncel icerikler, ozel teklifler ve musteri yorumlari icin Instagram sayfamizi ziyaret edin</span>
            </p>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent hover:text-gold transition-colors font-semibold group"
            >
              Tum Paylasimlari Goruntule
              <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstagramFeed
