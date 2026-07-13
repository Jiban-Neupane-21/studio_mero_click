-- ==========================================
-- Supabase Schema for Studio Mero Click
-- ==========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. ENUMS
-- ==========================================
CREATE TYPE public.portfolio_category AS ENUM (
  'Wedding', 'Maternity', 'Cake Smash', 'Fashion', 'Portrait', 
  'Identity Photo', 'Commercial', 'Customize Gifts'
);

CREATE TYPE public.faq_category AS ENUM (
  'booking', 'preparation', 'resizer', 'pricing'
);

-- ==========================================
-- 2. TABLES
-- ==========================================

-- OfferAds Table (from src/types/index.ts)
CREATE TABLE public.offer_ads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    discount TEXT NOT NULL,
    description TEXT NOT NULL,
    terms TEXT,
    target_category TEXT NOT NULL,
    image TEXT NOT NULL,
    badge TEXT,
    valid_until TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- VideoItems Table (from src/types/index.ts)
CREATE TABLE public.video_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    youtube_id TEXT,
    facebook_link TEXT,
    tiktok_link TEXT,
    duration TEXT,
    upload_date TEXT,
    views TEXT,
    thumbnail TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TutorialVideos Table (from src/types/index.ts)
CREATE TABLE public.tutorial_videos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    youtube_id TEXT,
    facebook_link TEXT,
    tiktok_link TEXT,
    duration TEXT,
    upload_date TEXT,
    published_at TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- LearningArticles Table (from src/types/index.ts)
CREATE TABLE public.learning_articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    published_at TEXT NOT NULL,
    read_time TEXT NOT NULL,
    image TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PortfolioItems Table (from src/types/portfolio.type.ts)
CREATE TABLE public.portfolio_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    category public.portfolio_category NOT NULL,
    image_url TEXT NOT NULL,
    spec_label TEXT,
    author TEXT,
    description TEXT,
    secondary_images JSONB DEFAULT '[]'::jsonb, -- Array of strings
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services Table (from src/types/service.type.ts)
CREATE TABLE public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    about TEXT NOT NULL,
    description TEXT NOT NULL,
    old_price NUMERIC NOT NULL,
    new_price NUMERIC NOT NULL,
    discount_rate NUMERIC NOT NULL,
    thumbnail TEXT NOT NULL,
    image TEXT NOT NULL,
    is_featured BOOLEAN DEFAULT false,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service Images Table (Relational array for Service)
CREATE TABLE public.service_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    alt TEXT
);

-- Service Specifications Table (Relational array for Service)
CREATE TABLE public.service_specifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
    spec_key TEXT NOT NULL,
    spec_value TEXT NOT NULL
);

-- Service Features Table (Relational array for Service)
CREATE TABLE public.service_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL
);

-- Service FAQs Table (Relational array for Service)
CREATE TABLE public.service_faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    answer TEXT NOT NULL
);

-- Products Table (from src/types/featureProduct.type.ts)
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    about TEXT NOT NULL,
    description TEXT NOT NULL,
    old_price NUMERIC NOT NULL,
    new_price NUMERIC NOT NULL,
    discount_rate NUMERIC NOT NULL,
    thumbnail TEXT NOT NULL,
    is_featured BOOLEAN DEFAULT false,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product Images Table (Relational array for Product)
CREATE TABLE public.product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    alt TEXT
);

-- Product Specifications Table (Relational array for Product)
CREATE TABLE public.product_specifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    spec_key TEXT NOT NULL,
    spec_value TEXT NOT NULL
);

-- Product Features Table (Relational array for Product)
CREATE TABLE public.product_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL
);

-- Product FAQs Table (Relational array for Product)
CREATE TABLE public.product_faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    answer TEXT NOT NULL
);

-- OfferItems Table (from src/types/offer.type.ts)
CREATE TABLE public.offer_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    offer_percentage NUMERIC NOT NULL,
    image TEXT NOT NULL,
    claim_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SpecialityItems Table (from src/types/speciality.type.ts)
CREATE TABLE public.speciality_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    icon_url TEXT NOT NULL,
    alt_text TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- General FAQs Table (from src/types/faq.type.ts)
CREATE TABLE public.faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category public.faq_category NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SocialMediaItems Table (from src/types/socialmedial.type.ts)
CREATE TABLE public.social_media_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    color TEXT NOT NULL,
    icon_name TEXT NOT NULL, -- Storing the string identifier for the React element
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- NavItems Table (from src/types/nav.types.ts)
CREATE TABLE public.nav_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    path TEXT NOT NULL,
    icon_name TEXT NOT NULL, -- Storing the string identifier for the React element
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- 3. ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE public.offer_ads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutorial_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offer_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.speciality_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_media_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nav_items ENABLE ROW LEVEL SECURITY;

-- Create default read-only policies for public access
CREATE POLICY "Allow public read access" ON public.offer_ads FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.video_items FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.tutorial_videos FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.learning_articles FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.portfolio_items FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.services FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.service_images FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.service_specifications FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.service_features FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.service_faqs FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.product_images FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.product_specifications FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.product_features FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.product_faqs FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.offer_items FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.speciality_items FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.faqs FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.social_media_items FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.nav_items FOR SELECT USING (true);

-- Functions and Triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
