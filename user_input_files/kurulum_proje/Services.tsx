import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SERVICE_CATEGORIES } from "@shared/const";
import { Link } from "wouter";
import { Clock, Search, ChevronRight, Sparkles } from "lucide-react";

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: services, isLoading } = trpc.services.list.useQuery();

  const filteredServices = services?.filter((service) => {
    const matchesCategory = !selectedCategory || service.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Hizmetlerimiz</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Size Özel <span className="text-primary">Hizmetler</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Profesyonel ekibimiz ve modern ekipmanlarımızla size en iyi hizmeti sunuyoruz
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Hizmet ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              size="sm"
            >
              Tümü
            </Button>
            {SERVICE_CATEGORIES.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                size="sm"
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-4 bg-muted rounded w-full" />
                </CardHeader>
                <CardContent>
                  <div className="h-24 bg-muted rounded mb-4" />
                  <div className="h-10 bg-muted rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredServices && filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <Link key={service.id} href={`/hizmet/${service.slug}`}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:border-primary/50 cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="group-hover:text-primary transition-colors flex-1">
                        {service.title}
                      </CardTitle>
                      {service.featured && (
                        <Badge variant="outline" className="ml-2">
                          <Sparkles className="w-3 h-3 mr-1" />
                          Öne Çıkan
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {service.durationMin} dakika
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground line-clamp-3">
                      {service.shortDescription || service.description}
                    </p>
                    
                    {service.benefits && (
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-primary">Faydaları:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {JSON.parse(service.benefits).slice(0, 3).map((benefit: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span className="line-clamp-1">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <Button 
                      variant="ghost" 
                      className="w-full group-hover:text-primary group-hover:bg-primary/10"
                    >
                      Detayları Gör
                      <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Aradığınız kriterlere uygun hizmet bulunamadı.
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center bg-card/50 rounded-lg p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Randevunuzu <span className="text-primary">Hemen Alın</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
            Size en uygun hizmeti seçtiniz mi? Hemen randevu oluşturun ve kendinize değer verin!
          </p>
          <Link href="/randevu">
            <Button size="lg" className="text-lg px-8 py-6">
              Randevu Al
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
