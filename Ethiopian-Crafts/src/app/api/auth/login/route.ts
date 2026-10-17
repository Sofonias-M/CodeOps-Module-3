import { NextResponse, type NextRequest } from 'next/server';
import {
  AuthConfigurationError,
  createAdminSession,
  isSameOriginRequest,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
  verifyAdminCredentials,
} from '@/lib/auth';

function redirectToLogin(request: NextRequest, error?: string) {
  const url = new URL('/admin/login', request.url);
  if (error) {
    url.searchParams.set('error', error);
  }
  const response = NextResponse.redirect(url, 303);
  response.headers.set('Cache-Control', 'no-store');
  return response;
}

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  const contentType = request.headers.get('content-type')?.split(';', 1)[0].trim().toLowerCase();
  if (contentType !== 'application/x-www-form-urlencoded' && contentType !== 'multipart/form-data') {
    return new NextResponse('Unsupported Media Type', { status: 415 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch (error) {
    if (error instanceof TypeError) {
      return new NextResponse('Invalid form data', { status: 400 });
    }
    throw error;
  }

  const username = formData.get('username');
  const password = formData.get('password');

  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    username.length > 100 ||
    password.length > 200
  ) {
    return redirectToLogin(request, 'invalid');
  }

  try {
    if (!verifyAdminCredentials(username, password)) {
      return redirectToLogin(request, 'invalid');
    }

    const response = NextResponse.redirect(new URL('/admin', request.url), 303);
    response.cookies.set(SESSION_COOKIE_NAME, createAdminSession(username), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_MAX_AGE_SECONDS,
    });
    response.headers.set('Cache-Control', 'no-store');
    return response;
  } catch (error) {
    if (error instanceof AuthConfigurationError) {
      return redirectToLogin(request, 'configuration');
    }
    throw error;
  }
}
