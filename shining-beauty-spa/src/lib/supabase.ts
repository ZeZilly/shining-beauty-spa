import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jaeuwzrvvrfhxwgakykn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphZXV3enJ2dnJmaHh3Z2FreWtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1MTYwMTEsImV4cCI6MjA3NzA5MjAxMX0.atAeax7BGxHPDBoPKMVh80GuBZA7rB-Kadtwez_6zMM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Service {
  id: string
  category: string
  name: string
  duration: string
  description: string
  icon?: string
  image_url?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  image_url: string
  author: string
  published: boolean
  published_at: string
  created_at: string
  updated_at: string
}

export interface Appointment {
  id: string
  name: string
  email: string
  phone: string
  service_id?: string
  service_name: string
  appointment_date: string
  appointment_time: string
  message?: string
  status: string
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: string
  name: string
  comment: string
  rating: number
  is_approved: boolean
  created_at: string
}

export interface GalleryImage {
  id: string
  title: string
  category: string
  image_url: string
  is_featured: boolean
  created_at: string
}

// Instagram types
export interface InstagramPost {
  id: string
  caption: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url: string
  thumbnail_url?: string | null
  permalink: string
  timestamp: string
}

// Helper functions
export async function getServices(category?: string) {
  let query = supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (category) {
    query = query.eq('category', category)
  }

  const { data, error } = await query
  if (error) {
    console.error('Error fetching services:', error)
    return []
  }
  return data as Service[]
}

export async function getBlogPosts(limit?: number) {
  let query = supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false })

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query
  if (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
  return data as BlogPost[]
}

export async function getTestimonials(limit?: number) {
  let query = supabase
    .from('testimonials')
    .select('*')
    .eq('is_approved', true)
    .order('created_at', { ascending: false })

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query
  if (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
  return data as Testimonial[]
}

export async function getGalleryImages(category?: string) {
  let query = supabase
    .from('gallery_images')
    .select('*')
    .order('created_at', { ascending: false })

  if (category && category !== 'Tümü') {
    query = query.eq('category', category)
  }

  const { data, error } = await query
  if (error) {
    console.error('Error fetching gallery images:', error)
    return []
  }
  return data as GalleryImage[]
}

export async function createAppointment(appointmentData: {
  name: string
  email: string
  phone: string
  service_name: string
  appointment_date: string
  appointment_time: string
  message?: string
}) {
  const response = await fetch('https://jaeuwzrvvrfhxwgakykn.supabase.co/functions/v1/create-appointment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${supabaseAnonKey}`
    },
    body: JSON.stringify(appointmentData)
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error?.message || 'Randevu oluşturulurken hata oluştu')
  }

  return await response.json()
}

export async function getInstagramFeed(limit = 8): Promise<InstagramPost[]> {
  const endpoint = `${supabaseUrl}/functions/v1/instagram-feed?limit=${limit}`
  const res = await fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${supabaseAnonKey}`
    }
  })
  if (!res.ok) {
    console.error('Instagram feed error:', await res.text())
    return []
  }
  const json = await res.json()
  if (!json?.success) return []
  return json.items as InstagramPost[]
}
