import Link from "next/link";
import { AuthCard } from "@/components/auth-card";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-10">
      <AuthCard
        title="Welcome back"
        subtitle="Sign in to post jobs and track your applications."
      >
        <LoginForm />
        <p className="text-center text-sm text-slate-500">
          No account yet?{" "}
          <Link href="/register" className="font-semibold text-indigo-600">
            Create one
          </Link>
        
        </p>
      </AuthCard>
    </div>
  );
}
