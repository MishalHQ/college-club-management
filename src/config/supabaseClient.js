import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Check if environment variables are missing
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⚠️ Missing Supabase environment variables!');
  console.error('Please create a .env file with:');
  console.error('REACT_APP_SUPABASE_URL=your_supabase_url');
  console.error('REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key');
}

// Create Supabase client (or dummy client if not configured)
export const supabase = (!supabaseUrl || !supabaseAnonKey) 
  ? {
      // Dummy client to prevent app crash
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured. Please add credentials to .env file.' } }),
        signUp: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured. Please add credentials to .env file.' } }),
        signOut: () => Promise.resolve({ error: null })
      },
      from: () => ({
        select: () => Promise.resolve({ data: [], error: null, count: 0 }),
        insert: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured. Please add credentials to .env file.' } }),
        delete: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured. Please add credentials to .env file.' } }),
        update: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured. Please add credentials to .env file.' } }),
        eq: function() { return this; },
        order: function() { return this; }
      })
    }
  : createClient(supabaseUrl, supabaseAnonKey);