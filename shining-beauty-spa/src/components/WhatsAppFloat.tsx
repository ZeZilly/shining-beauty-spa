const WhatsAppFloat = () => {
  return (
    <a
      href="https://wa.me/905050719501?text=Merhaba, randevu almak istiyorum."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300 group"
      aria-label="WhatsApp ile iletişime geçin"
    >
      <i className="fab fa-whatsapp text-2xl"></i>
      <span className="absolute right-16 bg-primary-dark text-beige px-4 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">
        Randevu Al
      </span>
    </a>
  )
}

export default WhatsAppFloat
