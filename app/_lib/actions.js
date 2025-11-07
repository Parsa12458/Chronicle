"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "./supabase";
import { validateWithZod } from "./helper";
import { commentSchema } from "./validators";

export async function addComment(formData) {
  const raw = {
    blogId: formData.get("blogId"),
    userId: formData.get("userId"),
    content: formData.get("content"),
    parentCommentId: formData.get("parentCommentId"),
  };

  const result = validateWithZod(commentSchema, raw);
  if (!result.success) {
    return {
      success: false,
      errorType: "validation",
      errors: result.errors,
    };
  }

  const { error } = await supabase
    .from("comments")
    .insert([result.data])
    .select();

  if (error) {
    console.error(error);
    return {
      success: false,
      errorType: "server",
      error: { message: error.message },
    };
  }

  revalidatePath(`/blogs/${result.data.blogId}`);
  return { success: true };
}
