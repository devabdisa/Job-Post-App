import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { JobApplicants } from "@/components/job-applicants";
import { ApplicationList } from "@/components/application-list";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const [postedJobs, applications] = await Promise.all([
    prisma.job.findMany({
      where: { postedById: session.user.id },
      include: {
        applications: {
          include: {
            user: {
              select: { name: true, email: true },
            },
          },
        },
      },
      orderBy: { postedAt: "desc" },
    }),
    prisma.application.findMany({
      where: { userId: session.user.id },
      include: {
        job: {
          select: { title: true, company: true, location: true },
        },
      },
      orderBy: { appliedAt: "desc" },
    }),
  ]);

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Your dashboard</h1>
        <p className="text-sm text-slate-500">
          Track your postings and applications in one place.
        </p>
      </div>
      <section className="space-y-4">
        <header className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Posted jobs
            </h2>
            <p className="text-sm text-slate-500">
              Monitor applications across your openings.
            </p>
          </div>
        </header>
        <JobApplicants jobs={postedJobs} />
      </section>
      <section className="space-y-4">
        <header>
          <h2 className="text-xl font-semibold text-slate-900">
            Your applications
          </h2>
          <p className="text-sm text-slate-500">
            Stay up to date on every opportunity you pursued.
          </p>
        </header>
        <ApplicationList applications={applications} />
      </section>
    </div>
  );
}
