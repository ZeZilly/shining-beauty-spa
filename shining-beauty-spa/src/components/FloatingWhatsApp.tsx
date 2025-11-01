import { useState, useEffect } from 'react'
import { MessageCircle } from 'lucide-react'

const FloatingWhatsApp = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    // Show after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true)
      // Show tooltip after button becomes visible
      setTimeout(() => setShowTooltip(true), 1000)
    }, 3000)

    // Hide tooltip after 5 seconds
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(false)
    }, 5000)

    return () => {
      clearTimeout(timer)
      clearTimeout(tooltipTimer)
    }
  }, [])

  if (!isVisible) return null

  const handleClick = () => {
    const message = encodeURIComponent(
      'Merhaba! Shining Beauty&Wellness hizmetleri hakkında bilgi almak istiyorum.'
    )
    window.open(`https://wa.me/905050719501?text=${message}`, '_blank')
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Enhanced Chat tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full right-0 mb-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-2xl shadow-2xl whitespace-nowrap text-sm animate-bounce max-w-xs">
          <div className="font-semibold text-center">Merhaba! 👋</div>
          <div className="text-xs text-green-100">Size nasıl yardımcı olabilirim?</div>
          <div className="absolute top-full right-6 border-l-8 border-l-transparent border-t-8 border-t-green-500"></div>
        </div>
      )}
      
      {/* Modern WhatsApp button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 
          hover:from-green-600 hover:to-green-700 text-white rounded-full 
          shadow-2xl hover:shadow-green-500/50 transition-all duration-500 
          flex items-center justify-center group hover:scale-110
          ${isHovered ? 'animate-pulse' : ''}
        `}
        aria-label="WhatsApp ile iletişim kur"
      >
        {/* Enhanced Pulse animation rings */}
        <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-40"></div>
        <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30 animation-delay-500"></div>
        <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20 animation-delay-1000"></div>
        
        {/* Modern MessageCircle icon */}
        <MessageCircle 
          className={`w-8 h-8 relative z-10 transition-transform duration-300 ${
            isHovered ? 'scale-110' : ''
          }`} 
        />
        
        {/* Enhanced notification dot */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center justify-center shadow-lg">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
        </div>

        {/* Text badge on hover */}
        <div className={`
          absolute -bottom-12 left-1/2 transform -translate-x-1/2 
          bg-white text-green-600 px-3 py-1 rounded-lg shadow-lg 
          text-xs font-semibold whitespace-nowrap transition-all duration-300
          ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
        `}>
          WhatsApp
        </div>
      </button>

      {/* Floating background glow effect */}
      <div className="absolute inset-0 rounded-full bg-green-400 blur-xl opacity-20 animate-pulse"></div>
    </div>
  )
}

export default FloatingWhatsApp
