-- ═══════════════════════════════════════════════════════════════
-- Wedding Drishya — Database Schema
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard)
-- ═══════════════════════════════════════════════════════════════

-- 1. GALLERY IMAGES — stores all portfolio/website images
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  alt_text TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'portfolio',
  cloudinary_public_id TEXT NOT NULL,
  cloudinary_url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL DEFAULT '',
  width INT DEFAULT 0,
  height INT DEFAULT 0,
  sort_order INT DEFAULT 0,
  section TEXT DEFAULT 'gallery',  -- e.g. 'hero', 'gallery', 'about', 'blog'
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. SITE SETTINGS — key-value store for site configuration
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL DEFAULT '',
  description TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Insert default settings
INSERT INTO site_settings (key, value, description) VALUES
  ('site_name', 'Wedding Drishya', 'Site display name'),
  ('tagline', 'Fine Art Wedding Photography', 'Hero tagline'),
  ('hero_video_url', 'https://cdn.prod.website-files.com/65672ae1df05229c6a36dae7/659d43d995e8dd9e35a5ed4c_home-page-cover-transcode.mp4', 'Hero background video URL'),
  ('contact_email', 'hello@weddingdrishya.com', 'Contact email address'),
  ('phone', '', 'Contact phone number'),
  ('address', 'G-5, 3rd floor, HIG colony, Ravishankar Nagar, Indore 452010', 'Studio address'),
  ('instagram_url', 'https://www.instagram.com/weddingdrishya_by_anshul/', 'Instagram link'),
  ('facebook_url', 'https://www.facebook.com/weddingdrishya/', 'Facebook link'),
  ('youtube_url', 'https://www.youtube.com/channel/UCwJYCIPB9Io98VJNV9KFUjw', 'YouTube link')
ON CONFLICT (key) DO NOTHING;

-- 4. Enable Row-Level Security
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies — Public can READ, only authenticated users can WRITE
-- Gallery Images: public read
CREATE POLICY "gallery_images_public_read" ON gallery_images
  FOR SELECT USING (true);

-- Gallery Images: authenticated write
CREATE POLICY "gallery_images_auth_write" ON gallery_images
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Site Settings: public read
CREATE POLICY "site_settings_public_read" ON site_settings
  FOR SELECT USING (true);

-- Site Settings: authenticated write
CREATE POLICY "site_settings_auth_write" ON site_settings
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- 6. Updated-at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to both tables
CREATE TRIGGER set_updated_at_gallery
  BEFORE UPDATE ON gallery_images
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_settings
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
