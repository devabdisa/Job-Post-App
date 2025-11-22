"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

type Props = {
  children: React.ReactNode;
  className?: string;
  pendingText?: string;
};

export function SubmitButton({ children, className, pendingText }: Props) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={`inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-75 ${
        className ?? ""
      }`}
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {pendingText ?? "Please wait"}
        </>
      ) : (
        children
      )}
    </button>
  );
}
