import InstagramFeed from '../components/InstagramFeed'

const AboutPage = () => {
  const team = [
    {
      name: 'Ayşe Demir',
      role: 'Kurucu & Spa Uzmanı',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400',
    },
    {
      name: 'Zeynep Yılmaz',
      role: 'Cilt Bakım Uzmanı',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400',
    },
    {
      name: 'Elif Kaya',
      role: 'Masaj Terapisti',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=400',
    },
  ]

  const values = [
    {
      icon: 'fa-shield-alt',
      title: 'Hijyen & Güvenlik',
      description: 'En yüksek hijyen standartlarında hizmet sunuyoruz. Tüm ekipmanlarımız sterilize edilir.',
    },
    {
      icon: 'fa-award',
      title: 'Profesyonellik',
      description: 'Sertifikalı ve deneyimli uzman kadromuzla kaliteli hizmet garantisi veriyoruz.',
    },
    {
      icon: 'fa-heart',
      title: 'Müşteri Memnuniyeti',
      description: 'Sizin mutluluğunuz bizim önceliğimiz. Her detayda mükemmeliyeti hedefliyoruz.',
    },
    {
      icon: 'fa-leaf',
      title: 'Doğal Ürünler',
      description: 'Cildinize ve sağlığınıza önem veriyoruz, doğal ve sertifikalı ürünler kullanıyoruz.',
    },
  ]

  return (
    <div className="bg-primary min-h-screen">
      {/* Hero */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=2070)',
          }}
        >
          <div className="absolute inset-0 bg-primary-dark/70"></div>
        </div>
        
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-gold mb-4">
            Hakkımızda
          </h1>
          <p className="text-xl text-beige-light">
            Shining Beauty ailesi ile tanışın
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-accent text-sm uppercase tracking-widest mb-2">Hikayemiz</p>
              <h2 className="text-4xl font-heading font-bold text-gold mb-6">
                Shining Beauty ile Tanışın
              </h2>
            </div>

            <div className="prose prose-lg prose-invert mx-auto">
              <p className="text-beige/80 text-lg leading-relaxed mb-6">
                Shining Beauty & Wellness, Adana Gazipaşa'da konumlanan, lüks ve modern yaşamı vurgulayan 
                bir güzellik, spa ve wellness merkezidir. 2019 yılında kurulan merkezimiz, müşterilerimize 
                huzur ve sağlıklı yaşam deneyimi sunma misyonuyla yola çıktı.
              </p>

              <p className="text-beige/80 text-lg leading-relaxed mb-6">
                Uzman ekibimiz ve kaliteli ürünlerimizle, güzellik ve sağlığınızı bir bütün olarak ele alıyor, 
                kişiye özel çözümler sunuyoruz. Modern ve lüks tesisimizde, kendinizi özel hissedeceğiniz 
                bir atmosfer yaratıyoruz.
              </p>

              <p className="text-beige/80 text-lg leading-relaxed">
                Her müşterimiz bizim için özeldir. Bu nedenle, her hizmetimizi kişisel ihtiyaçlarınıza göre 
                özelleştiriyor ve size en iyi deneyimi sunmak için çalışıyoruz.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center p-6 bg-primary-light rounded-xl border border-gold/20">
                <div className="text-4xl font-bold text-gold mb-2">5+</div>
                <div className="text-beige/70">Yıllık Deneyim</div>
              </div>
              <div className="text-center p-6 bg-primary-light rounded-xl border border-gold/20">
                <div className="text-4xl font-bold text-gold mb-2">1000+</div>
                <div className="text-beige/70">Mutlu Müşteri</div>
              </div>
              <div className="text-center p-6 bg-primary-light rounded-xl border border-gold/20">
                <div className="text-4xl font-bold text-gold mb-2">20+</div>
                <div className="text-beige/70">Özel Tedavi</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-primary-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-accent text-sm uppercase tracking-widest mb-2">Değerlerimiz</p>
            <h2 className="text-4xl font-heading font-bold text-gold mb-4">
              Bizi Farklı Kılan Nedir?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-primary p-8 rounded-2xl border border-gold/20 text-center"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className={`fas ${value.icon} text-3xl text-accent`}></i>
                </div>
                <h3 className="text-xl font-heading font-bold text-gold mb-3">
                  {value.title}
                </h3>
                <p className="text-beige/70">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-accent text-sm uppercase tracking-widest mb-2">Ekibimiz</p>
            <h2 className="text-4xl font-heading font-bold text-gold mb-4">
              Uzman Kadromuz
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div 
                key={index}
                className="text-center group"
              >
                <div className="relative mb-4 overflow-hidden rounded-2xl">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 to-transparent"></div>
                </div>
                <h3 className="text-xl font-heading font-bold text-gold mb-2">
                  {member.name}
                </h3>
                <p className="text-accent">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-20">
        <InstagramFeed 
          title="Sosyal Medyada Bizi Takip Edin"
          subtitle="Günlük bakım ipuçları, transformasyon hikayelerimiz ve özel kampanyalar için bizi takip edin"
          showButton={true}
          maxPosts={6}
        />
      </section>

      {/* Location */}
      <section className="py-20 bg-primary-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-accent text-sm uppercase tracking-widest mb-2">Konumumuz</p>
            <h2 className="text-4xl font-heading font-bold text-gold mb-4">
              Bizi Ziyaret Edin
            </h2>
            <p className="text-beige/80 max-w-2xl mx-auto">
              Gazipaşa Rezidans, Cemalpaşa - 60003 Sk Asmakat No:3, 01120 Seyhan/Adana'da konumlanan modern ve konforlu tesisimizde sizleri ağırlamaktan mutluluk duyarız
            </p>
          </div>

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

          <div className="w-full h-[600px] relative rounded-2xl overflow-hidden shadow-2xl">
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
        </div>
      </section>
    </div>
  )
}

export default AboutPage
