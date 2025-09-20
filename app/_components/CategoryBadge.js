"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { getContrastingTextColor } from "../_lib/helper";

function CategoryBadge({ children, bgColor }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", children.toLowerCase());

    router.push(`/blogs?${params.toString()}`);
  };

  return (
    <button
      style={{
        backgroundColor: bgColor,
        color: getContrastingTextColor(bgColor),
      }}
      className="text-xs py-0.5 px-2 rounded cursor-pointer"
      onClick={handleCategoryClick}
    >
      {children}
    </button>
  );
}

export default CategoryBadge;
