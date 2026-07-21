-- ==========================================
-- Add sort_order to products table for DND
-- Run this in Supabase SQL Editor
-- ==========================================

ALTER TABLE public.products ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- Set initial sort_order based on created_at
UPDATE public.products SET sort_order = sub.row_num
FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at ASC) - 1 AS row_num
  FROM public.products
) sub
WHERE public.products.id = sub.id;
