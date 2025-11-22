import Link from "next/link";
import { AuthCard } from "@/components/auth-card";
import { RegisterForm } from "@/components/register-form";

export default function RegisterPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-10">
      <AuthCard
        title="Create an account"
        subtitle="Join the platform to post and apply for jobs."
      >
        <RegisterForm />
        <p className="text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-indigo-600">
            Sign in
          </Link>
        </p>
      </AuthCard>
    </div>
  );
}
