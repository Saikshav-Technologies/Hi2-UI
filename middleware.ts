import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Since auth tokens are stored in localStorage (client-side only),
  // middleware cannot access them. The actual authentication check
  // happens in the protected layout component, which will redirect
  // non-authenticated users to /onboarding

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
