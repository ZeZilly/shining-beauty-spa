import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { APPOINTMENT_SLOTS, WORKING_DAYS } from "@shared/const";
import { Calendar as CalendarIcon, Clock, User, Mail, Phone, MessageSquare } from "lucide-react";
import { tr } from "date-fns/locale";

export default function Appointment() {
  const { user, isAuthenticated } = useAuth();
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [customerName, setCustomerName] = useState(user?.name || "");
  const [customerEmail, setCustomerEmail] = useState(user?.email || "");
  const [customerPhone, setCustomerPhone] = useState(user?.phone || "");
  const [note, setNote] = useState("");

  const { data: services } = trpc.services.list.useQuery();
  const { data: staffList } = trpc.staff.list.useQuery();
  const createAppointmentMutation = trpc.appointments.create.useMutation();

  const selectedServiceData = services?.find(s => s.id === selectedService);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Randevu oluşturmak için giriş yapmalısınız");
      window.location.href = getLoginUrl();
      return;
    }

    if (!selectedService || !selectedDate || !selectedTime) {
      toast.error("Lütfen tüm zorunlu alanları doldurun");
      return;
    }

    try {
      const [hours, minutes] = selectedTime.split(":").map(Number);
      const startTime = new Date(selectedDate);
      startTime.setHours(hours, minutes, 0, 0);

      const endTime = new Date(startTime);
      endTime.setMinutes(endTime.getMinutes() + (selectedServiceData?.durationMin || 60));

      await createAppointmentMutation.mutateAsync({
        serviceId: selectedService,
        staffId: selectedStaff || undefined,
        customerName,
        customerEmail,
        customerPhone,
        appointmentDate: selectedDate,
        startTime,
        endTime,
        note: note || undefined,
      });

      toast.success("Randevunuz başarıyla oluşturuldu! En kısa sürede onaylanacaktır.");
      
      // Form'u sıfırla
      setSelectedService(null);
      setSelectedStaff(null);
      setSelectedDate(undefined);
      setSelectedTime("");
      setNote("");
    } catch (error: any) {
      toast.error(error.message || "Randevu oluşturulurken bir hata oluştu");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen py-12">
        <div className="container">
          <div className="max-w-md mx-auto text-center">
            <Card>
              <CardHeader>
                <CardTitle>Giriş Gerekli</CardTitle>
                <CardDescription>
                  Randevu oluşturmak için giriş yapmalısınız
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => window.location.href = getLoginUrl()} className="w-full">
                  Giriş Yap
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Randevu</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Randevu <span className="text-primary">Oluştur</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Size en uygun tarih ve saati seçin, biz sizi arayalım
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Form */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalendarIcon className="w-5 h-5" />
                      Hizmet Seçimi
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="service">Hizmet *</Label>
                      <Select
                        value={selectedService?.toString()}
                        onValueChange={(value) => setSelectedService(Number(value))}
                      >
                        <SelectTrigger id="service">
                          <SelectValue placeholder="Hizmet seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          {services?.map((service) => (
                            <SelectItem key={service.id} value={service.id.toString()}>
                              {service.title} ({service.durationMin} dk)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="staff">Uzman (Opsiyonel)</Label>
                      <Select
                        value={selectedStaff?.toString() || "any"}
                        onValueChange={(value) => setSelectedStaff(value === "any" ? null : Number(value))}
                      >
                        <SelectTrigger id="staff">
                          <SelectValue placeholder="Uzman seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Farketmez</SelectItem>
                          {staffList?.map((staff) => (
                            <SelectItem key={staff.id} value={staff.id.toString()}>
                              {staff.name} - {staff.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Tarih ve Saat
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Tarih *</Label>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => {
                          const day = date.getDay();
                          return !WORKING_DAYS.includes(day) || date < new Date();
                        }}
                        locale={tr}
                        className="rounded-md border"
                      />
                    </div>

                    {selectedDate && (
                      <div>
                        <Label htmlFor="time">Saat *</Label>
                        <Select value={selectedTime} onValueChange={setSelectedTime}>
                          <SelectTrigger id="time">
                            <SelectValue placeholder="Saat seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            {APPOINTMENT_SLOTS.map((slot) => (
                              <SelectItem key={slot} value={slot}>
                                {slot}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      İletişim Bilgileri
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="name">Ad Soyad *</Label>
                      <Input
                        id="name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">E-posta *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Telefon *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="05XX XXX XX XX"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="note">Not (Opsiyonel)</Label>
                      <Textarea
                        id="note"
                        placeholder="Özel bir isteğiniz varsa buraya yazabilirsiniz..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={createAppointmentMutation.isPending}
                >
                  {createAppointmentMutation.isPending ? "Oluşturuluyor..." : "Randevu Oluştur"}
                </Button>
              </div>

              {/* Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-6">
                  <CardHeader>
                    <CardTitle>Özet</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedServiceData ? (
                      <>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Hizmet</p>
                          <p className="font-semibold">{selectedServiceData.title}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Süre</p>
                          <p className="font-semibold">{selectedServiceData.durationMin} dakika</p>
                        </div>
                      </>
                    ) : (
                      <p className="text-sm text-muted-foreground">Henüz hizmet seçilmedi</p>
                    )}

                    {selectedDate && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Tarih</p>
                        <p className="font-semibold">
                          {selectedDate.toLocaleDateString("tr-TR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    )}

                    {selectedTime && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Saat</p>
                        <p className="font-semibold">{selectedTime}</p>
                      </div>
                    )}

                    {selectedStaff && staffList && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Uzman</p>
                        <p className="font-semibold">
                          {staffList.find(s => s.id === selectedStaff)?.name}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
