import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({ success: true });

    // Clear all auth cookies
    response.cookies.set("admin_session", "", {
        maxAge: 0,
        path: "/"
    });
    response.cookies.set("sb-access-token", "", {
        maxAge: 0,
        path: "/"
    });
    response.cookies.set("sb-refresh-token", "", {
        maxAge: 0,
        path: "/"
    });

    return response;
}

// Handle GET for beacon fallback (beacon sends POST but just in case)
export async function GET() {
    return NextResponse.json({ message: "Use POST method" }, { status: 405 });
}
