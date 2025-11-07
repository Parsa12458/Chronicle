"use client";

import { useRef, useEffect } from "react";
import { FaRegCommentDots } from "react-icons/fa6";

export default function ScrollToCommentButton({ commentsLength }) {
  const commentRef = useRef(null);

  useEffect(() => {
    commentRef.current = document.getElementById("comments");
  }, []);

  return (
    <button
      className="flex flex-col items-center gap-0.5 cursor-pointer"
      onClick={() => {
        commentRef.current?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      <FaRegCommentDots className="fill-primary" size={18} />
      <span className="text-sm text-primary">{commentsLength}</span>
    </button>
  );
}
