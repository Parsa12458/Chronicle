import Link from "next/link";
import { extractTextFromDelta, formatDate, truncateText } from "../_lib/helper";
import CategoryBadge from "./CategoryBadge";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

function BlogItem({ blog, category, author }) {
  return (
    <div className="bg-lightGreen w-sm p-5 rounded h-auto relative">
      <Link
        className="flex items-center gap-2.5 mb-4"
        href={`/users/${author.id}`}
      >
        {author.avatar ? (
          <Image
            className="w-8 h-8 aspect-square rounded-full object-center object-cover"
            src={author.avatar}
            alt={`${author.fullName} avatar`}
            width={32}
            height={32}
          />
        ) : (
          <FaUserCircle size={32} className="fill-primary" />
        )}
        <span className="text-sm font-semibold">{author.fullName}</span>
      </Link>

      <div className="pl-5">
        <Link
          className="font-bold underline inline leading-7 mr-1"
          href={`/blogs/${blog.id}`}
        >
          {blog.title}
        </Link>
        <CategoryBadge bgColor={category.bgColor} param={category.key}>
          {category.name}
        </CategoryBadge>
        <p className="text-sm mt-2 font-medium line-clamp-4 mb-7">
          {truncateText(extractTextFromDelta(blog.content), 250)}
        </p>
      </div>

      <p className="text-xs absolute bottom-5 right-6">
        {formatDate(blog.createdAt)}
      </p>
    </div>
  );
}

export default BlogItem;
