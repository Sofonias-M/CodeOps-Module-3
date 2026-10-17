import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Admin sign in',
};

interface AdminLoginPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const { error } = await searchParams;
  const errorMessage =
    error === 'invalid'
      ? 'The username or password was not recognized.'
      : error === 'configuration'
        ? 'Admin sign-in is not configured. Set the required server environment variables.'
        : undefined;

  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 items-center px-4 py-12 sm:px-6">
      <section className="w-full rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-800">Store management</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-900">Admin sign in</h1>
        <p className="mt-3 text-stone-600">
          This protected route demonstrates server-validated sessions for the storefront.
        </p>

        {errorMessage && (
          <p role="alert" className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-900">
            {errorMessage}
          </p>
        )}

        <form action="/api/auth/login" method="post" className="mt-6 space-y-5">
          <div>
            <label htmlFor="username" className="mb-1.5 block text-sm font-semibold text-stone-800">
              Username
            </label>
            <input
              id="username"
              name="username"
              autoComplete="username"
              required
              maxLength={100}
              className="min-h-11 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-stone-800">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              maxLength={200}
              className="min-h-11 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800"
            />
          </div>
          <button
            type="submit"
            className="min-h-12 w-full rounded-lg bg-amber-800 px-5 py-3 font-semibold text-white transition hover:bg-amber-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800"
          >
            Sign in
          </button>
        </form>
        <Link
          href="/"
          className="mt-5 inline-flex rounded-sm text-sm font-semibold text-amber-900 underline underline-offset-2 hover:text-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800"
        >
          Return to the storefront
        </Link>
      </section>
    </main>
  );
}
