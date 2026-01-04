"use client";

import { useState, useRef, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { TiDocumentAdd } from "react-icons/ti";
import { HiOutlineLogout } from "react-icons/hi";
import Link from "next/link";
import { signOutUser } from "../_lib/actions";

export default function UserEditButton({ userId }) {
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
          href={`/users/${userId}/add-blog`}
        >
          <TiDocumentAdd size={21} className="fill-background" />
          <span>Add Blog</span>
        </Link>
        <Link
          className="text-left bg-mediumGreen text-background rounded py-1.5 px-3 cursor-pointer flex items-center gap-2 transition-all duration-200 hover:bg-[#3f4e42]"
          href={`/users/${userId}/edit`}
        >
          <FaUserEdit size={18} className="fill-background ml-0.5" />
          <span>Edit Account</span>
        </Link>
        <button
          className="text-left bg-mediumGreen text-background rounded py-1.5 px-3 cursor-pointer flex items-center gap-2 transition-all duration-200 hover:bg-[#3f4e42]"
          onClick={() => signOutUser()}
        >
          <HiOutlineLogout size={21} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
