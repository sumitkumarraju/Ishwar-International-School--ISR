import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function POST(req) {
    const { email, password } = await req.json();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Create response
    let response = NextResponse.json({ success: false });

    const supabase = createServerClient(
        supabaseUrl,
        supabaseKey,
        {
            cookies: {
                getAll() {
                    return req.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        // Remove maxAge to make it a session cookie
                        const sessionOptions = { ...options };
                        delete sessionOptions.maxAge;
                        delete sessionOptions.expires;
                        response.cookies.set(name, value, sessionOptions);
                    });
                },
            },
        }
    );

    // Attempt login
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 401 });
    }

    if (data.session) {
        response = NextResponse.json({ success: true });

        // Set session cookies without maxAge (session cookie - dies on browser close)
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
            // NO maxAge or expires = session cookie
        };

        response.cookies.set('admin_session', 'authenticated', cookieOptions);
        response.cookies.set('sb-access-token', data.session.access_token, cookieOptions);
        response.cookies.set('sb-refresh-token', data.session.refresh_token, cookieOptions);
    }

    return response;
}
