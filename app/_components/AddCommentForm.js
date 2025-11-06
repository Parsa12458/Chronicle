"use client";

import InputTextarea from "@/app/_components/InputTextarea";
import SubmitButton from "@/app/_components/SubmitButton";
import { addComment } from "@/app/_lib/actions";
import { useRef } from "react";
import toast from "react-hot-toast";

function AddCommentForm({ blogId, userId }) {
  const formRef = useRef(null);

  async function handleSubmit(formData) {
    const result = await addComment(formData);

    if (!result?.success) {
      toast.error(result?.error?.message || "Comment could not be submitted!");
    }

    if (result?.success) {
      toast.success("Your comment is succesfully submitted!");
      formRef.current.reset();
    }
  }

  return (
    <form action={handleSubmit} ref={formRef}>
      <input type="hidden" name="blogId" value={blogId} />
      <input type="hidden" name="userId" value={userId} />
      <InputTextarea
        row={5}
        placeholder="Write your comment here..."
        id="content"
        required={true}
      />
      <SubmitButton additionalClasses="ml-auto mt-3" type="submit">
        Submit
      </SubmitButton>
    </form>
  );
}

export default AddCommentForm;
