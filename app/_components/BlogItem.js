import Link from "next/link";
import { formatDate, truncateText } from "../_lib/helper";
import CategoryBadge from "./CategoryBadge";

function BlogItem({ blog }) {
  return (
    <div className="bg-lightGreen w-sm p-5 rounded h-auto">
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
        <CategoryBadge bgColor={blog.category.bgColor}>
          {blog.category.name}
        </CategoryBadge>
        <p className="text-sm mt-2 font-medium line-clamp-4">
          {truncateText(blog.content, 250)}
        </p>
      </div>

      <p className="text-xs justify-end mt-5 flex">{formatDate(blog.date)}</p>
    </div>
  );
}

export default BlogItem;
