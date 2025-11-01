import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getServices, Service } from '../lib/supabase'

const ServiceDetailPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const [service, setService] = useState<Service | null>(null)
  const [relatedServices, setRelatedServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadService() {
      try {
        const services = await getServices()
        
        // Find service by slug
        const foundService = services.find(s => 
          s.name.toLowerCase().replace(/\s+/g, '-') === slug
        )
        
        if (foundService) {
          setService(foundService)
          
          // Get related services (same category)
          const related = services
            .filter(s => s.category === foundService.category && s.id !== foundService.id)
            .slice(0, 3)
          setRelatedServices(related)
        }
      } catch (error) {
        console.error('Error loading service:', error)
      } finally {
        setLoading(false)
      }
    }
    loadService()
  }, [slug])

  if (loading) {
    return (
      <div className="bg-primary min-h-screen pt-20">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="inline-block w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            <p className="text-beige/60 mt-4">Hizmet detayları yükleniyor...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="bg-primary min-h-screen pt-20">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-3xl font-heading font-bold text-gold mb-4">Hizmet Bulunamadı</h1>
            <p className="text-beige/70 mb-8">Aradığınız hizmet mevcut değil.</p>
            <Link to="/hizmetler" className="bg-accent text-primary px-6 py-3 rounded-lg font-medium hover:bg-gold transition-colors">
              Tüm Hizmetlere Dön
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Service-specific content based on slug
  const getServiceDetails = (slug: string) => {
    switch (slug) {
      case 'spa-masaj':
        return {
          duration: '60-90 dk',
          price: '₺800 - ₺1.200',
          benefits: [
            'Kas gerginliğini giderir',
            'Kan dolaşımını artırır',
            'Stresi azaltır',
            'Uyku kalitesini iyileştirir',
            'Esnekliği artırır'
          ],
          contraindications: [
            'Ateşli hastalıklar',
            'Açık yaralar',
            'Hamile (ilk 3 ay)',
            'Derin damar trombozu',
            'Kanser tedavisi süreci'
          ],
          beforeAfter: [
            {
              image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600',
              title: 'Önce - Kas Gerginliği'
            },
            {
              image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=600',
              title: 'Sonra - Rahatlama'
            }
          ],
          description: 'Modern yaşamın getirdiği stres ve kas gerginliğine karşı profesyonel çözüm. Uzman masörlerimizle kendinizi yenileyin.',
          process: [
            'Kişisel değerlendirme ve anamnez',
            'Isıtma yağı ile başlangıç',
            'Derin doku masajı teknikleri',
            'Germe egzersizleri',
            'Son 10 dakika relaksasyon'
          ]
        }
      case 'cilt-bakimi':
        return {
          duration: '75 dk',
          price: '₺1.000 - ₺1.500',
          benefits: [
            'Cildi temizler ve arındırır',
            'Gözenekleri küçültür',
            'Yaşlanma karşıtı etki',
            'Eşitlenen ten rengi',
            'Parlak ve canlı görünüm'
          ],
          contraindications: [
            'Aktif akne (ileri durum)',
            'Cilt enfeksiyonları',
            'Yeni yapılmış botoks (48 saat)',
            'Hamile (duyarlılık)',
            'Fotosensitif ilaç kullanımı'
          ],
          beforeAfter: [
            {
              image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600',
              title: 'Önce - Mat ve yorgun görünüm'
            },
            {
              image: 'https://images.unsplash.com/photo-1519255424061-58e1b5a87da9?q=80&w=600',
              title: 'Sonra - Parlak ve temiz cilt'
            }
          ],
          description: 'Cildin ihtiyaçlarına özel, medikal kalitede cilt bakım uygulamalarımızla doğal güzelliğinizi ortaya çıkarın.',
          process: [
            'Cilt analizi ve temizlik',
            'Peeling ve arındırma',
            ' Buhar uygulaması',
            ' Maske ve serum seçimi',
            'Nemlendirme ve koruma'
          ]
        }
      default:
        return null
    }
  }

  const serviceDetails = getServiceDetails(slug || '')

  if (!serviceDetails) {
    return (
      <div className="bg-primary min-h-screen pt-20">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-3xl font-heading font-bold text-gold mb-4">Detay Bulunamadı</h1>
            <p className="text-beige/70 mb-8">Bu hizmet için detay sayfası hazırlanmaktadır.</p>
            <Link to="/hizmetler" className="bg-accent text-primary px-6 py-3 rounded-lg font-medium hover:bg-gold transition-colors">
              Tüm Hizmetlere Dön
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-primary min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=2070)',
          }}
        >
          <div className="absolute inset-0 bg-primary-dark/70"></div>
        </div>
        
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-gold mb-4">
            {service.name}
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-beige-light">
            <span className="flex items-center gap-2">
              <i className="fas fa-clock text-accent"></i>
              {serviceDetails.duration}
            </span>
            <span className="flex items-center gap-2">
              <i className="fas fa-tag text-accent"></i>
              {serviceDetails.price}
            </span>
          </div>
        </div>
      </section>

      {/* Service Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Description */}
              <div className="bg-primary-light p-8 rounded-xl border border-gold/20">
                <h2 className="text-2xl font-heading font-bold text-gold mb-4">
                  <i className="fas fa-info-circle text-accent mr-2"></i>
                  Hizmet Hakkında
                </h2>
                <p className="text-beige/80 leading-relaxed">
                  {serviceDetails.description}
                </p>
              </div>

              {/* Process */}
              <div className="bg-primary-light p-8 rounded-xl border border-gold/20">
                <h2 className="text-2xl font-heading font-bold text-gold mb-6">
                  <i className="fas fa-list-check text-accent mr-2"></i>
                  Uygulama Süreci
                </h2>
                <div className="space-y-4">
                  {serviceDetails.process.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-accent text-primary rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <p className="text-beige/80 pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-primary-light p-8 rounded-xl border border-gold/20">
                <h2 className="text-2xl font-heading font-bold text-gold mb-6">
                  <i className="fas fa-heart text-accent mr-2"></i>
                  Faydaları
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {serviceDetails.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <i className="fas fa-check-circle text-green-500"></i>
                      <span className="text-beige/80">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contraindications */}
              <div className="bg-red-500/10 p-8 rounded-xl border border-red-500/20">
                <h2 className="text-2xl font-heading font-bold text-red-400 mb-6">
                  <i className="fas fa-exclamation-triangle mr-2"></i>
                  Kontendikasyonlar
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {serviceDetails.contraindications.map((contra, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <i className="fas fa-times-circle text-red-400"></i>
                      <span className="text-beige/80">{contra}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Before & After */}
              <div className="bg-primary-light p-8 rounded-xl border border-gold/20">
                <h2 className="text-2xl font-heading font-bold text-gold mb-6">
                  <i className="fas fa-images text-accent mr-2"></i>
                  Önce & Sonra
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {serviceDetails.beforeAfter.map((item, index) => (
                    <div key={index} className="group cursor-pointer">
                      <div className="relative overflow-hidden rounded-lg">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
                        <p className="absolute bottom-4 left-4 text-gold font-medium">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Booking Card */}
              <div className="bg-gradient-to-br from-accent to-gold p-6 rounded-xl text-primary">
                <h3 className="text-xl font-heading font-bold mb-4">
                  Hemen Randevu Al
                </h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <i className="fas fa-clock"></i>
                    <span className="text-sm">{serviceDetails.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fas fa-tag"></i>
                    <span className="text-sm">{serviceDetails.price}</span>
                  </div>
                </div>
                <Link 
                  to="/iletisim"
                  className="w-full bg-primary text-accent py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors text-center block"
                >
                  Randevu Oluştur
                </Link>
              </div>

              {/* Contact */}
              <div className="bg-primary-light p-6 rounded-xl border border-gold/20">
                <h3 className="text-xl font-heading font-bold text-gold mb-4">
                  Bilgi Alın
                </h3>
                <div className="space-y-3">
                  <a 
                    href="tel:+905050719501"
                    className="flex items-center gap-3 text-beige/80 hover:text-accent transition-colors"
                  >
                    <i className="fas fa-phone text-accent"></i>
                    <span>+90 505 071 95 01</span>
                  </a>
                  <a 
                    href="mailto:info@shining.icu"
                    className="flex items-center gap-3 text-beige/80 hover:text-accent transition-colors"
                  >
                    <i className="fas fa-envelope text-accent"></i>
                    <span>info@shining.icu</span>
                  </a>
                  <a 
                    href="https://wa.me/905050719501"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-beige/80 hover:text-green-500 transition-colors"
                  >
                    <i className="fab fa-whatsapp text-green-500"></i>
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Related Services */}
              {relatedServices.length > 0 && (
                <div className="bg-primary-light p-6 rounded-xl border border-gold/20">
                  <h3 className="text-xl font-heading font-bold text-gold mb-4">
                    İlgili Hizmetler
                  </h3>
                  <div className="space-y-3">
                    {relatedServices.map((relatedService) => (
                      <Link
                        key={relatedService.id}
                        to={`/hizmetler/${relatedService.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block p-3 rounded-lg bg-primary hover:bg-accent/10 transition-colors group"
                      >
                        <p className="text-beige/80 group-hover:text-accent font-medium">
                          {relatedService.name}
                        </p>
                        <p className="text-sm text-beige/60">
                          {relatedService.duration}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServiceDetailPage