import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

if (typeof window !== 'undefined' && supabaseUrl.includes('placeholder')) {
    console.warn('⚠️ Supabase Client is using placeholder URL. Environment variables might be missing.');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
    },
    global: {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    },
    db: {
        schema: 'public'
    }
})
