import { formatDate } from "../_lib/helper";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import CommentActions from "./CommentActions";
import Link from "next/link";

function CommentItem({
  comment,
  commentsLikes,
  comments,
  users,
  currentUser,
  blogId,
}) {
  // Handle user information
  const user = users.find((user) => user.id === comment.userId);

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2.5">
        <Link href={`/users/${user?.id}`} className="flex items-center gap-2.5">
          {user?.avatar ? (
            <Image
              className="w-8 h-8 aspect-square rounded-full object-center object-cover border-2 border-primary"
              src={user.avatar}
              alt={`${user.fullName} avatar`}
              width={32}
              height={32}
            />
          ) : (
            <FaUserCircle size={32} className="fill-primary" />
          )}
          <span className="text-sm font-semibold">{user.fullName}</span>
        </Link>
        <span className="text-xs text-primary">
          {formatDate(comment.updatedAt ?? comment.createdAt)}
        </span>
      </div>

      <div className="ml-4 mt-1 pl-6 pb-3 border-l border-l-primary/50">
        <p className="text-sm">{comment.content}</p>

        <CommentActions
          comments={comments}
          comment={comment}
          commentsLikes={commentsLikes}
          blogId={blogId}
          users={users}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
}

export default CommentItem;
