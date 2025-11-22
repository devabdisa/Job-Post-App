import type { Application, Job, User } from "@prisma/client";
import clsx from "clsx";
import Link from "next/link";

type JobWithApplicants = Job & {
  applications: (Application & {
    user: Pick<User, "name" | "email">;
  })[];
};

const statusStyles: Record<Application["status"], string> = {
  PENDING: "bg-slate-100 text-slate-700",
  REVIEWING: "bg-amber-100 text-amber-700",
  ACCEPTED: "bg-emerald-100 text-emerald-700",
  REJECTED: "bg-rose-100 text-rose-700",
};

export function JobApplicants({ jobs }: { jobs: JobWithApplicants[] }) {
  if (jobs.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
        You have not posted any jobs yet.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {jobs.map((job) => (
        <article
          key={job.id}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <header className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                {job.title}
              </h3>
              <p className="text-sm text-slate-500">
                {job.company} • {job.location}
              </p>
            </div>
            <Link
              href={`/jobs/${job.id}`}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              View job
            </Link>
          </header>
          <div className="mt-4 space-y-3">
            {job.applications.length === 0 ? (
              <p className="text-sm text-slate-500">
                No applications yet. Share the job to reach more candidates.
              </p>
            ) : (
              job.applications.map((application) => (
                <div
                  key={application.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {application.user.name ?? application.user.email}
                    </p>
                    {application.note && (
                      <p className="text-xs text-slate-600">
                        “{application.note}”
                      </p>
                    )}
                  </div>
                  <span
                    className={clsx(
                      "rounded-full px-3 py-1 text-xs font-semibold",
                      statusStyles[application.status]
                    )}
                  >
                    {application.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
