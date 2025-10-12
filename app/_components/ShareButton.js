"use client";

import { useState } from "react";
import { LuClipboardPlus, LuClipboardCheck } from "react-icons/lu";
import toast from "react-hot-toast";

function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Blog link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link.");
      console.error("Clipboard error:", err);
    }
  };

  return (
    <button
      className={`flex flex-col items-center gap-0.5 ${
        copied ? "cursor-default" : "cursor-pointer"
      }`}
      disabled={copied}
      onClick={handleCopy}
      aria-label="Copy blog link"
    >
      {copied ? (
        <LuClipboardCheck className="stroke-primary" size={20} />
      ) : (
        <LuClipboardPlus className="stroke-primary" size={20} />
      )}
    </button>
  );
}

export default ShareButton;
