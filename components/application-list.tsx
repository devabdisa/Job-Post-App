import type { Application, Job, User } from "@prisma/client";
import clsx from "clsx";

type ApplicationWithRelations = Application & {
  job: Pick<Job, "title" | "company" | "location">;
};

type Props = {
  applications: ApplicationWithRelations[];
};

const statusStyles: Record<Application["status"], string> = {
  PENDING: "bg-slate-100 text-slate-700",
  REVIEWING: "bg-amber-100 text-amber-700",
  ACCEPTED: "bg-emerald-100 text-emerald-700",
  REJECTED: "bg-rose-100 text-rose-700",
};

export function ApplicationList({ applications }: Props) {
  if (applications.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
        You have not applied to any jobs yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <article
          key={application.id}
          className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
            <div>
              <p className="font-semibold text-slate-900">
                {application.job.title}
              </p>
              <p className="text-slate-500">
                {application.job.company} • {application.job.location}
              </p>
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
          {application.note && (
            <p className="mt-3 text-sm text-slate-600">{application.note}</p>
          )}
        </article>
      ))}
    </div>
  );
}
