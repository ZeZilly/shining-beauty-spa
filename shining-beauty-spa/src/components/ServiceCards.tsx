import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Star, Clock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ServiceCardProps {
  category: string
  service: {
    name: string
    description: string
    price?: string
    duration?: string
  }
  index: number
}

const ServiceCard = ({ category, service, index }: ServiceCardProps) => {
  const categoryIcons = {
    'Masaj': '💆‍♀️',
    'Cilt Bakımı': '✨',
    'Güzellik': '💄',
    'Wellness': '🧘‍♀️',
    'Hydrafacial': '💎',
    'Kafa Masajı': '🧠'
  }

  const getGradient = (index: number) => {
    const gradients = [
      'from-accent/20 via-accent/10 to-gold/20',
      'from-gold/20 via-accent/10 to-gold/30',
      'from-accent/30 via-gold/20 to-accent/10',
      'from-gold/30 via-accent/20 to-gold/10'
    ]
    return gradients[index % gradients.length]
  }

  return (
    <Card
      className={`
        group h-full border-gold/20 bg-primary transition-all duration-700 
        hover:border-gold/60 hover:shadow-2xl hover:scale-105 
        bg-gradient-to-br ${getGradient(index)}
        hover:shadow-accent/25 hover:shadow-2xl
      `}
    >
      <Link to={`/hizmetler/${service.name.toLowerCase().replace(/\s+/g, '-')}`}>
        <CardHeader className="space-y-4 relative overflow-hidden">
          {/* Animated Background Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          {/* Floating Animation */}
          <div className="relative flex items-center justify-center">
            <div 
              className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/30 to-gold/30 text-4xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg backdrop-blur-sm"
            >
              {categoryIcons[category as keyof typeof categoryIcons] || '✨'}
            </div>
            
            {/* Sparkle Animation */}
            <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-accent opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-180" />
          </div>
          
          <CardTitle className="text-xl font-heading text-gold transition-colors duration-300 group-hover:text-accent relative z-10">
            {category}
          </CardTitle>
          
          <CardDescription className="text-beige/70 relative z-10 leading-relaxed">
            {service.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="relative z-10">
          {/* Progress Bar Animation */}
          <div className="h-2 bg-gradient-to-r from-accent/20 to-gold/20 rounded-full mb-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-accent via-gold to-accent rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out"
            ></div>
          </div>
          
          {/* Service Meta Info */}
          <div className="flex items-center justify-between text-sm text-beige/60 mb-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>60-90 dk</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-accent" />
              <span>4.9</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="pt-0 relative z-10">
          <Button 
            variant="link" 
            className="gap-2 px-0 text-accent hover:text-gold transition-all duration-300 group-hover:gap-3 group-hover:translate-x-1"
          >
            Detayları Gör
            <ArrowRight className="h-4 w-4 transition-transform duration-300" />
          </Button>
        </CardFooter>
      </Link>
    </Card>
  )
}

export default ServiceCard
