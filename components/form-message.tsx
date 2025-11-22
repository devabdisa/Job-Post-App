"use client";

import { useEffect, useState } from "react";

type Props = {
  message?: string;
  type: "success" | "error";
};

export function FormMessage({ message, type }: Props) {
  const [visible, setVisible] = useState(Boolean(message));

  useEffect(() => {
    setVisible(Boolean(message));
  }, [message]);

  if (!message || !visible) {
    return null;
  }

  return (
    <div
      className={`rounded-lg px-3 py-2 text-sm ${
        type === "success"
          ? "bg-emerald-50 text-emerald-700"
          : "bg-rose-50 text-rose-700"
      }`}
    >
      {message}
    </div>
  );
}
