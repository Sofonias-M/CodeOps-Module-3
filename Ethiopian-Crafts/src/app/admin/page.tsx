import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { AuthConfigurationError, SESSION_COOKIE_NAME, verifyAdminSession } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Admin dashboard',
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  let session: ReturnType<typeof verifyAdminSession>;
  try {
    session = verifyAdminSession(cookieStore.get(SESSION_COOKIE_NAME)?.value);
  } catch (error) {
    if (error instanceof AuthConfigurationError) {
      redirect('/admin/login?error=configuration');
    }
    throw error;
  }

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-800">Protected demo</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-900">Admin dashboard</h1>
        <p className="mt-3 text-stone-600">
          Signed in as <span className="font-semibold text-stone-900">{session.sub}</span>. This sample dashboard
          does not expose customer or order data.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <form action="/api/auth/logout" method="post">
            <button
              type="submit"
              className="min-h-11 rounded-lg bg-amber-800 px-5 py-2.5 font-semibold text-white transition hover:bg-amber-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800"
            >
              Sign out
            </button>
          </form>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-stone-300 bg-white px-5 py-2.5 font-semibold text-stone-800 transition hover:bg-stone-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800"
          >
            View storefront
          </Link>
        </div>
      </section>
    </main>
  );
}
