import Link from "next/link";
import { auth } from "@/auth";
import { logoutUser } from "@/app/actions";
import { SubmitButton } from "./submit-button";

export async function SiteHeader() {
  const session = await auth();
  const isAuthenticated = Boolean(session?.user);

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold text-indigo-600">
          JobBoard
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium text-slate-700">
          <Link href="/" className="hover:text-indigo-600">
            Browse Jobs
          </Link>
          {isAuthenticated && (
            <>
              <Link href="/jobs/new" className="hover:text-indigo-600">
                Post a Job
              </Link>
              <Link href="/dashboard" className="hover:text-indigo-600">
                Dashboard
              </Link>
            </>
          )}
        </nav>
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <form action={logoutUser}>
              <SubmitButton pendingText="Signing out">Sign out</SubmitButton>
            </form>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:border-indigo-300 hover:text-indigo-600"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
