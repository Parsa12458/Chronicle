"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "./supabase";

export async function addComment(formData) {
  const blogId = +formData.get("blogId");
  const userId = +formData.get("userId");
  const content = formData.get("content");
  const parentCommentId = +formData.get("parentCommentId") || null;

  const { error } = await supabase
    .from("comments")
    .insert([{ blogId, userId, content, parentCommentId }])
    .select();

  if (error) {
    console.error(error);
    return { success: false, error: { message: error.message } };
  }

  revalidatePath(`/blogs/${blogId}`);
  return { success: true };
}
