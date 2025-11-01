import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import AboutPage from './pages/AboutPage'
import BlogPage from './pages/BlogPage'
import GalleryPage from './pages/GalleryPage'
import CampaignsPage from './pages/CampaignsPage'
import ContactPage from './pages/ContactPage'
import FloatingWhatsApp from './components/FloatingWhatsApp'

function App() {
  return (
    <>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hizmetler" element={<ServicesPage />} />
          <Route path="/hizmetler/:slug" element={<ServiceDetailPage />} />
          <Route path="/hakkimizda" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/galeri" element={<GalleryPage />} />
          <Route path="/kampanyalar" element={<CampaignsPage />} />
          <Route path="/iletisim" element={<ContactPage />} />
        </Routes>
      </MainLayout>
      <FloatingWhatsApp />
    </>
  )
}

export default App
