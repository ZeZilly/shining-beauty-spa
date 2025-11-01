import { useState, useEffect } from 'react'
import { getGalleryImages, GalleryImage } from '../lib/supabase'

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState('Tümü')
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadGallery() {
      try {
        const data = await getGalleryImages()
        setGalleryImages(data)
      } catch (error) {
        console.error('Error loading gallery:', error)
      } finally {
        setLoading(false)
      }
    }
    loadGallery()
  }, [])

  // Get unique categories
  const categories = ['Tümü', ...Array.from(new Set(galleryImages.map(img => img.category)))]

  const filteredItems = activeCategory === 'Tümü' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory)

  return (
    <div className="bg-primary min-h-screen">
      {/* Hero */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070)',
          }}
        >
          <div className="absolute inset-0 bg-primary-dark/70"></div>
        </div>
        
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-gold mb-4">
            Galeri
          </h1>
          <p className="text-xl text-beige-light">
            Tesisimizi ve hizmetlerimizi keşfedin
          </p>
        </div>
      </section>

      {/* Categories */}
      {!loading && categories.length > 0 && (
        <section className="py-8 bg-primary-light sticky top-20 z-40 shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    activeCategory === category
                      ? 'bg-accent text-primary'
                      : 'bg-primary text-beige border border-gold/20 hover:border-gold/60'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
              <p className="text-beige/60 mt-4">Galeri yükleniyor...</p>
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <div 
                  key={item.id}
                  className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
                >
                  <img 
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                    <span className="text-accent text-sm font-semibold mb-2">{item.category}</span>
                    <h3 className="text-gold text-xl font-heading font-bold">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-beige/60">Bu kategoride henüz görsel bulunmamaktadır.</p>
            </div>
          )}
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10">
        <div className="container mx-auto px-4 text-center">
          <i className="fab fa-instagram text-6xl text-pink-500 mb-6"></i>
          <h2 className="text-4xl font-heading font-bold text-gold mb-4">
            Instagram'da Daha Fazla Görsel
          </h2>
          <p className="text-beige/80 mb-8 max-w-2xl mx-auto">
            Günlük içeriklerimizi ve özel anlarımızı takip edin
          </p>
          <a
            href="https://www.instagram.com/shining.beauty.wellness"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-bold hover:scale-105 transition-transform"
          >
            <i className="fab fa-instagram"></i>
            @shining.beauty.wellness
          </a>
        </div>
      </section>
    </div>
  )
}

export default GalleryPage
