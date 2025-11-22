import Link from "next/link";
import type { Job, Application } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import clsx from "clsx";

type Props = {
  job: Job & { applications: Application[] };
};

const typeMap: Record<Job["type"], string> = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  CONTRACT: "Contract",
  FREELANCE: "Freelance",
};

export function JobCard({ job }: Props) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-300 hover:shadow-md">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              {job.company}
            </p>
            <Link
              href={`/jobs/${job.id}`}
              className="text-lg font-semibold text-slate-900 hover:text-indigo-600"
            >
              {job.title}
            </Link>
          </div>
          <span
            className={clsx(
              "rounded-full px-3 py-1 text-xs font-medium",
              job.type === "FULL_TIME" && "bg-green-100 text-green-700",
              job.type === "PART_TIME" && "bg-blue-100 text-blue-700",
              job.type === "CONTRACT" && "bg-amber-100 text-amber-700",
              job.type === "FREELANCE" && "bg-purple-100 text-purple-700"
            )}
          >
            {typeMap[job.type]}
          </span>
        </div>
        <p className="text-sm text-slate-600">{job.location}</p>
        <p className="text-sm font-semibold text-slate-900">{job.salary}</p>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>
            Posted{" "}
            {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}
          </span>
          <span>{job.applications.length} applicants</span>
        </div>
      </div>
    </article>
  );
}
