import { Link } from 'react-router-dom'
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const Footer = () => {
  const navLinks = [
    { label: 'Ana Sayfa', to: '/' },
    { label: 'Hakkımızda', to: '/hakkimizda' },
    { label: 'Hizmetler', to: '/hizmetler' },
    { label: 'Galeri', to: '/galeri' },
    { label: 'Blog', to: '/blog' },
    { label: 'İletişim', to: '/iletisim' },
  ]

  const socialLinks = [
    {
      href: 'https://www.instagram.com/shining.beauty.wellness',
      label: 'Instagram',
      icon: Instagram,
      className:
        'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 hover:from-purple-400 hover:via-pink-400 hover:to-orange-400',
    },
    {
      href: 'https://wa.me/905050719501',
      label: 'WhatsApp',
      icon: MessageCircle,
      className: 'bg-green-500 hover:bg-green-600',
    },
    {
      href: 'https://www.facebook.com/profile.php?id=61572925680179',
      label: 'Facebook',
      icon: Facebook,
      className: 'bg-blue-600 hover:bg-blue-700',
    },
  ]

  const contactItems = [
    {
      icon: MapPin,
      label:
        "Gazipaşa Rezidans, Cemalpaşa, 60003 Sk Asmakat No:3, 01120 Seyhan/Adana",
    },
    {
      icon: Phone,
      label: '+90 505 071 95 01',
      href: 'tel:+905050719501',
    },
    {
      icon: Mail,
      label: 'info@shining.icu',
      href: 'mailto:info@shining.icu',
    },
  ]

  const workingHours = [
    { label: 'Pazartesi - Cumartesi', value: '09:00 - 18:30' },
    { label: 'Pazar', value: '11:00 - 17:00' },
  ]

  return (
    <footer className="border-t border-gold/20 bg-primary-dark">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <img
              src="/images/logo-main.png"
              alt="Shining Beauty&Wellness"
              className="mb-4 h-16 w-auto"
            />
            <p className="text-sm text-beige/80">
              Gazipaşa, Adana'da lüks ve modern yaşamı buluşturan güzellik, spa ve wellness merkezi.
            </p>
            <div className="mt-4 flex gap-3">
              {socialLinks.map(({ href, label, icon: Icon, className }) => (
                <Button
                  key={label}
                  asChild
                  size="icon"
                  className={cn(
                    'h-10 w-10 rounded-full transition-transform hover:-translate-y-0.5 hover:shadow-lg',
                    className
                  )}
                >
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                    <Icon className="h-5 w-5 text-white" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-lg font-bold text-gold">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              {navLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    className="text-beige/80 transition-colors hover:text-gold"
                    to={item.to}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-lg font-bold text-gold">İletişim</h3>
            <ul className="space-y-3 text-sm text-beige/80">
              {contactItems.map(({ icon: Icon, label, href }) => (
                <li className="flex items-start gap-3" key={label}>
                  <Icon className="mt-0.5 h-4 w-4 text-gold" />
                  {href ? (
                    <a
                      className="transition-colors hover:text-gold"
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {label}
                    </a>
                  ) : (
                    <span>{label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-lg font-bold text-gold">Çalışma Saatleri</h3>
            <ul className="space-y-2 text-sm text-beige/80">
              {workingHours.map((item) => (
                <li className="flex justify-between" key={item.label}>
                  <span>{item.label}</span>
                  <span className="text-gold">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gold/20 pt-6 text-center text-sm text-beige/60">
          <p>&copy; 2025 Shining Beauty&Wellness. Tüm hakları saklıdır.</p>
          <div className="mt-2 flex items-center justify-center gap-3">
            {['Gizlilik Politikası', 'KVKK', 'Kullanım Şartları'].map((item) => (
              <span key={item} className="flex items-center gap-3 text-beige/60">
                <a className="transition-colors hover:text-gold" href="#">
                  {item}
                </a>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
