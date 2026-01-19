import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';

// POST: Register a new Alumni
export async function POST(req) {
    try {
        const body = await req.json();
        console.log('Alumni registration attempt:', { email: body.email, name: body.name });

        // Check if email already exists (use maybeSingle to avoid error when no match)
        const { data: existing, error: checkError } = await supabaseServer
            .from('alumni')
            .select('id')
            .eq('email', body.email)
            .maybeSingle();

        if (checkError) {
            console.error('Email check error:', checkError);
            return NextResponse.json({ error: 'Database error: ' + checkError.message }, { status: 500 });
        }

        if (existing) {
            console.log('Email already exists:', body.email);
            return NextResponse.json({ error: "Email already registered" }, { status: 400 });
        }

        // Insert new alumni (is_approved defaults to false)
        const { data, error } = await supabaseServer
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

        console.log('Alumni registered successfully:', data.id);
        return NextResponse.json({ success: true, data }, { status: 201 });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// GET: Fetch Approved Alumni for Directory
export async function GET(req) {
    try {
        const { data, error } = await supabaseServer
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
