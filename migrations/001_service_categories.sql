-- ==========================================
-- Service Categories Table + Seed Data
-- Run this in Supabase SQL Editor
-- ==========================================

CREATE TABLE IF NOT EXISTS public.service_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.service_categories FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert" ON public.service_categories FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON public.service_categories FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete" ON public.service_categories FOR DELETE TO authenticated USING (true);

INSERT INTO public.service_categories (name, slug, description, sort_order) VALUES
  ('Studio Photography', 'photography', 'Professional in-studio photoshoots with perfect lighting.', 1),
  ('Wedding Photography', 'wedding', 'Capturing the magic of your special day with elegance.', 2),
  ('Printing', 'printing', 'High-quality prints for your photos and documents.', 3),
  ('Photo Frame', 'frame', 'Beautifully crafted frames to display your memories.', 4),
  ('Canvas Prints', 'canvas', 'Turn your photos into stunning pieces of wall art.', 5),
  ('Maternity Photography', 'maternity', 'Celebrate the beauty of pregnancy with a special photoshoot.', 6),
  ('Graduation Photography', 'graduation', 'Commemorate your academic achievements with us.', 7),
  ('Photo Album', 'album', 'Custom-designed albums to tell your unique story.', 8),
  ('Studio Backdrop', 'studio-backdrop', 'A wide variety of backdrops for creative shoots.', 9)
ON CONFLICT (slug) DO NOTHING;
