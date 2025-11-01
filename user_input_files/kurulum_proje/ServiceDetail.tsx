import { useRoute, Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Clock, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  ArrowLeft,
  Calendar
} from "lucide-react";

export default function ServiceDetail() {
  const [, params] = useRoute("/hizmet/:slug");
  const slug = params?.slug || "";

  const { data: service, isLoading, error } = trpc.services.getBySlug.useQuery(
    { slug },
    { enabled: !!slug }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="h-8 bg-muted rounded w-1/4 animate-pulse" />
            <div className="h-12 bg-muted rounded w-3/4 animate-pulse" />
            <div className="h-64 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen py-12">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <AlertCircle className="w-16 h-16 mx-auto mb-4 text-destructive" />
            <h1 className="text-3xl font-bold mb-4">Hizmet Bulunamadı</h1>
            <p className="text-muted-foreground mb-6">
              Aradığınız hizmet bulunamadı veya artık mevcut değil.
            </p>
            <Link href="/hizmetler">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Hizmetlere Dön
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const benefits = service.benefits ? JSON.parse(service.benefits) : [];
  const contraindications = service.contraindications ? JSON.parse(service.contraindications) : [];

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link href="/hizmetler">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Hizmetlere Dön
              </Button>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {service.title}
                </h1>
                {service.category && (
                  <Badge variant="outline" className="mb-4">
                    {service.category}
                  </Badge>
                )}
              </div>
              {service.featured && (
                <Badge className="ml-4">Öne Çıkan</Badge>
              )}
            </div>
            
            <div className="flex items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="text-lg">{service.durationMin} dakika</span>
              </div>
            </div>
          </div>

          {/* Description */}
          {service.description && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Hizmet Açıklaması</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Benefits */}
          {benefits.length > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Faydaları
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {benefits.map((benefit: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Contraindications */}
          {contraindications.length > 0 && (
            <Card className="mb-6 border-destructive/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="w-5 h-5" />
                  Kontrendikasyonlar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Aşağıdaki durumlarda bu hizmeti almadan önce doktorunuza danışmanız önerilir:
                </p>
                <ul className="space-y-2">
                  {contraindications.map((contraindication: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <AlertCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{contraindication}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          <Separator className="my-8" />

          {/* CTA */}
          <div className="bg-card/50 rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Randevunuzu <span className="text-primary">Hemen Alın</span>
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {service.title} hizmetimizden faydalanmak için hemen randevu oluşturun.
              Profesyonel ekibimiz sizinle ilgilenmeyi bekliyor!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/randevu">
                <Button size="lg" className="text-lg px-8">
                  <Calendar className="w-5 h-5 mr-2" />
                  Randevu Al
                </Button>
              </Link>
              <Link href="/hizmetler">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Diğer Hizmetler
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
