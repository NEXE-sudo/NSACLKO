import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Tables = {
  workshop_registrations: {
    id: string;
    created_at: string;
    first_name: string;
    last_name: string;
    email: string;
    institution: string;
    skills: string;
    motivation: string;
  };
};
