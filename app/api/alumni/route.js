import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

// POST: Register a new Alumni
export async function POST(req) {
    try {
        const body = await req.json();

        // Check if email already exists
        const { data: existing } = await supabase
            .from('alumni')
            .select('id')
            .eq('email', body.email)
            .single();

        if (existing) {
            return NextResponse.json({ error: "Email already registered" }, { status: 400 });
        }

        // Insert new alumni (is_approved defaults to false)
        const { data, error } = await supabase
            .from('alumni')
            .insert([{
                name: body.name,
                email: body.email,
                batch: body.batch,
                current_role: body.currentRole,
                company: body.company,
                linkedin: body.linkedin || null,
                quote: body.quote || null,
                image: body.image || null,
            }])
            .select()
            .single();

        if (error) {
            console.error('Supabase insert error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data }, { status: 201 });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// GET: Fetch Approved Alumni for Directory
export async function GET(req) {
    try {
        const { data, error } = await supabase
            .from('alumni')
            .select('*')
            .eq('is_approved', true)
            .order('batch', { ascending: false });

        if (error) {
            console.error('Supabase fetch error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data || []);
    } catch (error) {
        console.error('Fetch error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
