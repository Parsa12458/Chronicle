"use client";

import { useSearchParams } from "next/navigation";
import Button from "../_components/Button";

const errorMessages = {
  Configuration: "There was a problem with server configuration.",
  AccessDenied: "Access denied. Please check your permissions.",
  Verification:
    "Verification failed. The token may have expired or already been used.",
  Default: "An unexpected error occurred. Please try again.",
};

export default function Page() {
  const search = useSearchParams();
  const error = search.get("error") || "Default";

  return (
    <div className="flex justify-center items-center flex-col gap-4 text-center px-12 mb-10 flex-1">
      <h1 className="text-3xl font-semibold">Oops! Authentication Failed</h1>
      <p className="text-lg">{errorMessages[error] || errorMessages.Default}</p>

      <Button onClick={() => window.location.reload()}>Retry</Button>
    </div>
  );
}
