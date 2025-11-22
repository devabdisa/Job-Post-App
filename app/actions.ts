"use server";

import { auth, signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
  applicationSchema,
  jobSchema,
  loginSchema,
  registerSchema,
} from "@/lib/validators";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

type ActionResult = {
  success?: string;
  error?: string;
};

const toObject = (formData: FormData) =>
  Object.fromEntries(formData.entries()) as Record<string, string>;

export async function registerUser(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const submission = toObject(formData);
  const parsed = registerSchema.safeParse(submission);
  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message ?? "Invalid data." };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });
  if (existingUser) {
    return { error: "An account with that email already exists." };
  }

  const hashedPassword = await bcrypt.hash(parsed.data.password, 10);
  await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      password: hashedPassword,
    },
  });

  await signIn("credentials", {
    email: parsed.data.email,
    password: parsed.data.password,
    redirectTo: "/dashboard",
  });

  return { success: "Account created! Redirecting..." };
}

export async function loginUser(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const submission = toObject(formData);
  const parsed = loginSchema.safeParse(submission);
  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message ?? "Invalid data." };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    return { error: "Invalid email or password." };
  }

  return { success: "Welcome back! Redirecting..." };
}

export async function logoutUser() {
  await signOut({ redirectTo: "/" });
}

export async function createJob(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "You must be signed in to post a job." };
  }

  const submission = toObject(formData);
  const parsed = jobSchema.safeParse(submission);
  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message ?? "Invalid job data." };
  }

  await prisma.job.create({
    data: {
      title: parsed.data.title,
      company: parsed.data.company,
      location: parsed.data.location,
      type: parsed.data.type,
      salary: parsed.data.salary,
      description: parsed.data.description,
      postedById: session.user.id,
    },
  });

  revalidatePath("/");
  revalidatePath("/dashboard");

  return { success: "Job posted successfully!" };
}

export async function applyToJob(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Sign in to apply for jobs." };
  }

  const submission = toObject(formData);
  const parsed = applicationSchema.safeParse(submission);
  if (!parsed.success) {
    return {
      error: parsed.error.errors[0]?.message ?? "Invalid application data.",
    };
  }

  const existingApplication = await prisma.application.findUnique({
    where: {
      jobId_userId: {
        jobId: parsed.data.jobId,
        userId: session.user.id,
      },
    },
  });

  if (existingApplication) {
    return { error: "You have already applied to this job." };
  }

  await prisma.application.create({
    data: {
      jobId: parsed.data.jobId,
      userId: session.user.id,
      note: parsed.data.note,
    },
  });

  revalidatePath(`/jobs/${parsed.data.jobId}`);
  revalidatePath("/dashboard");

  return { success: "Application submitted!" };
}

export async function updateApplicationStatus(
  applicationId: string,
  status: "PENDING" | "REVIEWING" | "ACCEPTED" | "REJECTED"
) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    include: { job: true },
  });

  if (!application || application.job.postedById !== session.user.id) {
    return { error: "You cannot update this application." };
  }

  await prisma.application.update({
    where: { id: applicationId },
    data: { status },
  });

  revalidatePath("/dashboard");
  return { success: "Application updated." };
}
