"use client";

import { useQuery } from "@tanstack/react-query";
import { useRef, useEffect } from "react";
import { FaRegCommentDots } from "react-icons/fa6";
import { getBlogComments } from "../_lib/data-service";

export default function ScrollToCommentButton({ blogId }) {
  // Fetch comments
  const { data: comments = [] } = useQuery({
    queryKey: ["blogComments", blogId],
    queryFn: () => getBlogComments(blogId),
    staleTime: 10000,
  });

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
      <span className="text-sm text-primary">{comments.length}</span>
    </button>
  );
}
