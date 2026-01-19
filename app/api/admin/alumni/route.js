import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';

// GET: Fetch ALL Alumni (including unapproved) for admin
export async function GET(req) {
    try {
        const { data, error } = await supabaseServer
            .from('alumni')
            .select('*')
            .order('created_at', { ascending: false });

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

// POST: Admin create alumni (Auto Authorized)
export async function POST(req) {
    try {
        const body = await req.json();
        console.log('Admin creating alumni:', body);

        // Check for existing email first
        const { data: existing } = await supabaseServer
            .from('alumni')
            .select('id')
            .eq('email', body.email)
            .maybeSingle();

        if (existing) {
            return NextResponse.json({ error: "Email already registered. Please use a different email or edit the existing record." }, { status: 400 });
        }

        const { data, error } = await supabaseServer
            .from('alumni')
            .insert([{
                name: body.name,
                email: body.email, // Ensure email is unique in DB or handle error
                batch: body.batch,
                current_role: body.currentRole,
                company: body.company,
                linkedin: body.linkedin || null,
                quote: body.quote || null,
                image: body.image || null,
                is_approved: true // Auto approve
            }])
            .select()
            .single();

        if (error) {
            console.error('Supabase insert error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        console.error('Create error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PATCH: Update alumni approval status
export async function PATCH(req) {
    try {
        const { id, isApproved } = await req.json();

        const { data, error } = await supabaseServer
            .from('alumni')
            .update({ is_approved: isApproved })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Supabase update error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Update error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE: Delete an alumni record
export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        const { error } = await supabaseServer
            .from('alumni')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Supabase delete error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
