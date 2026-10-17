import 'server-only';

import { createHmac, timingSafeEqual } from 'node:crypto';
import type { NextRequest } from 'next/server';

export const SESSION_COOKIE_NAME = 'admin_session';
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

interface SessionPayload {
  sub: string;
  exp: number;
}

interface AuthConfig {
  adminUsername: string;
  adminPassword: string;
  sessionSecret: string;
}

export class AuthConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthConfigurationError';
  }
}

export function isSameOriginRequest(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  if (!origin) {
    return false;
  }

  try {
    return new URL(origin).origin === request.nextUrl.origin;
  } catch (error) {
    if (error instanceof TypeError) {
      return false;
    }
    throw error;
  }
}

function getAuthConfig(): AuthConfig {
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.SESSION_SECRET;

  if (!adminUsername || !adminPassword || !sessionSecret) {
    throw new AuthConfigurationError(
      'Set ADMIN_USERNAME, ADMIN_PASSWORD, and SESSION_SECRET before using the admin demo.'
    );
  }

  if (
    adminUsername.length > 100 ||
    adminPassword.length < 12 ||
    adminPassword.length > 200 ||
    sessionSecret.length < 32
  ) {
    throw new AuthConfigurationError(
      'ADMIN_USERNAME must be at most 100 characters, ADMIN_PASSWORD 12–200 characters, and SESSION_SECRET at least 32 characters.'
    );
  }

  return { adminUsername, adminPassword, sessionSecret };
}

function sign(value: string, secret: string): string {
  return createHmac('sha256', secret).update(value).digest('base64url');
}

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function verifyAdminCredentials(username: string, password: string): boolean {
  const { adminUsername, adminPassword } = getAuthConfig();
  const usernameMatches = safeEqual(username, adminUsername);
  const passwordMatches = safeEqual(password, adminPassword);
  return usernameMatches && passwordMatches;
}

export function createAdminSession(username: string): string {
  const { sessionSecret } = getAuthConfig();
  const payload: SessionPayload = {
    sub: username,
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS,
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');

  return `${encodedPayload}.${sign(encodedPayload, sessionSecret)}`;
}

export function verifyAdminSession(token: string | undefined): SessionPayload | null {
  if (!token || token.length > 2048) {
    return null;
  }

  const { adminUsername, sessionSecret } = getAuthConfig();
  const separator = token.lastIndexOf('.');
  if (separator <= 0) {
    return null;
  }

  const encodedPayload = token.slice(0, separator);
  const providedSignature = token.slice(separator + 1);
  if (!safeEqual(providedSignature, sign(encodedPayload, sessionSecret))) {
    return null;
  }

  let payload: unknown;
  try {
    payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8'));
  } catch (error) {
    if (error instanceof SyntaxError) {
      return null;
    }
    throw error;
  }

  if (
    typeof payload !== 'object' ||
    payload === null ||
    !('sub' in payload) ||
    !('exp' in payload) ||
    payload.sub !== adminUsername ||
    typeof payload.exp !== 'number' ||
    !Number.isSafeInteger(payload.exp) ||
    payload.exp <= Math.floor(Date.now() / 1000)
  ) {
    return null;
  }

  return { sub: payload.sub, exp: payload.exp };
}
