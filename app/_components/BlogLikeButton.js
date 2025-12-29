"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { getBlogLikes } from "../_lib/data-service";
import { likeBlog, unlikeBlog } from "../_lib/actions";

export default function BlogLikeButton({ blogId, currentUser }) {
  const queryClient = useQueryClient();

  const { data: blogLikes = [] } = useQuery({
    queryKey: ["blogLikes", blogId],
    queryFn: () => getBlogLikes(blogId),
    staleTime: 10000,
  });

  const isLiked = blogLikes.some(
    (like) => like.blogId === blogId && like.userId === currentUser.id
  );

  const mutation = useMutation({
    mutationFn: async (action) => {
      if (action === "like") return await likeBlog(blogId);
      if (action === "unlike") return await unlikeBlog(blogId);
    },
    onMutate: async (action) => {
      await queryClient.cancelQueries({ queryKey: ["blogLikes", blogId] });
      const previousLikes =
        queryClient.getQueryData(["blogLikes", blogId]) || [];

      const payload = { blogId, userId: currentUser.id };
      const updatedLikes =
        action === "like"
          ? [...previousLikes, payload]
          : previousLikes.filter(
              (like) =>
                !(
                  like.blogId === payload.blogId &&
                  like.userId === payload.userId
                )
            );

      queryClient.setQueryData(["blogLikes", blogId], updatedLikes);
      return { previousLikes };
    },
    onError: (_error, _action, context) => {
      if (context?.previousLikes) {
        queryClient.setQueryData(["blogLikes", blogId], context.previousLikes);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["blogLikes", blogId] });
    },
  });

  const handleToggleLike = () => {
    mutation.mutate(isLiked ? "unlike" : "like");
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
        {blogLikes.filter((like) => like.blogId === blogId).length}
      </span>
    </button>
  );
}
