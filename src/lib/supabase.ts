import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://nojxjcfsulhznvfctegz.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vanhqY2ZzdWxoem52ZmN0ZWd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NzE2MzQsImV4cCI6MjA5MDQ0NzYzNH0.J1raO7eyao0MjG55J6M7BlGSVM0RvhRQCK-0Y-zKZQY';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables! Check your .env.local file.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: {
    schema: 'public',
  },
});
