import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Redirect, Link } from "wouter";
import { ArrowLeft, CheckCircle2, XCircle, Clock } from "lucide-react";

export default function AdminAppointments() {
  const { user, loading } = useAuth();
  const [filterStatus, setFilterStatus] = useState<string>("all");
  
  const utils = trpc.useUtils();
  const { data: appointments, isLoading } = trpc.appointments.listAll.useQuery(undefined, {
    enabled: user?.role === 'admin'
  });
  const { data: services } = trpc.services.listAll.useQuery(undefined, {
    enabled: user?.role === 'admin'
  });
  const { data: staffList } = trpc.staff.listAll.useQuery(undefined, {
    enabled: user?.role === 'admin'
  });

  const updateStatusMutation = trpc.appointments.updateStatus.useMutation({
    onSuccess: () => {
      utils.appointments.listAll.invalidate();
      toast.success("Randevu durumu güncellendi");
    },
    onError: (error) => {
      toast.error(error.message || "Bir hata oluştu");
    }
  });

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>;
  }

  if (!user || user.role !== 'admin') {
    return <Redirect to="/" />;
  }

  const filteredAppointments = appointments?.filter(apt => {
    if (filterStatus === "all") return true;
    return apt.status === filterStatus;
  });

  const handleStatusChange = async (id: number, status: "pending" | "confirmed" | "cancelled" | "completed") => {
    await updateStatusMutation.mutateAsync({ id, status });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <div className="mb-8">
          <Link href="/admin">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Admin Paneline Dön
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-2">Randevular</h1>
          <p className="text-muted-foreground">
            Tüm randevuları görüntüle ve yönet
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Randevu Listesi</CardTitle>
                <CardDescription>
                  Toplam {appointments?.length || 0} randevu
                </CardDescription>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Durum filtrele" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="pending">Bekliyor</SelectItem>
                  <SelectItem value="confirmed">Onaylandı</SelectItem>
                  <SelectItem value="completed">Tamamlandı</SelectItem>
                  <SelectItem value="cancelled">İptal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Yükleniyor...</div>
            ) : filteredAppointments && filteredAppointments.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Müşteri</TableHead>
                      <TableHead>Hizmet</TableHead>
                      <TableHead>Tarih</TableHead>
                      <TableHead>Saat</TableHead>
                      <TableHead>Personel</TableHead>
                      <TableHead>Durum</TableHead>
                      <TableHead>İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAppointments.map((appointment) => {
                      const service = services?.find(s => s.id === appointment.serviceId);
                      const staff = staffList?.find(s => s.id === appointment.staffId);
                      
                      return (
                        <TableRow key={appointment.id}>
                          <TableCell>
                            <div>
                              <p className="font-semibold">{appointment.customerName}</p>
                              <p className="text-sm text-muted-foreground">{appointment.customerPhone}</p>
                            </div>
                          </TableCell>
                          <TableCell>{service?.title || "Bilinmiyor"}</TableCell>
                          <TableCell>
                            {new Date(appointment.appointmentDate).toLocaleDateString('tr-TR')}
                          </TableCell>
                          <TableCell>
                            {new Date(appointment.startTime).toLocaleTimeString('tr-TR', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </TableCell>
                          <TableCell>{staff?.name || "Belirtilmemiş"}</TableCell>
                          <TableCell>
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
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {appointment.status === 'pending' && (
                                <>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleStatusChange(appointment.id, 'confirmed')}
                                    disabled={updateStatusMutation.isPending}
                                  >
                                    <CheckCircle2 className="w-4 h-4 mr-1" />
                                    Onayla
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                                    disabled={updateStatusMutation.isPending}
                                  >
                                    <XCircle className="w-4 h-4 mr-1" />
                                    İptal
                                  </Button>
                                </>
                              )}
                              {appointment.status === 'confirmed' && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleStatusChange(appointment.id, 'completed')}
                                  disabled={updateStatusMutation.isPending}
                                >
                                  <CheckCircle2 className="w-4 h-4 mr-1" />
                                  Tamamlandı
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Henüz randevu bulunmuyor
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
