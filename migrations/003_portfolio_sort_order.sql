-- ==========================================
-- Add sort_order to portfolio_items table for DND
-- Run this in Supabase SQL Editor
-- ==========================================

ALTER TABLE public.portfolio_items ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- Set initial sort_order based on created_at
UPDATE public.portfolio_items SET sort_order = sub.row_num
FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at ASC) - 1 AS row_num
  FROM public.portfolio_items
) sub
WHERE public.portfolio_items.id = sub.id;
