"use client";

import { loginUser } from "@/app/actions";
import { useFormState } from "react-dom";
import { SubmitButton } from "./submit-button";
import { FormMessage } from "./form-message";

const initialState = { success: "", error: "" };

export function LoginForm() {
  const [state, formAction] = useFormState(loginUser, initialState);

  return (
    <form className="space-y-4" action={formAction}>
      <label className="space-y-1 text-sm font-medium text-slate-700">
        Email
        <input
          type="email"
          name="email"
          required
          className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none"
        />
      </label>
      <label className="space-y-1 text-sm font-medium text-slate-700">
        Password
        <input
          type="password"
          name="password"
          required
          className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none"
        />
      </label>
      <SubmitButton pendingText="Signing in">Sign in</SubmitButton>
      <FormMessage message={state.error} type="error" />
      <FormMessage message={state.success} type="success" />
    </form>
  );
}
