import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2).max(60),
  email: z.string().email(),
  password: z.string().min(6).max(64),
});

export const loginSchema = registerSchema.pick({
  email: true,
  password: true,
});

export const jobSchema = z.object({
  title: z.string().min(3).max(120),
  company: z.string().min(2).max(120),
  location: z.string().min(2).max(120),
  type: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "FREELANCE"]),
  salary: z.string().min(2).max(80),
  description: z.string().min(20).max(5000),
});

export const filterSchema = z.object({
  keyword: z.string().optional(),
  location: z.string().optional(),
  type: jobSchema.shape.type.optional(),
});

export const applicationSchema = z.object({
  jobId: z.string().cuid(),
  note: z.string().max(1000).optional(),
});
