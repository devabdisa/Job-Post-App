"use client";

import { applyToJob } from "@/app/actions";
import { useFormState } from "react-dom";
import { SubmitButton } from "./submit-button";
import { FormMessage } from "./form-message";

const initialState = { success: "", error: "" };

export function ApplicationForm({ jobId }: { jobId: string }) {
  const [state, formAction] = useFormState(applyToJob, initialState);

  return (
    <form className="space-y-3" action={formAction}>
      <input type="hidden" name="jobId" value={jobId} />
      <label className="space-y-1 text-sm font-medium text-slate-700">
        Optional note
        <textarea
          name="note"
          rows={4}
          placeholder="Share why you are the perfect fit..."
          className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none"
        />
      </label>
      <SubmitButton pendingText="Submitting">Apply now</SubmitButton>
      <FormMessage message={state.error} type="error" />
      <FormMessage message={state.success} type="success" />
    </form>
  );
}
