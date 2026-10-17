import { NextResponse, type NextRequest } from 'next/server';
import { AuthConfigurationError, SESSION_COOKIE_NAME, verifyAdminSession } from '@/lib/auth';

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next();
  }

  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionToken) {
    const response = NextResponse.redirect(new URL('/admin/login', request.url));
    response.headers.set('Cache-Control', 'no-store');
    return response;
  }

  try {
    if (!verifyAdminSession(sessionToken)) {
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.headers.set('Cache-Control', 'no-store');
      return response;
    }
  } catch (error) {
    if (error instanceof AuthConfigurationError) {
      const response = NextResponse.redirect(new URL('/admin/login?error=configuration', request.url));
      response.headers.set('Cache-Control', 'no-store');
      return response;
    }

    throw error;
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
