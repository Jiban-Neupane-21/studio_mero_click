import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables from .env file if it exists
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY must be provided.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function keepAlive() {
  try {
    console.log(`[${new Date().toISOString()}] Pinging Supabase to keep it alive...`);
    
    // We just need to make a simple request to the database.
    // Fetching 1 row from any table or just calling a non-existent table is enough to register API activity.
    // Here we query the 'services' table which exists in your project.
    const { data, error } = await supabase
      .from('services')
      .select('id')
      .limit(1);

    if (error) {
      console.error('Error pinging Supabase:', error.message);
    } else {
      console.log('Successfully pinged Supabase. Free tier project will stay active.');
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

keepAlive();
