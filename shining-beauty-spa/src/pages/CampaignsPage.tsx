const CampaignsPage = () => {
  const campaigns = [
    {
      title: 'VIP Gelin & Nedime Paketi',
      description: 'Düğün, yılbaşı ve özel günler için unutulmaz güzellik deneyimi',
      discount: '%35',
      validUntil: '31 Aralık 2025',
      features: [
        'Gelin Özel Cilt Bakımı (3 Seans)',
        'Profesyonel Manikür & Pedikür',
        'Masaj ve Spa Terapisi',
        'Nedimeler için %20 İndirim',
        'Özel Gün Danışmanlığı',
      ],
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800',
    },
    {
      title: 'Yeni Yıl Özel Paketi',
      description: 'Tüm cilt bakımı hizmetlerinde yılbaşına özel indirim',
      discount: '%30',
      validUntil: '31 Ocak 2025',
      features: [
        'Hydrafacial Cilt Bakımı',
        'Anti-Aging Serum Uygulaması',
        'LED Işık Terapisi',
        'Göz Çevresi Bakımı',
      ],
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800',
    },
    {
      title: 'Spa & Masaj Paketi',
      description: 'Kendinize değer vermenin tam zamanı',
      discount: '%25',
      validUntil: '15 Şubat 2025',
      features: [
        'İsveç Masajı (60 dk)',
        'Aromaterapi Seansı',
        'Hamam & Kese',
        'Sauna Kullanımı',
      ],
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800',
    },
    {
      title: 'VIP Wellness Programı',
      description: 'Kapsamlı wellness deneyimi',
      discount: '%40',
      validUntil: '28 Şubat 2025',
      features: [
        '4 Seans Masaj (İstediğiniz Tür)',
        '2 Seans Cilt Bakımı',
        'Manikür & Pedikür',
        'Detoks Programı',
        'Ücretsiz Wellness Danışmanlığı',
      ],
      image: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?q=80&w=800',
    },
  ]

  const vipPackages = [
    {
      name: 'Silver Paket',
      price: 'Özel Fiyat',
      duration: '3 Ay',
      features: [
        '2 Masaj Seansı/Ay',
        '1 Cilt Bakımı/Ay',
        'Hamam Kullanımı',
        '%10 Ek Hizmet İndirimi',
      ],
    },
    {
      name: 'Gold Paket',
      price: 'Özel Fiyat',
      duration: '6 Ay',
      features: [
        '4 Masaj Seansı/Ay',
        '2 Cilt Bakımı/Ay',
        'Manikür & Pedikür/Ay',
        'Hamam & Sauna Kullanımı',
        '%15 Ek Hizmet İndirimi',
        'Öncelikli Randevu Hakkı',
      ],
      popular: true,
    },
    {
      name: 'Platinum Paket',
      price: 'Özel Fiyat',
      duration: '12 Ay',
      features: [
        'Sınırsız Masaj',
        'Sınırsız Cilt Bakımı',
        'Manikür & Pedikür/Ay',
        'Tüm Spa Hizmetleri',
        '%20 Ek Hizmet İndirimi',
        'VIP Öncelikli Randevu',
        'Kişisel Wellness Koçu',
      ],
    },
  ]

  return (
    <div className="bg-primary min-h-screen">
      {/* Hero */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2070)',
          }}
        >
          <div className="absolute inset-0 bg-primary-dark/70"></div>
        </div>
        
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-gold mb-4">
            Kampanyalar
          </h1>
          <p className="text-xl text-beige-light">
            Özel indirimler ve avantajlı paketler
          </p>
        </div>
      </section>

      {/* Active Campaigns */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-accent text-sm uppercase tracking-widest mb-2">Aktif Kampanyalar</p>
            <h2 className="text-4xl font-heading font-bold text-gold mb-4">
              Şimdi Fırsat Zamanı
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {campaigns.map((campaign, index) => (
              <div 
                key={index}
                className="bg-primary-light rounded-2xl overflow-hidden border border-gold/20 hover:border-gold/60 hover:shadow-2xl transition-all"
              >
                <div className="relative">
                  <img 
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-accent text-primary px-6 py-3 rounded-full font-bold text-2xl">
                    {campaign.discount}
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-heading font-bold text-gold mb-2">
                    {campaign.title}
                  </h3>
                  <p className="text-beige/70 mb-4">
                    {campaign.description}
                  </p>
                  
                  <div className="mb-6">
                    <div className="flex items-center gap-2 text-accent mb-4">
                      <i className="fas fa-calendar-alt"></i>
                      <span className="text-sm">Geçerlilik: {campaign.validUntil}</span>
                    </div>
                    
                    <ul className="space-y-2">
                      {campaign.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-beige/80">
                          <i className="fas fa-check text-accent mt-1"></i>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <a
                    href="/iletisim"
                    className="block text-center px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-gold transition-colors"
                  >
                    Hemen Randevu Al
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIP Packages */}
      <section className="py-20 bg-primary-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-accent text-sm uppercase tracking-widest mb-2">VIP Üyelikler</p>
            <h2 className="text-4xl font-heading font-bold text-gold mb-4">
              Özel Paketlerimiz
            </h2>
            <p className="text-beige/80 max-w-2xl mx-auto">
              Düzenli bakım alışkanlığı kazanın, avantajlı paketlerimizle tasarruf edin
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {vipPackages.map((pkg, index) => (
              <div 
                key={index}
                className={`bg-primary rounded-2xl p-8 border-2 ${
                  pkg.popular 
                    ? 'border-accent shadow-2xl scale-105' 
                    : 'border-gold/20'
                } relative`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-accent text-primary px-4 py-1 rounded-full text-sm font-bold">
                    En Popüler
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-heading font-bold text-gold mb-2">
                    {pkg.name}
                  </h3>
                  <div className="text-3xl font-bold text-accent mb-1">
                    {pkg.price}
                  </div>
                  <div className="text-beige/60 text-sm">
                    {pkg.duration}
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-beige/80">
                      <i className="fas fa-check-circle text-accent mt-1"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <a
                  href="/iletisim"
                  className={`block text-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                    pkg.popular
                      ? 'bg-accent text-primary hover:bg-gold'
                      : 'border-2 border-accent text-accent hover:bg-accent hover:text-primary'
                  }`}
                >
                  Bilgi Al
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-2xl p-12 text-center border border-green-500/20">
            <i className="fab fa-whatsapp text-6xl text-green-500 mb-6"></i>
            <h2 className="text-3xl font-heading font-bold text-gold mb-4">
              Özel Fiyatlar İçin Bize Ulaşın
            </h2>
            <p className="text-beige/80 mb-8 max-w-2xl mx-auto">
              WhatsApp üzerinden bizimle iletişime geçin, size özel paket ve fiyat teklifi alalım
            </p>
            <a
              href="https://wa.me/905050719501?text=Merhaba, kampanyalar hakkında bilgi almak istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors shadow-lg"
            >
              <i className="fab fa-whatsapp text-2xl"></i>
              WhatsApp'tan İletişime Geç
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CampaignsPage
