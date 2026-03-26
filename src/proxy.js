import { NextResponse } from "next/server";
import { decrypt } from "@/lib/session";

export async function proxy(request) {
    const session = request.cookies.get("session")?.value;

    // Define protected routes
    const protectedRoutes = ["/orders", "/checkout"];
    const isProtectedRoute = protectedRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
    );

    // If it's a protected route and there's no session, redirect to login
    if (isProtectedRoute && !session) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // If there's a session, verify it
    if (session) {
        try {
            const payload = await decrypt(session);
            // Optional: check session expiry or refresh context

            // If user is logged in and tries to access login/register, redirect to home
            if (["/login", "/register"].includes(request.nextUrl.pathname)) {
                return NextResponse.redirect(new URL("/", request.url));
            }
        } catch (e) {
            // Invalid session, clear it and redirect if protected
            const response = isProtectedRoute
                ? NextResponse.redirect(new URL("/login", request.url))
                : NextResponse.next();

            response.cookies.delete("session");
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|uploads).*)"],
};
