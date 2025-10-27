"use client";

import { useOptimistic, startTransition } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

const currentUser = {
  id: 1,
  fullName: "Parsa Nikzad",
};

function BlogLikeButton({ blogLikes, blogId }) {
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    blogLikes,
    (state, newLike) => {
      if (newLike.action === "like") {
        return [...state, newLike.payload];
      } else {
        return state.filter(
          (like) =>
            !(
              like.blogId === newLike.payload.blogId &&
              like.userId === newLike.payload.userId
            )
        );
      }
    }
  );
  const isLiked = optimisticLikes.some(
    (like) => like.blogId === blogId && like.userId === currentUser.id
  );
  const handleToggleLike = () => {
    const payload = {
      blogId: blogId,
      userId: currentUser.id,
      createdAt: new Date().toISOString(),
    };

    startTransition(() => {
      if (isLiked) {
        setOptimisticLikes({ action: "unlike", payload });
        // Supabase request
      } else {
        setOptimisticLikes({ action: "like", payload });
        // Supabase request
      }
    });
  };

  return (
    <button
      className="flex flex-col items-center gap-0.5 cursor-pointer"
      onClick={handleToggleLike}
    >
      {isLiked ? (
        <FaHeart className="fill-primary" size={17} />
      ) : (
        <FaRegHeart className="fill-primary" size={17} />
      )}
      <span className="text-sm text-primary">
        {optimisticLikes.filter((l) => l.blogId === blogId).length}
      </span>
    </button>
  );
}

export default BlogLikeButton;
