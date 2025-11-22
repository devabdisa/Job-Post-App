import type { Job, User, Application } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";

type JobWithRelations = Job & {
  postedBy: Pick<User, "name" | "email">;
  applications: Application[];
};

const typeLabels: Record<Job["type"], string> = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  CONTRACT: "Contract",
  FREELANCE: "Freelance",
};

export function JobDetails({ job }: { job: JobWithRelations }) {
  return (
    <section className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-wide text-slate-500">
          {job.company}
        </p>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-slate-900">{job.title}</h1>
          <div className="flex flex-wrap gap-3 text-sm text-slate-600">
            <span className="rounded-full bg-slate-100 px-3 py-1">
              {job.location}
            </span>
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-indigo-700">
              {typeLabels[job.type]}
            </span>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
              {job.salary}
            </span>
          </div>
        </div>
      </header>
      <div className="space-y-3 text-sm leading-6 text-slate-700">
        {job.description.split("\n").map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>
      <footer className="flex flex-wrap items-center justify-between text-sm text-slate-500">
        <span>
          Posted{" "}
          {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}
        </span>
        <span>
          Posted by {job.postedBy.name ?? job.postedBy.email ?? "Anonymous"}
        </span>
      </footer>
    </section>
  );
}
