import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY!
);

async function run() {
  const ddl = `
CREATE TABLE public.restoration_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    before_image_url TEXT NOT NULL,
    after_image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.restoration_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.restoration_images FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert" ON public.restoration_images FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON public.restoration_images FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete" ON public.restoration_images FOR DELETE TO authenticated USING (true);
  `;
  
  const { data, error } = await supabase.rpc('run_sql', { query: ddl });
  if (error) {
    console.error('Error running SQL:', error);
  } else {
    console.log('Success:', data);
  }
}

run();
