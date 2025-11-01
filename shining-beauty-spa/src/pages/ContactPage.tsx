import { useState, useEffect } from 'react'
import { createAppointment, getServices } from '../lib/supabase'
import InstagramFeed from '../components/InstagramFeed'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: '',
  })

  const [services, setServices] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await getServices()
        const serviceNames = data.map(s => s.name)
        setServices([...serviceNames, 'Diğer'])
      } catch (error) {
        console.error('Error loading services:', error)
        setServices(['İsveç Masajı', 'Aromaterapi Masajı', 'Sıcak Taş Masajı', 'Hydrafacial', 'Anti-Aging Bakımı', 'Klasik Manikür', 'Spa Pedikür', 'Hamam & Kese', 'Diğer'])
      }
    }
    loadServices()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Manual validation
    if (!formData.name.trim()) {
      setError('Lütfen adınızı ve soyadınızı giriniz.')
      return
    }
    if (!formData.email.trim()) {
      setError('Lütfen e-posta adresinizi giriniz.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Lütfen geçerli bir e-posta adresi giriniz.')
      return
    }
    if (!formData.phone.trim()) {
      setError('Lütfen telefon numaranızı giriniz.')
      return
    }
    if (!formData.service) {
      setError('Lütfen bir hizmet seçiniz.')
      return
    }
    if (!formData.date) {
      setError('Lütfen randevu tarihini seçiniz.')
      return
    }
    if (!formData.time) {
      setError('Lütfen randevu saatini seçiniz.')
      return
    }

    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      await createAppointment({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service_name: formData.service,
        appointment_date: formData.date,
        appointment_time: formData.time,
        message: formData.message || undefined,
      })

      setSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        time: '',
        message: '',
      })
    } catch (err) {
      console.error('Error creating appointment:', err)
      setError(err instanceof Error ? err.message : 'Randevu oluşturulurken hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="bg-primary min-h-screen">
      {/* Hero */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2074)',
          }}
        >
          <div className="absolute inset-0 bg-primary-dark/70"></div>
        </div>
        
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-gold mb-4">
            İletişim
          </h1>
          <p className="text-xl text-beige-light">
            Bize ulaşın, size özel hizmet sunalım
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <div className="mb-12">
                <p className="text-accent text-sm uppercase tracking-widest mb-2">Bize Ulaşın</p>
                <h2 className="text-4xl font-heading font-bold text-gold mb-6">
                  İletişim Bilgileri
                </h2>
                <p className="text-beige/80 mb-8">
                  Randevu almak veya hizmetlerimiz hakkında bilgi almak için bizimle iletişime geçebilirsiniz.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-primary-light rounded-xl border border-gold/20">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-map-marker-alt text-accent text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-gold font-semibold mb-2">Adres</h3>
                    <p className="text-beige/80">
                      Gazipaşa Rezidans, Cemalpaşa<br />
                      60003 Sk Asmakat No:3<br />
                      01120 Seyhan/Adana, Türkiye
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-primary-light rounded-xl border border-gold/20">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-phone text-accent text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-gold font-semibold mb-2">Telefon</h3>
                    <a href="tel:+905050719501" className="text-beige/80 hover:text-accent transition-colors">
                      +90 505 071 95 01
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-primary-light rounded-xl border border-gold/20">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-envelope text-accent text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-gold font-semibold mb-2">E-posta</h3>
                    <a href="mailto:info@shining.icu" className="text-beige/80 hover:text-accent transition-colors">
                      info@shining.icu
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-primary-light rounded-xl border border-gold/20">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-globe text-accent text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-gold font-semibold mb-2">Website</h3>
                    <a href="https://shining.icu" target="_blank" rel="noopener noreferrer" className="text-beige/80 hover:text-accent transition-colors">
                      shining.icu
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-primary-light rounded-xl border border-gold/20">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-clock text-accent text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-gold font-semibold mb-2">Çalışma Saatleri</h3>
                    <p className="text-beige/80">
                      Pazartesi - Cumartesi: 09:00 - 18:30<br />
                      Pazar: 11:00 - 17:00
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8">
                <h3 className="text-gold font-semibold mb-4">Sosyal Medya</h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/shining.beauty.wellness"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center text-white hover:scale-110 transition-transform"
                    title="Instagram'da Bizi Takip Edin"
                  >
                    <i className="fab fa-instagram text-xl"></i>
                  </a>
                  <a
                    href="https://wa.me/905050719501"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white hover:scale-110 transition-transform"
                    title="WhatsApp ile İletişime Geçin"
                  >
                    <i className="fab fa-whatsapp text-xl"></i>
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61572925680179"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white hover:scale-110 transition-transform"
                    title="Facebook'ta Bizi Takip Edin"
                  >
                    <i className="fab fa-facebook-f text-xl"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Appointment Form */}
            <div>
              <div className="bg-primary-light p-8 rounded-2xl border border-gold/20">
                <h3 className="text-2xl font-heading font-bold text-gold mb-6">
                  Randevu Formu
                </h3>
                
                {success && (
                  <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <i className="fas fa-check-circle text-green-500 text-2xl"></i>
                      <p className="text-green-500">
                        Randevu talebiniz başarıyla alınmıştır. En kısa sürede size dönüş yapacağız.
                      </p>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <i className="fas fa-exclamation-triangle text-red-500 text-2xl"></i>
                      <p className="text-red-500">{error}</p>
                    </div>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-beige mb-2 font-medium">
                      Ad Soyad <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      className="w-full px-4 py-3 bg-primary border border-gold/20 rounded-lg text-beige focus:outline-none focus:border-gold transition-colors disabled:opacity-50 invalid:border-red-500"
                      placeholder="Adınız ve soyadınız"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-beige mb-2 font-medium">
                      E-posta <span className="text-accent">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      className="w-full px-4 py-3 bg-primary border border-gold/20 rounded-lg text-beige focus:outline-none focus:border-gold transition-colors disabled:opacity-50 invalid:border-red-500"
                      placeholder="ornek@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-beige mb-2 font-medium">
                      Telefon <span className="text-accent">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      pattern="[0-9]{10,11}"
                      disabled={loading}
                      className="w-full px-4 py-3 bg-primary border border-gold/20 rounded-lg text-beige focus:outline-none focus:border-gold transition-colors disabled:opacity-50 invalid:border-red-500"
                      placeholder="05XX XXX XX XX"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-beige mb-2 font-medium">
                      Hizmet Seçimi <span className="text-accent">*</span>
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      className="w-full px-4 py-3 bg-primary border border-gold/20 rounded-lg text-beige focus:outline-none focus:border-gold transition-colors disabled:opacity-50 invalid:border-red-500"
                    >
                      <option value="">Hizmet seçiniz</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="date" className="block text-beige mb-2 font-medium">
                        Tarih <span className="text-accent">*</span>
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 bg-primary border border-gold/20 rounded-lg text-beige focus:outline-none focus:border-gold transition-colors disabled:opacity-50 invalid:border-red-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="time" className="block text-beige mb-2 font-medium">
                        Saat <span className="text-accent">*</span>
                      </label>
                      <input
                        type="time"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className="w-full px-4 py-3 bg-primary border border-gold/20 rounded-lg text-beige focus:outline-none focus:border-gold transition-colors disabled:opacity-50 invalid:border-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-beige mb-2 font-medium">
                      Mesajınız
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      disabled={loading}
                      className="w-full px-4 py-3 bg-primary border border-gold/20 rounded-lg text-beige focus:outline-none focus:border-gold transition-colors resize-none disabled:opacity-50"
                      placeholder="Ek bilgi veya özel istekleriniz..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-4 bg-accent text-primary font-bold rounded-lg hover:bg-gold transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        Gönderiliyor...
                      </>
                    ) : (
                      'Randevu Talebi Gönder'
                    )}
                  </button>

                  <p className="text-beige/60 text-sm text-center">
                    <i className="fas fa-info-circle mr-1"></i>
                    Talebiniz alındıktan sonra en kısa sürede size dönüş yapacağız.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map - Full Width Interactive Google Maps */}
      <section className="pb-0">
        <div className="container mx-auto px-4 mb-12">
          <div className="text-center mb-8">
            <p className="text-accent text-sm uppercase tracking-widest mb-2">Konumumuz</p>
            <h2 className="text-4xl font-heading font-bold text-gold mb-4">
              Bizi Ziyaret Edin
            </h2>
            <p className="text-beige/80 mb-4">
              Gazipaşa Rezidans, Cemalpaşa - 60003 Sk Asmakat No:3, 01120 Seyhan/Adana
            </p>
            <a
              href="https://maps.google.com/?cid=11730659012318103488"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-gold transition-colors"
            >
              <i className="fas fa-map-marked-alt"></i>
              Google Maps'te Görüntüle
            </a>
          </div>
        </div>
        
        <div className="w-full h-[600px] relative">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3194.2976648662754!2d35.32371647608033!3d36.99983832231803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15288fe1189465c1%3A0xa28b25b106cdb9c0!2sShining%20Beauty%20Wellness!5e0!3m2!1str!2str!4v1730293088000!5m2!1str!2str" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Shining Beauty & Wellness - Gazipaşa Rezidans, Adana"
            className="w-full h-full"
          ></iframe>
          
          {/* Overlay Info Card */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-primary-light/95 backdrop-blur-sm p-6 rounded-xl border border-gold/30 shadow-2xl max-w-md mx-4">
            <h3 className="text-gold font-heading font-bold text-xl mb-2">
              Shining Beauty & Wellness
            </h3>
            <p className="text-beige/80 text-sm mb-4">
              <i className="fas fa-map-marker-alt text-accent mr-2"></i>
              Gazipaşa Rezidans, Cemalpaşa, 60003 Sk Asmakat No:3
            </p>
            <div className="flex gap-3">
              <a
                href="https://maps.google.com/?cid=11730659012318103488"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2 bg-accent text-primary text-center rounded-lg hover:bg-gold transition-colors text-sm font-semibold"
              >
                <i className="fas fa-directions mr-2"></i>
                Yol Tarifi
              </a>
              <a
                href="tel:+905050719501"
                className="flex-1 px-4 py-2 bg-green-500 text-white text-center rounded-lg hover:bg-green-600 transition-colors text-sm font-semibold"
              >
                <i className="fas fa-phone mr-2"></i>
                Ara
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section className="py-20 bg-primary-light">
        <InstagramFeed 
          title="Sosyal Medyada Bizi Takip Edin"
          subtitle="En son paylaşımlarımız, özel kampanyalar ve güzellik ipuçları için Instagram'da bizi takip edin"
          showButton={true}
          maxPosts={8}
        />
      </section>
    </div>
  )
}

export default ContactPage
