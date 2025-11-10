import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeComment, unlikeComment } from "../_lib/data-service";

export function useCommentLikes({ commentId, userId, blogId }) {
  const queryClient = useQueryClient();
  const queryKey = ["commentLikes", +blogId];

  const likeMutation = useMutation({
    mutationFn: async (action) => {
      const payload = { commentId, userId };
      if (action === "like") return await likeComment(payload);
      return await unlikeComment(payload);
    },
    onMutate: async (action) => {
      await queryClient.cancelQueries({
        queryKey,
      });

      const previousLikes = queryClient.getQueryData(queryKey) || [];

      const payload = { commentId, userId };
      const updatedLikes =
        action === "like"
          ? [...previousLikes, payload]
          : previousLikes.filter(
              (like) =>
                !(
                  like.commentId === payload.commentId &&
                  like.userId === payload.userId
                )
            );

      queryClient.setQueryData(queryKey, updatedLikes);

      return { previousLikes };
    },
    onError: (_error, _action, context) => {
      if (context?.previousLikes) {
        queryClient.setQueryData(queryKey, context.previousLikes);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey,
      });
    },
  });

  return likeMutation;
}
