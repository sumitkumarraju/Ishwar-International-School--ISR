import { NextResponse } from "next/server";

export async function middleware(req) {
    // Check for admin session cookie
    const adminSession = req.cookies.get("admin_session");

    // No session = redirect to login
    if (!adminSession || adminSession.value !== 'authenticated') {
        return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // All /admin routes EXCEPT /admin/login
        "/admin/((?!login).*)"
    ]
};
