import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "../_lib/validators";
import { addComment, editComment } from "../_lib/actions";
import toast from "react-hot-toast";

export function useCommentForm({ comment, isEditing, setIsReplyInputVisible }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(commentSchema),
  });

  async function onSubmit(data) {
    const formData = new FormData();
    formData.set("blogId", data.blogId);
    formData.set("content", data.content);

    let result;
    if (!isEditing) {
      formData.set("parentCommentId", data.parentCommentId);
      result = await addComment(formData);
    }

    if (isEditing) {
      result = await editComment(formData, comment.id);
    }

    if (result.success) {
      toast.success(
        `Your comment is succesfully ${isEditing ? "Updated" : "submitted"}!`
      );
      setIsReplyInputVisible(false);
      reset();
    }

    if (result.errorType === "server") {
      toast.error(result.error.message || "Something went wrong!");
    }
  }

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    reset,
  };
}
