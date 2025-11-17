import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../_lib/data-service";
import toast from "react-hot-toast";

export function useDeleteComment(blogId) {
  const queryClient = useQueryClient();
  const queryKey = ["blogComments", blogId];

  return useMutation({
    mutationFn: async (commentId) => {
      return await deleteComment(commentId);
    },
    onMutate: async (commentId) => {
      await queryClient.cancelQueries({ queryKey });

      const previousComments = queryClient.getQueryData(queryKey) || [];

      const updatedComments = previousComments.filter(
        (comment) => comment.id !== commentId
      );

      queryClient.setQueryData(queryKey, updatedComments);

      return { previousComments };
    },
    onError: (error, _commentId, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(queryKey, context.previousComments);
      }
      toast.error(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}
