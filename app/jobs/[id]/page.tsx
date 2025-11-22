import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { JobDetails } from "@/components/job-details";
import { auth } from "@/auth";
import { ApplicationForm } from "@/components/application-form";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function JobDetailPage({ params }: Props) {
  const { id } = await params;
  const job = await prisma.job.findUnique({
    where: { id },
    include: {
      postedBy: {
        select: { name: true, email: true },
      },
      applications: true,
    },
  });

  if (!job) {
    notFound();
  }

  const session = await auth();
  const isOwner = session?.user?.id === job.postedById;

  return (
    <div className="mx-auto grid max-w-5xl gap-6 px-4 py-10 lg:grid-cols-[2fr_1fr]">
      <JobDetails job={job} />
      <aside className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Apply now</h2>
          <p className="text-sm text-slate-500">
            {isOwner
              ? "You posted this job. Share the link to collect applications."
              : "Tell the hiring manager why you are a great fit."}
          </p>
        </div>
        {isOwner ? (
          <p className="rounded-lg bg-indigo-50 px-3 py-2 text-sm text-indigo-700">
            {job.applications.length} candidate
            {job.applications.length === 1 ? "" : "s"} have applied.
          </p>
        ) : session?.user ? (
          <ApplicationForm jobId={job.id} />
        ) : (
          <p className="text-sm text-slate-500">
            Please sign in to submit an application.
          </p>
        )}
      </aside>
    </div>
  );
}
