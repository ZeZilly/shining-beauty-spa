import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, CalendarCheck, ChevronDown, Quote, Sparkles } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import InstagramFeed from '@/components/InstagramFeed'
import { Seo } from '@/components/seo/Seo'
import { getServices, getTestimonials, Service, Testimonial } from '@/lib/supabase'
import { cn } from '@/lib/utils'

const heroImage = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070'

const HomePage = () => {
  const [services, setServices] = useState<Service[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  const pageUrl = typeof window !== 'undefined' ? window.location.href : 'https://shining.icu'

  useEffect(() => {
    async function loadData() {
      try {
        const [servicesData, testimonialsData] = await Promise.all([
          getServices(),
          getTestimonials(3)
        ])
        setServices(servicesData)
        setTestimonials(testimonialsData)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const serviceCategories = useMemo(() => (
    services.reduce((acc, service) => {
      if (!acc[service.category]) {
        acc[service.category] = []
      }
      acc[service.category].push(service)
      return acc
    }, {} as Record<string, Service[]>)
  ), [services])

  const categoryPreviews = useMemo(() => (
    Object.entries(serviceCategories).map(([category, items]) => ({
      category,
      service: items[0]
    }))
  ), [serviceCategories])

  const structuredData = useMemo(() => [{
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${pageUrl}#business`,
    name: 'Shining Beauty & Wellness',
    url: pageUrl,
    image: heroImage,
    telephone: '+90 505 071 95 01',
    priceRange: '$$'
  }], [pageUrl])

  return (
    <div className="bg-primary">
      <Seo
        title="Shining Beauty & Wellness | Adana Güzellik & Spa Merkezi"
        description="Adana Gazipaşa'da cilt bakımı, masaj, spa ve wellness uygulamalarını deneyimleyin. Shining Beauty & Wellness'ta kişiye özel bakımlar, kampanyalar ve uzman ekip sizi bekliyor."
        canonical={pageUrl}
        keywords={[
          'adana cilt bakımı',
          'adana spa merkezi',
          'kafa masajı adana',
          'güzellik salonu gazipaşa',
          'shining beauty wellness'
        ]}
        image={heroImage}
        structuredData={structuredData}
      />

      <section className="relative flex h-[min(90vh,720px)] items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/80 via-primary/70 to-primary-dark/80"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <Badge className="mb-4 bg-accent text-primary shadow-md">
            Adana Gazipaşa'da Lüks Spa & Güzellik Deneyimi
          </Badge>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-gold mb-6">
            Shining Beauty&Wellness
          </h1>
          <p className="text-xl md:text-2xl text-beige-light mb-8 font-light">
            Kendinize değer verin, yeniden keşfedin
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent text-primary shadow-lg hover:bg-gold">
              <Link to="/hizmetler" className="gap-2">
                Hizmetlerimizi Keşfedin
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-primary"
            >
              <Link to="/iletisim" className="gap-2">
                Randevu Al
                <CalendarCheck className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gold">
          <ChevronDown className="h-8 w-8" aria-hidden />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-primary-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-accent text-sm uppercase tracking-widest mb-2">Özel Bakım</p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gold mb-4">
              Hizmetlerimiz
            </h2>
            <p className="text-beige/80 max-w-2xl mx-auto">
              En yeni güzellik trendlerini, en etkili uygulamalarla buluşturduğumuz merkezimizde 
              güzelliğinizi yeniden keşfetmeye hazır mısınız?
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="bg-primary border-gold/10">
                  <CardHeader className="space-y-4">
                    <Skeleton className="h-12 w-12 rounded-full bg-accent/20" />
                    <Skeleton className="h-6 w-3/4 bg-accent/20" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-16 w-full bg-accent/10" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-10 w-24 bg-accent/10" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {categoryPreviews.map((item, index) => (
                <Card
                  key={index}
                  className="group h-full border-gold/20 bg-primary transition-colors hover:border-gold/60 hover:shadow-2xl"
                >
                  <Link to={`/hizmetler/${item.service.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <CardHeader className="space-y-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent transition-colors group-hover:bg-accent/20">
                        <Sparkles className="h-7 w-7" aria-hidden />
                      </div>
                      <CardTitle className="text-xl font-heading text-gold transition-colors group-hover:text-accent">
                        {item.category}
                      </CardTitle>
                      <CardDescription className="text-beige/70">
                        {item.service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-0">
                      <Button variant="link" className="gap-2 px-0 text-accent">
                        Detayları Gör
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Link>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link 
              to="/hizmetler"
              className="inline-flex items-center gap-2 text-accent hover:text-gold transition-colors font-semibold"
            >
              Tüm Hizmetleri Gör
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=2070"
                alt="Shining Beauty&Wellness Interior"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div>
              <p className="text-accent text-sm uppercase tracking-widest mb-2">Hakkımızda</p>
              <h2 className="text-4xl font-heading font-bold text-gold mb-6">
                Shining Beauty&Wellness ile Tanışın
              </h2>
              <p className="text-beige/80 mb-6">
                Uzman ekibimiz ve kaliteli ürünlerimizle, güzellik ve sağlığınızı bir bütün olarak ele alıyor, 
                kişiye özel çözümler sunuyoruz. Modern ve lüks tesisimizde, kendinizi özel hissedeceğiniz 
                bir atmosfer yaratıyoruz.
              </p>
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold">5+</div>
                  <div className="text-beige/70 text-sm">Yıllık Deneyim</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold">1000+</div>
                  <div className="text-beige/70 text-sm">Mutlu Müşteri</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold">20+</div>
                  <div className="text-beige/70 text-sm">Özel Tedavi</div>
                </div>
              </div>
              <Button asChild className="bg-accent text-primary hover:bg-gold">
                <Link to="/hakkimizda" className="gap-2">
                  Daha Fazla Bilgi
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-primary-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-accent text-sm uppercase tracking-widest mb-2">Müşteri Yorumları</p>
            <h2 className="text-4xl font-heading font-bold text-gold mb-4">
              Bizi Tercih Edenler Ne Diyor?
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : testimonials.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="border-gold/20 bg-primary">
                  <CardHeader className="space-y-4">
                    <Quote className="h-10 w-10 text-accent" aria-hidden />
                    <CardDescription className="text-beige/80 italic">
                      &ldquo;{testimonial.comment}&rdquo;
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="border-t border-gold/10 pt-6">
                    <div className="flex flex-col gap-2">
                      <span className="font-semibold text-gold">{testimonial.name}</span>
                      <div className="flex items-center gap-1 text-accent">
                        {Array.from({ length: testimonial.rating }).map((_, index) => (
                          <Sparkles key={index} className="h-4 w-4" aria-hidden />
                        ))}
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center text-beige/60">
              Henüz yorum bulunmamaktadır.
            </div>
          )}
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-20">
        <InstagramFeed 
          title="Sosyal Medyada Bizi Takip Edin"
          subtitle="En son paylaşımlarımız, özel kampanyalar ve güzellik ipuçları için Instagram'da bizi takip edin"
          showButton={true}
          maxPosts={8}
        />
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent/20 to-gold/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-heading font-bold text-gold mb-6">
            Kendinize Değer Vermeye Hazır mısınız?
          </h2>
          <p className="text-beige/80 mb-8 max-w-2xl mx-auto">
            Hemen randevu alın ve Shining Beauty&Wellness deneyimini yaşayın
          </p>
          <Button
            asChild
            size="lg"
            className="gap-2 bg-accent text-primary font-bold shadow-lg hover:bg-gold hover:shadow-xl"
          >
            <Link to="/iletisim">
              Randevu Al
              <CalendarCheck className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

export default HomePage
