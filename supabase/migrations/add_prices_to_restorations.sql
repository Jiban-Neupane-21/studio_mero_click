ALTER TABLE public.restoration_images

ADD COLUMN IF NOT EXISTS discount_rate NUMERIC DEFAULT 0;
