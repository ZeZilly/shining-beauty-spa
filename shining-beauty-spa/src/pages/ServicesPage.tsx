import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getServices, Service } from '../lib/supabase'

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await getServices()
        setServices(data)
      } catch (error) {
        console.error('Error loading services:', error)
      } finally {
        setLoading(false)
      }
    }
    loadServices()
  }, [])

  // Group services by category
  const servicesByCategory = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = {
        category: service.category,
        icon: service.icon || 'fa-spa',
        items: []
      }
    }
    acc[service.category].items.push(service)
    return acc
  }, {} as Record<string, { category: string; icon: string; items: Service[] }>)

  const categoryList = Object.values(servicesByCategory)

  return (
    <div className="bg-primary min-h-screen">
      {/* Hero */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?q=80&w=2070)',
          }}
        >
          <div className="absolute inset-0 bg-primary-dark/70"></div>
        </div>
        
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-gold mb-4">
            Hizmetlerimiz
          </h1>
          <p className="text-xl text-beige-light">
            Size özel profesyonel bakım ve wellness çözümleri
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
              <p className="text-beige/60 mt-4">Hizmetler yükleniyor...</p>
            </div>
          ) : categoryList.length > 0 ? (
            <div className="space-y-20">
              {categoryList.map((service, index) => (
                <div key={index}>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                      <i className={`fas ${service.icon} text-3xl text-accent`}></i>
                    </div>
                    <h2 className="text-4xl font-heading font-bold text-gold">
                      {service.category}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {service.items.map((item) => (
                      <Link
                        key={item.id}
                        to={`/hizmetler/${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block bg-primary-light p-6 rounded-xl border border-gold/20 hover:border-gold/60 hover:shadow-xl transition-all group"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-heading font-bold text-gold group-hover:text-accent transition-colors">
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="text-accent text-sm bg-accent/10 px-3 py-1 rounded-full">
                              {item.duration}
                            </span>
                            <i className="fas fa-arrow-right text-accent text-sm group-hover:translate-x-1 transition-transform"></i>
                          </div>
                        </div>
                        <p className="text-beige/70 group-hover:text-beige transition-colors">
                          {item.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-beige/60">Henüz hizmet bulunmamaktadır.</p>
            </div>
          )}

          {/* CTA */}
          {!loading && categoryList.length > 0 && (
            <div className="mt-16 text-center bg-gradient-to-r from-accent/10 to-gold/10 p-12 rounded-2xl">
              <h3 className="text-3xl font-heading font-bold text-gold mb-4">
                Size En Uygun Hizmeti Bulalım
              </h3>
              <p className="text-beige/80 mb-6">
                Randevu alın ve uzman ekibimizle ihtiyaçlarınıza özel bakım programı oluşturalım
              </p>
              <a
                href="/iletisim"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-primary font-bold rounded-lg hover:bg-gold transition-all shadow-lg"
              >
                Randevu Al
                <i className="fas fa-calendar-check"></i>
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default ServicesPage
