"use client";

import { useState, useRef, useEffect } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import Link from "next/link";
import { deleteBlog } from "../_lib/data-service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function BlogEditButton({ userId, blogId }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const router = useRouter();

  // Delete blog logic
  const { mutate: deleteBlogMutation, isPending: isDeletingBlog } = useMutation(
    {
      mutationFn: () => deleteBlog(blogId),
      onSuccess: () => {
        toast.success("Your blog is deleted successfully!");
        router.push(`/users/${userId}`);
      },
      onError: (error) => {
        console.error(error);
        toast.error(error.message);
      },
    }
  );

  return (
    <div ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-10 right-10 bg-primary rounded-2xl p-2 z-30 cursor-pointer"
      >
        <MdEdit className="fill-background" size={28} />
      </button>

      <div
        className={`fixed bottom-20 right-20 bg-mediumGreen rounded shadow-md p-1 z-40 flex flex-col gap-1 transition-all duration-300 font-medium ${
          open
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <Link
          className="text-left bg-mediumGreen text-background rounded py-1.5 px-3 cursor-pointer flex items-center gap-2 transition-all duration-200 hover:bg-[#3f4e42]"
          href={`/blogs/${blogId}/edit-blog`}
        >
          <MdEdit size={18} className="fill-background" />
          <span>Edit Blog</span>
        </Link>
        <button
          className="text-left bg-mediumGreen text-background rounded py-1.5 px-3 cursor-pointer flex items-center gap-2 transition-all duration-200 hover:bg-[#3f4e42] disabled:cursor-not-allowed disabled:opacity-80"
          onClick={() => deleteBlogMutation()}
          disabled={isDeletingBlog}
        >
          <MdDelete size={21} className="fill-background" />
          <span>Delete Blog</span>
        </button>
      </div>
    </div>
  );
}
