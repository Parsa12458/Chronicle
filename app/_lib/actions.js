"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "./supabase";
import { validateWithZod } from "./helper";
import { blogSchema, commentSchema } from "./validators";

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

export async function editComment(formData, id) {
  const raw = {
    content: formData.get("content"),
  };

  const editSchema = commentSchema.pick({ content: true });
  const result = validateWithZod(editSchema, raw);
  if (!result.success) {
    return {
      success: false,
      errorType: "validation",
      errors: result.errors,
    };
  }

  const { data, error } = await supabase
    .from("comments")
    .update({
      content: result.data.content,
      updatedAt: new Date().toISOString(),
    })
    .eq("id", id)
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
  return { success: true, data };
}

export async function addBlog(formData) {
  const contentStr = formData.get("content");
  let contentParsed;
  try {
    contentParsed = JSON.parse(String(contentStr));
  } catch (e) {
    console.error("JSON parse failed:", contentStr);
    return {
      success: false,
      errorType: "validation",
      errors: {
        content: { message: "Invalid content format – corrupted JSON" },
      },
    };
  }

  const raw = {
    authorId: formData.get("authorId"),
    title: formData.get("title"),
    categoryId: formData.get("categoryId"),
    content: contentParsed,
    image: formData.get("image"),
  };

  const result = validateWithZod(blogSchema, raw);
  if (!result.success) {
    return {
      success: false,
      errorType: "validation",
      errors: result.errors,
    };
  }

  // 1. Create blog
  const imageName = `${Math.random()}-${result.data.image?.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = result.data.image
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blogImages/${imageName}`
    : null;
  const { error, data: blogData } = await supabase
    .from("blogs")
    .insert([{ ...result.data, image: imagePath }])
    .select()
    .single();

  if (error) {
    console.error(error);
    return {
      success: false,
      errorType: "server",
      error: { message: error.message },
    };
  }

  // 2. Upload image if exists
  if (!result.data.image) return { success: true };
  const { error: storageError } = await supabase.storage
    .from("blogImages")
    .upload(imageName, result.data.image);

  // 3. Delete the blog if there was an error uploading image
  if (storageError) {
    await supabase.from("blogs").delete().eq("id", blogData.id);
    console.error(storageError);
    return {
      success: false,
      errorType: "server",
      error: { message: storageError.message },
    };
  }

  return { success: true };
}
