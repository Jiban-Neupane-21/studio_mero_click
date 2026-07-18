-- ==========================================
-- Migration: Add Service Sub-Categories
-- Date: 2026-07-18
-- Description: Adds sub-category support for services
-- ==========================================

-- 1. Create service_sub_categories table
CREATE TABLE public.service_sub_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES public.service_categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Add sub_category_id column to services table
ALTER TABLE public.services
ADD COLUMN sub_category_id UUID REFERENCES public.service_sub_categories(id) ON DELETE SET NULL;

-- 3. Create index for faster lookups
CREATE INDEX idx_service_sub_categories_category_id ON public.service_sub_categories(category_id);
CREATE INDEX idx_services_sub_category_id ON public.services(sub_category_id);

-- 4. Enable RLS
ALTER TABLE public.service_sub_categories ENABLE ROW LEVEL SECURITY;

-- 5. RLS policies
CREATE POLICY "Allow public read access" ON public.service_sub_categories FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert" ON public.service_sub_categories FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON public.service_sub_categories FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete" ON public.service_sub_categories FOR DELETE TO authenticated USING (true);
