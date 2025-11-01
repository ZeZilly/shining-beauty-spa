import { Link, useLocation } from 'react-router-dom'
import { Menu, Phone } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const Navbar = () => {
  const location = useLocation()

  const navLinks = [
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Hizmetler', path: '/hizmetler' },
    { name: 'Hakkımızda', path: '/hakkimizda' },
    { name: 'Galeri', path: '/galeri' },
    { name: 'Blog', path: '/blog' },
    { name: 'Kampanyalar', path: '/kampanyalar' },
    { name: 'İletişim', path: '/iletisim' },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-primary/95 backdrop-blur">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/images/logo-main.png"
            alt="Shining Beauty&Wellness Logo"
            className="h-12 w-auto object-contain"
          />
          <span className="hidden text-xl font-heading font-bold text-gold sm:inline-block">
            Shining Beauty&Wellness
          </span>
        </Link>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.path}>
                <NavigationMenuLink asChild>
                  <Link
                    to={link.path}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'px-4 py-2 text-sm font-medium transition-colors',
                      isActive(link.path)
                        ? 'bg-accent text-primary hover:bg-accent/90'
                        : 'bg-transparent text-beige hover:bg-accent hover:text-primary'
                    )}
                  >
                    {link.name}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="tel:+905050719501"
            className="flex items-center gap-2 text-accent transition-colors hover:text-gold"
          >
            <Phone className="h-4 w-4" />
            <span className="text-sm">+90 505 071 95 01</span>
          </a>
          <Button
            asChild
            size="sm"
            className="bg-green-500 text-white shadow hover:bg-green-600"
          >
            <a
              href="https://wa.me/905050719501"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="inline-flex items-center gap-2 text-gold hover:bg-accent/20 lg:hidden"
              size="icon"
              aria-label="Menüyü aç"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full border-l border-border/40 bg-primary text-beige sm:max-w-sm"
          >
            <SheetHeader className="text-left">
              <SheetTitle className="font-heading text-xl text-gold">
                Menü
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-2">
              {navLinks.map((link) => (
                <Button
                  key={link.path}
                  variant={isActive(link.path) ? 'default' : 'ghost'}
                  className={cn(
                    'w-full justify-start text-base',
                    isActive(link.path)
                      ? 'bg-accent text-primary hover:bg-accent/90'
                      : 'text-beige hover:text-primary'
                  )}
                  asChild
                >
                  <Link to={link.path}>{link.name}</Link>
                </Button>
              ))}
            </div>
            <div className="mt-8 space-y-3">
              <Button
                asChild
                className="w-full bg-green-500 text-white hover:bg-green-600"
              >
                <a
                  href="https://wa.me/905050719501"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp ile iletişim kur
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full border-accent text-accent hover:bg-accent/10"
              >
                <a href="tel:+905050719501">
                  <div className="flex items-center justify-center gap-2">
                    <Phone className="h-4 w-4" />
                    Telefon et
                  </div>
                </a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

export default Navbar
