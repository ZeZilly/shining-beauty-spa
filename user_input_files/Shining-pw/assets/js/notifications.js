// Notification System for Appointments and Communications
class NotificationSystem {
    constructor() {
        this.templates = {
            appointment_confirmation: {
                sms: "Merhaba {name}, {date} {time} randevunuz onaylandı. Randevu No: {appointmentId}. Shining Beauty - +90 505 071 95 01",
                email: {
                    subject: "Randevu Onayı - Shining Beauty",
                    body: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <div style="background: #181818; padding: 20px; text-align: center;">
                                <h1 style="color: #d9b36a; margin: 0;">Shining Beauty</h1>
                            </div>
                            <div style="padding: 30px; background: #f9f9f9;">
                                <h2 style="color: #181818;">Randevunuz Onaylandı!</h2>
                                <p>Merhaba <strong>{name}</strong>,</p>
                                <p>Randevunuz başarıyla oluşturulmuştur. Detaylar aşağıdadır:</p>
                                
                                <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                                    <table style="width: 100%; border-collapse: collapse;">
                                        <tr><td style="padding: 8px 0; font-weight: bold;">Randevu No:</td><td>{appointmentId}</td></tr>
                                        <tr><td style="padding: 8px 0; font-weight: bold;">Hizmet:</td><td>{service}</td></tr>
                                        <tr><td style="padding: 8px 0; font-weight: bold;">Uzman:</td><td>{staff}</td></tr>
                                        <tr><td style="padding: 8px 0; font-weight: bold;">Tarih:</td><td>{date}</td></tr>
                                        <tr><td style="padding: 8px 0; font-weight: bold;">Saat:</td><td>{time}</td></tr>
                                        <tr><td style="padding: 8px 0; font-weight: bold;">Süre:</td><td>{duration} dakika</td></tr>
                                        <tr><td style="padding: 8px 0; font-weight: bold;">Ücret:</td><td>₺{price}</td></tr>
                                    </table>
                                </div>
                                
                                <p><strong>Önemli Notlar:</strong></p>
                                <ul>
                                    <li>Randevunuzdan 15 dakika önce gelmemizi rica ederiz</li>
                                    <li>İptal veya değişiklik için en az 24 saat önceden bildiriniz</li>
                                    <li>Sorularınız için +90 505 071 95 01 numarasını arayabilirsiniz</li>
                                </ul>
                                
                                <div style="text-align: center; margin: 30px 0;">
                                    <a href="https://shinings.pw" style="background: #d9b36a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Web Sitemizi Ziyaret Edin</a>
                                </div>
                            </div>
                            <div style="background: #181818; padding: 20px; text-align: center; color: #d9b36a;">
                                <p>Gazipaşa, Adana | +90 505 071 95 01 | shinings.pw@ud.me</p>
                            </div>
                        </div>
                    `
                }
            },
            appointment_reminder: {
                sms: "Merhaba {name}, yarın {time} randevunuz bulunmaktadır. Randevu No: {appointmentId}. Shining Beauty",
                email: {
                    subject: "Randevu Hatırlatması - Shining Beauty",
                    body: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <div style="background: #181818; padding: 20px; text-align: center;">
                                <h1 style="color: #d9b36a; margin: 0;">Shining Beauty</h1>
                            </div>
                            <div style="padding: 30px; background: #f9f9f9;">
                                <h2 style="color: #181818;">Randevu Hatırlatması</h2>
                                <p>Merhaba <strong>{name}</strong>,</p>
                                <p>Yarın randevunuz bulunmaktadır:</p>
                                
                                <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
                                    <h3 style="color: #d9b36a; margin: 0 0 10px 0;">{service}</h3>
                                    <p style="font-size: 18px; margin: 5px 0;"><strong>{date} - {time}</strong></p>
                                    <p style="margin: 5px 0;">Uzman: {staff}</p>
                                </div>
                                
                                <p>Randevunuzdan 15 dakika önce gelmemizi rica ederiz.</p>
                                <p>Görüşmek üzere!</p>
                            </div>
                        </div>
                    `
                }
            },
            contact_form: {
                email: {
                    subject: "Yeni İletişim Formu Mesajı - Shining Beauty",
                    body: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <div style="background: #181818; padding: 20px; text-align: center;">
                                <h1 style="color: #d9b36a; margin: 0;">Yeni Mesaj</h1>
                            </div>
                            <div style="padding: 30px; background: #f9f9f9;">
                                <h2 style="color: #181818;">İletişim Formu Mesajı</h2>
                                
                                <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                                    <table style="width: 100%; border-collapse: collapse;">
                                        <tr><td style="padding: 8px 0; font-weight: bold;">Ad Soyad:</td><td>{name}</td></tr>
                                        <tr><td style="padding: 8px 0; font-weight: bold;">Telefon:</td><td>{phone}</td></tr>
                                        <tr><td style="padding: 8px 0; font-weight: bold;">E-posta:</td><td>{email}</td></tr>
                                        <tr><td style="padding: 8px 0; font-weight: bold;">Konu:</td><td>{subject}</td></tr>
                                        <tr><td style="padding: 8px 0; font-weight: bold;">Tarih:</td><td>{date}</td></tr>
                                    </table>
                                </div>
                                
                                <div style="background: white; padding: 20px; border-radius: 8px;">
                                    <h4 style="margin: 0 0 10px 0;">Mesaj:</h4>
                                    <p style="margin: 0; line-height: 1.6;">{message}</p>
                                </div>
                            </div>
                        </div>
                    `
                }
            }
        };
    }

    // Send appointment confirmation
    async sendAppointmentConfirmation(appointmentData) {
        try {
            const data = {
                name: appointmentData.customer.name,
                appointmentId: this.generateAppointmentId(),
                service: appointmentData.service.name,
                staff: appointmentData.staff.name,
                date: this.formatDate(appointmentData.date),
                time: appointmentData.time,
                duration: appointmentData.service.duration,
                price: appointmentData.service.price
            };

            // Send SMS
            if (appointmentData.customer.phone) {
                await this.sendSMS(appointmentData.customer.phone, 'appointment_confirmation', data);
            }

            // Send Email
            if (appointmentData.customer.email) {
                await this.sendEmail(appointmentData.customer.email, 'appointment_confirmation', data);
            }

            return { success: true, appointmentId: data.appointmentId };
        } catch (error) {
            console.error('Notification sending failed:', error);
            return { success: false, error: error.message };
        }
    }

    // Send appointment reminder
    async sendAppointmentReminder(appointmentData) {
        try {
            const data = {
                name: appointmentData.customer.name,
                appointmentId: appointmentData.id,
                service: appointmentData.service.name,
                staff: appointmentData.staff.name,
                date: this.formatDate(appointmentData.date),
                time: appointmentData.time
            };

            // Send SMS reminder
            if (appointmentData.customer.phone) {
                await this.sendSMS(appointmentData.customer.phone, 'appointment_reminder', data);
            }

            // Send Email reminder
            if (appointmentData.customer.email) {
                await this.sendEmail(appointmentData.customer.email, 'appointment_reminder', data);
            }

            return { success: true };
        } catch (error) {
            console.error('Reminder sending failed:', error);
            return { success: false, error: error.message };
        }
    }

    // Send contact form notification
    async sendContactFormNotification(formData) {
        try {
            const data = {
                name: formData.name,
                phone: formData.phone,
                email: formData.email || 'Belirtilmemiş',
                subject: formData.subject || 'Genel',
                message: formData.message,
                date: new Date().toLocaleString('tr-TR')
            };

            // Send to admin email
            await this.sendEmail('shinings.pw@ud.me', 'contact_form', data);

            return { success: true };
        } catch (error) {
            console.error('Contact form notification failed:', error);
            return { success: false, error: error.message };
        }
    }

    // SMS sending (simulation - would integrate with SMS provider)
    async sendSMS(phoneNumber, templateType, data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const template = this.templates[templateType].sms;
                    const message = this.replaceTemplateVars(template, data);
                    
                    console.log(`SMS sent to ${phoneNumber}:`, message);
                    
                    // In real implementation, integrate with SMS provider like:
                    // - Twilio
                    // - Nexmo/Vonage
                    // - Turkish SMS providers (Netgsm, İleti Merkezi, etc.)
                    
                    resolve({ success: true, message: 'SMS sent successfully' });
                } catch (error) {
                    reject(error);
                }
            }, 1000);
        });
    }

    // Email sending (simulation - would integrate with email service)
    async sendEmail(emailAddress, templateType, data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const template = this.templates[templateType].email;
                    const subject = this.replaceTemplateVars(template.subject, data);
                    const body = this.replaceTemplateVars(template.body, data);
                    
                    console.log(`Email sent to ${emailAddress}:`);
                    console.log('Subject:', subject);
                    console.log('Body:', body);
                    
                    // In real implementation, integrate with email service like:
                    // - SendGrid
                    // - Mailgun
                    // - AWS SES
                    // - SMTP server
                    
                    resolve({ success: true, message: 'Email sent successfully' });
                } catch (error) {
                    reject(error);
                }
            }, 1500);
        });
    }

    // Replace template variables
    replaceTemplateVars(template, data) {
        let result = template;
        Object.keys(data).forEach(key => {
            const regex = new RegExp(`{${key}}`, 'g');
            result = result.replace(regex, data[key]);
        });
        return result;
    }

    // Generate unique appointment ID
    generateAppointmentId() {
        return 'RV' + Date.now().toString().slice(-6);
    }

    // Format date for Turkish locale
    formatDate(dateString) {
        const date = new Date(dateString);
        const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
        const months = [
            'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
            'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
        ];
        
        return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    }

    // Schedule reminder (would use cron job or task scheduler in real app)
    scheduleReminder(appointmentData) {
        const appointmentDate = new Date(`${appointmentData.date}T${appointmentData.time}`);
        const reminderDate = new Date(appointmentDate.getTime() - 24 * 60 * 60 * 1000); // 24 hours before
        
        const now = new Date();
        const timeUntilReminder = reminderDate.getTime() - now.getTime();
        
        if (timeUntilReminder > 0) {
            setTimeout(() => {
                this.sendAppointmentReminder(appointmentData);
            }, timeUntilReminder);
            
            console.log(`Reminder scheduled for ${reminderDate.toLocaleString('tr-TR')}`);
        }
    }
}

// Initialize notification system
const notificationSystem = new NotificationSystem();

// Export for use in other files
window.notificationSystem = notificationSystem;
