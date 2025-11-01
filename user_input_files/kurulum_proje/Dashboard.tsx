import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, Redirect } from "wouter";
import { 
  Calendar, 
  Users, 
  MessageSquare, 
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react";

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const { data: appointments } = trpc.appointments.listAll.useQuery(undefined, {
    enabled: user?.role === 'admin'
  });
  const { data: reviews } = trpc.reviews.listAll.useQuery(undefined, {
    enabled: user?.role === 'admin'
  });
  const { data: contactMessages } = trpc.contact.listAll.useQuery(undefined, {
    enabled: user?.role === 'admin'
  });

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>;
  }

  if (!user || user.role !== 'admin') {
    return <Redirect to="/" />;
  }

  const pendingAppointments = appointments?.filter(a => a.status === 'pending').length || 0;
  const confirmedAppointments = appointments?.filter(a => a.status === 'confirmed').length || 0;
  const pendingReviews = reviews?.filter(r => !r.isApproved).length || 0;
  const unreadMessages = contactMessages?.filter(m => !m.isRead).length || 0;

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Paneli</h1>
          <p className="text-muted-foreground">
            Hoş geldiniz, {user.name}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bekleyen Randevular</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingAppointments}</div>
              <p className="text-xs text-muted-foreground">
                Onay bekliyor
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Onaylı Randevular</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{confirmedAppointments}</div>
              <p className="text-xs text-muted-foreground">
                Aktif randevular
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bekleyen Yorumlar</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingReviews}</div>
              <p className="text-xs text-muted-foreground">
                Moderasyon gerekli
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Okunmamış Mesajlar</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unreadMessages}</div>
              <p className="text-xs text-muted-foreground">
                Yanıt bekliyor
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/admin/appointments">
            <Card className="hover:shadow-lg transition-all cursor-pointer group">
              <CardHeader>
                <Calendar className="w-8 h-8 mb-2 text-primary" />
                <CardTitle className="group-hover:text-primary">Randevular</CardTitle>
                <CardDescription>
                  Randevuları görüntüle ve yönet
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full">
                  Randevulara Git →
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/reviews">
            <Card className="hover:shadow-lg transition-all cursor-pointer group">
              <CardHeader>
                <MessageSquare className="w-8 h-8 mb-2 text-primary" />
                <CardTitle className="group-hover:text-primary">Yorumlar</CardTitle>
                <CardDescription>
                  Müşteri yorumlarını onayla
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full">
                  Yorumlara Git →
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/services">
            <Card className="hover:shadow-lg transition-all cursor-pointer group">
              <CardHeader>
                <FileText className="w-8 h-8 mb-2 text-primary" />
                <CardTitle className="group-hover:text-primary">Hizmetler</CardTitle>
                <CardDescription>
                  Hizmetleri düzenle ve ekle
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full">
                  Hizmetlere Git →
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/staff">
            <Card className="hover:shadow-lg transition-all cursor-pointer group">
              <CardHeader>
                <Users className="w-8 h-8 mb-2 text-primary" />
                <CardTitle className="group-hover:text-primary">Personel</CardTitle>
                <CardDescription>
                  Personel bilgilerini yönet
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full">
                  Personele Git →
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/blog">
            <Card className="hover:shadow-lg transition-all cursor-pointer group">
              <CardHeader>
                <FileText className="w-8 h-8 mb-2 text-primary" />
                <CardTitle className="group-hover:text-primary">Blog</CardTitle>
                <CardDescription>
                  Blog yazılarını yönet
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full">
                  Blog'a Git →
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/messages">
            <Card className="hover:shadow-lg transition-all cursor-pointer group">
              <CardHeader>
                <MessageSquare className="w-8 h-8 mb-2 text-primary" />
                <CardTitle className="group-hover:text-primary">Mesajlar</CardTitle>
                <CardDescription>
                  İletişim formundan gelen mesajlar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full">
                  Mesajlara Git →
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Appointments */}
        {appointments && appointments.length > 0 && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Son Randevular</CardTitle>
                <CardDescription>
                  En son oluşturulan randevular
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.slice(0, 5).map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-semibold">{appointment.customerName}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(appointment.appointmentDate).toLocaleDateString('tr-TR')} - {appointment.customerPhone}
                        </p>
                      </div>
                      <Badge
                        variant={
                          appointment.status === 'confirmed' ? 'default' :
                          appointment.status === 'pending' ? 'secondary' :
                          appointment.status === 'cancelled' ? 'destructive' :
                          'outline'
                        }
                      >
                        {appointment.status === 'pending' && 'Bekliyor'}
                        {appointment.status === 'confirmed' && 'Onaylandı'}
                        {appointment.status === 'cancelled' && 'İptal'}
                        {appointment.status === 'completed' && 'Tamamlandı'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
