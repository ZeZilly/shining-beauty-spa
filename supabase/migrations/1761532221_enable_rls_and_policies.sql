-- Migration: enable_rls_and_policies
-- Created at: 1761532221

-- Enable RLS on all tables
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Services policies (public read, authenticated write)
CREATE POLICY "Anyone can view active services" ON services
  FOR SELECT USING (is_active = true);

CREATE POLICY "Allow anon and service role insert services" ON services
  FOR INSERT WITH CHECK (auth.role() IN ('anon', 'service_role', 'authenticated'));

CREATE POLICY "Allow anon and service role update services" ON services
  FOR UPDATE USING (auth.role() IN ('anon', 'service_role', 'authenticated'));

-- Blog posts policies (public read published, authenticated write)
CREATE POLICY "Anyone can view published posts" ON blog_posts
  FOR SELECT USING (published = true);

CREATE POLICY "Allow anon and service role insert posts" ON blog_posts
  FOR INSERT WITH CHECK (auth.role() IN ('anon', 'service_role', 'authenticated'));

CREATE POLICY "Allow anon and service role update posts" ON blog_posts
  FOR UPDATE USING (auth.role() IN ('anon', 'service_role', 'authenticated'));

-- Appointments policies (anyone can insert, only authenticated can view/update)
CREATE POLICY "Anyone can create appointments" ON appointments
  FOR INSERT WITH CHECK (auth.role() IN ('anon', 'service_role', 'authenticated'));

CREATE POLICY "Only authenticated can view appointments" ON appointments
  FOR SELECT USING (auth.role() IN ('service_role', 'authenticated'));

CREATE POLICY "Only authenticated can update appointments" ON appointments
  FOR UPDATE USING (auth.role() IN ('service_role', 'authenticated'));

-- Testimonials policies (public read approved, authenticated write)
CREATE POLICY "Anyone can view approved testimonials" ON testimonials
  FOR SELECT USING (is_approved = true);

CREATE POLICY "Allow anon and service role insert testimonials" ON testimonials
  FOR INSERT WITH CHECK (auth.role() IN ('anon', 'service_role', 'authenticated'));

CREATE POLICY "Allow anon and service role update testimonials" ON testimonials
  FOR UPDATE USING (auth.role() IN ('anon', 'service_role', 'authenticated'));

-- Gallery images policies (public read, authenticated write)
CREATE POLICY "Anyone can view gallery images" ON gallery_images
  FOR SELECT USING (true);

CREATE POLICY "Allow anon and service role insert gallery" ON gallery_images
  FOR INSERT WITH CHECK (auth.role() IN ('anon', 'service_role', 'authenticated'));

CREATE POLICY "Allow anon and service role update gallery" ON gallery_images
  FOR UPDATE USING (auth.role() IN ('anon', 'service_role', 'authenticated'));;