"use client";

import InputTextarea from "@/app/_components/InputTextarea";
import { addComment } from "@/app/_lib/actions";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { commentSchema } from "../_lib/validators";
import Button from "./Button";

function AddCommentForm({ blogId, userId }) {
  const formRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(commentSchema),
  });

  async function onSubmit(data) {
    const formData = new FormData();
    formData.append("blogId", data.blogId);
    formData.append("userId", data.userId);
    formData.append("content", data.content);

    const result = await addComment(formData);

    if (result.success) {
      toast.success("Your comment is succesfully submitted!");
      formRef.current.reset();
    }

    if (result.errorType === "server") {
      toast.error(result.error.message || "Something went wrong!");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
      <input type="hidden" {...register("blogId")} value={blogId} />
      <input type="hidden" {...register("userId")} value={userId} />
      <InputTextarea
        row={5}
        placeholder="Write your comment here..."
        id="content"
        {...register("content")}
        error={errors.content?.message}
      />
      <Button
        additionalClasses="ml-auto mt-3"
        type="submit"
        disabled={isSubmitting}
      >
        Submit
      </Button>
    </form>
  );
}

export default AddCommentForm;
