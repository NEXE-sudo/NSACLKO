// Example Supabase Auth Middleware for Next.js (Edge Middleware)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Example: Protect all /dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // You can add your Supabase auth logic here
    // For public forms, you usually don't need this
    // For protected routes, check cookies or headers for auth
    // If not authenticated, redirect or return 401
  }
  return NextResponse.next();
}

// See Next.js docs for advanced usage: https://nextjs.org/docs/app/building-your-application/routing/middleware
