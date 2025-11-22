import { JobForm } from "@/components/job-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function NewJobPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-10">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-slate-900">
          Post a new opportunity
        </h1>
        <p className="text-sm text-slate-500">
          Describe the role and get it in front of qualified talent.
        </p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow">
        <JobForm />
      </div>
    </div>
  );
}
