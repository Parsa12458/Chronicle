"use client";

import toast from "react-hot-toast";
import Button from "./_components/Button";
import { useEffect } from "react";

export default function Error({ error }) {
  useEffect(() => {
    if (error?.message) {
      toast.dismiss();
      toast.error(error.message);
    }
  }, [error]);

  return (
    <main className="flex justify-center items-center flex-col gap-4 text-center px-12">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error?.message}</p>

      <Button onClick={() => window.location.reload()}>Try again</Button>
    </main>
  );
}
