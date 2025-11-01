import { useAuth } from "@/_core/hooks/useAuth";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { SITE_INFO } from "@shared/const";
import { Link } from "wouter";
import { 
  Sparkles, 
  Clock, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  MessageCircle,
  Calendar,
  ChevronRight
} from "lucide-react";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const { data: services, isLoading: servicesLoading } = trpc.services.list.useQuery();
  const { data: reviews } = trpc.reviews.featured.useQuery();
  const { data: blogPosts } = trpc.blog.list.useQuery();

  return (
    <>
      <SEO />
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background opacity-50" />
        
        <div className="container relative z-10 text-center space-y-8 py-20">
          <Badge variant="outline" className="text-primary border-primary/50 px-4 py-2 text-sm">
            <Sparkles className="w-4 h-4 mr-2 inline" />
            {SITE_INFO.tagline}
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="block text-foreground">Kendinize</span>
            <span className="block text-primary">Değer Verin</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            {SITE_INFO.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link href="/randevu">
              <Button size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90">
                <Calendar className="w-5 h-5 mr-2" />
                Randevu Al
              </Button>
            </Link>
            <Link href="/hizmetler">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Hizmetlerimiz
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
      </section>

      {/* Services Section */}
      <section className="py-20 bg-card/50">
        <div className="container">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Hizmetlerimiz</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Size Özel <span className="text-primary">Hizmetler</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Profesyonel ekibimiz ve modern ekipmanlarımızla size en iyi hizmeti sunuyoruz
            </p>
          </div>

          {servicesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-4 bg-muted rounded w-full" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-20 bg-muted rounded" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services?.slice(0, 6).map((service) => (
                <Link key={service.id} href={`/hizmet/${service.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:border-primary/50 cursor-pointer group">
                    <CardHeader>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {service.durationMin} dakika
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-3">
                        {service.shortDescription || service.description}
                      </p>
                      <Button variant="ghost" className="mt-4 group-hover:text-primary">
                        Detaylar
                        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/hizmetler">
              <Button size="lg" variant="outline">
                Tüm Hizmetleri Gör
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      {reviews && reviews.length > 0 && (
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Müşteri Yorumları</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Müşterilerimiz <span className="text-primary">Ne Diyor?</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <Card key={review.id} className="bg-card/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{review.customerName}</CardTitle>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "fill-primary text-primary"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground italic">"{review.comment}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Section */}
      {blogPosts && blogPosts.length > 0 && (
        <section className="py-20 bg-card/50">
          <div className="container">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">Blog</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Güzellik ve <span className="text-primary">Sağlık İpuçları</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.slice(0, 3).map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:border-primary/50 cursor-pointer group">
                    {post.coverImage && (
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <CardDescription>{post.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="ghost" className="group-hover:text-primary">
                        Devamını Oku
                        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">İletişim</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Bize <span className="text-primary">Ulaşın</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <MapPin className="w-8 h-8 mx-auto mb-2 text-primary" />
                <CardTitle>Adres</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {SITE_INFO.address.street}<br />
                  {SITE_INFO.address.city}, {SITE_INFO.address.country}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Phone className="w-8 h-8 mx-auto mb-2 text-primary" />
                <CardTitle>Telefon</CardTitle>
              </CardHeader>
              <CardContent>
                <a href={`tel:${SITE_INFO.phone}`} className="text-muted-foreground hover:text-primary">
                  {SITE_INFO.phone}
                </a>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Mail className="w-8 h-8 mx-auto mb-2 text-primary" />
                <CardTitle>E-posta</CardTitle>
              </CardHeader>
              <CardContent>
                <a href={`mailto:${SITE_INFO.email}`} className="text-muted-foreground hover:text-primary">
                  {SITE_INFO.email}
                </a>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Clock className="w-8 h-8 mx-auto mb-2 text-primary" />
                <CardTitle>Çalışma Saatleri</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Hafta içi: {SITE_INFO.hours.weekdays}<br />
                  Cumartesi: {SITE_INFO.hours.saturday}<br />
                  Pazar: {SITE_INFO.hours.sunday}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center gap-4 mt-12">
            <a
              href={SITE_INFO.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 text-white hover:scale-110 transition-transform"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href={SITE_INFO.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white hover:scale-110 transition-transform"
            >
              <MessageCircle className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href={SITE_INFO.social.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-white shadow-lg hover:scale-110 transition-transform"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
    </>
  );
}
