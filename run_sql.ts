import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = resolve(__dirname, '.env');
const envContent = readFileSync(envPath, 'utf-8');
const env: Record<string, string> = {};
envContent.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const [key, ...valueParts] = trimmed.split('=');
    if (key) env[key.trim()] = valueParts.join('=').trim();
  }
});

const supabase = createClient(
  env.VITE_SUPABASE_URL!,
  env.VITE_SUPABASE_PUBLISHABLE_KEY!
);

async function run() {
  console.log('Checking if service_categories table exists...');

  const { error: checkError } = await supabase
    .from('service_categories')
    .select('*')
    .limit(1);

  if (checkError) {
    console.error('Table does not exist. Please run migrations/001_service_categories.sql in Supabase SQL Editor first.');
    return;
  }

  console.log('Seeding service categories...');

  const categories = [
    { name: 'Studio Photography', slug: 'photography', description: 'Professional in-studio photoshoots with perfect lighting.', sort_order: 1 },
    { name: 'Wedding Photography', slug: 'wedding', description: 'Capturing the magic of your special day with elegance.', sort_order: 2 },
    { name: 'Printing', slug: 'printing', description: 'High-quality prints for your photos and documents.', sort_order: 3 },
    { name: 'Photo Frame', slug: 'frame', description: 'Beautifully crafted frames to display your memories.', sort_order: 4 },
    { name: 'Canvas Prints', slug: 'canvas', description: 'Turn your photos into stunning pieces of wall art.', sort_order: 5 },
    { name: 'Maternity Photography', slug: 'maternity', description: 'Celebrate the beauty of pregnancy with a special photoshoot.', sort_order: 6 },
    { name: 'Graduation Photography', slug: 'graduation', description: 'Commemorate your academic achievements with us.', sort_order: 7 },
    { name: 'Photo Album', slug: 'album', description: 'Custom-designed albums to tell your unique story.', sort_order: 8 },
    { name: 'Studio Backdrop', slug: 'studio-backdrop', description: 'A wide variety of backdrops for creative shoots.', sort_order: 9 },
  ];

  const { data: existing } = await supabase
    .from('service_categories')
    .select('slug');

  const existingSlugs = new Set(existing?.map(c => c.slug) || []);
  const newCategories = categories.filter(c => !existingSlugs.has(c.slug));

  if (newCategories.length === 0) {
    console.log('All categories already exist. Nothing to insert.');
    return;
  }

  const { data, error } = await supabase
    .from('service_categories')
    .insert(newCategories)
    .select();

  if (error) {
    console.error('Error inserting categories:', error);
    return;
  }

  console.log(`Successfully inserted ${data.length} service categories:`);
  data.forEach((cat: any) => {
    console.log(`  - ${cat.name} (${cat.slug})`);
  });
}

run();
