import { NextResponse, type NextRequest } from 'next/server';
import { isSameOriginRequest, SESSION_COOKIE_NAME } from '@/lib/auth';

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  const response = NextResponse.redirect(new URL('/admin/login', request.url), 303);
  response.cookies.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  response.headers.set('Cache-Control', 'no-store');
  return response;
}
