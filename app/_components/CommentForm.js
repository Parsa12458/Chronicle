"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useCommentForm } from "../_hooks/useCommentForm";
import Button from "./Button";
import InputTextarea from "./InputTextarea";

function CommentForm({
  comment,
  prefillContent,
  currentUser,
  setIsReplyInputVisible,
  isEditing,
}) {
  const { register, handleSubmit, onSubmit, errors, isSubmitting, reset } =
    useCommentForm({
      comment,
      isEditing,
      setIsReplyInputVisible,
    });

  useEffect(() => {
    reset({
      blogId: comment.blogId,
      userId: currentUser.id,
      content: prefillContent,
      parentCommentId: isEditing ? comment.parentCommentId : comment.id,
    });
  }, [prefillContent]);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2, ease: "easeIn" }}
    >
      <form
        className="flex flex-col w-1/2 mt-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input type="hidden" {...register("blogId")} value={comment.blogId} />
        <input type="hidden" {...register("userId")} value={currentUser.id} />
        <input
          type="hidden"
          {...register("parentCommentId")}
          value={comment.id}
        />
        <InputTextarea
          placeholder="Write your reply here..."
          row={4}
          autoFocus={true}
          {...register("content")}
          error={errors.content?.message}
        />
        <div className="ml-auto mt-4 space-x-2 flex">
          <Button
            bgColor="background"
            textColor="darkGreen"
            borderColor="mediumGreen"
            onClick={() => setIsReplyInputVisible(false)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isEditing ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}

export default CommentForm;
