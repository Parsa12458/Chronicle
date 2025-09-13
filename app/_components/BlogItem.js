import Link from "next/link";
import {
  formatDate,
  getContrastingTextColor,
  truncateText,
} from "../_lib/helper";

function BlogItem({ blog }) {
  return (
    <div className="bg-lightGreen w-sm p-5 rounded">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="bg-primary w-8 aspect-square rounded-full"></div>
        <span className="text-sm font-semibold">{blog.author}</span>
      </div>

      <div className="pl-5">
        <Link
          className="font-bold underline inline leading-7 mr-1"
          href={`/blogs/${blog.id}`}
        >
          {blog.title}
        </Link>
        <Link
          style={{
            backgroundColor: blog.category.bgColor,
            color: getContrastingTextColor(blog.category.bgColor),
          }}
          className="text-xs py-0.5 px-2 rounded"
          href={`/blogs?category=${blog.category.name.toLowerCase()}`}
        >
          {blog.category.name}
        </Link>
        <p className="text-sm mt-2 font-medium">
          {truncateText(blog.content, 250)}
        </p>
      </div>

      <p className="text-xs justify-end mt-5 flex">{formatDate(blog.date)}</p>
    </div>
  );
}

export default BlogItem;
