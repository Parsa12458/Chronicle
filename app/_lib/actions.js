"use server";

import { revalidatePath } from "next/cache";
import { validateWithZod } from "./helper";
import { blogSchema, commentSchema } from "./validators";
import { auth, signIn } from "@/app/_lib/auth";
import { createClient } from "@supabase/supabase-js";

export async function getSupabaseClient() {
  const session = await auth();

  if (!session?.user?.id) throw new Error("Unauthorized!");

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      global: {
        headers: {
          Authorization: `Bearer ${session.supabaseAccessToken}`,
        },
      },
    }
  );

  return { supabase, userId: session.user.id };
}

export async function addComment(formData) {
  const { supabase, userId } = await getSupabaseClient();

  const raw = {
    blogId: formData.get("blogId"),
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
    .insert([{ ...result.data, userId }])
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
  const { supabase, userId } = await getSupabaseClient();

  const { data: existing, error: fetchError } = await supabase
    .from("comments")
    .select("userId")
    .eq("id", id)
    .single();

  if (fetchError || !existing) {
    return {
      success: false,
      errorType: "server",
      error: { message: "Comment not found!" },
    };
  }

  if (existing.userId !== userId) {
    return {
      success: false,
      errorType: "server",
      error: { message: "You are allowed to only edit your own comments!" },
    };
  }

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

  revalidatePath(`/blogs/${data.blogId}`);
  return { success: true, data };
}

export async function addBlog(formData) {
  const { supabase, userId } = await getSupabaseClient();

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
    .insert([{ ...result.data, image: imagePath, authorId: userId }])
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

export async function editBlog(formData, id, previousImagePath) {
  const { supabase, userId } = await getSupabaseClient();

  const { data: existing, error: fetchError } = await supabase
    .from("blogs")
    .select("authorId")
    .eq("id", id)
    .single();

  if (fetchError || !existing) {
    return {
      success: false,
      errorType: "server",
      error: { message: "Blog not found!" },
    };
  }

  if (existing.authorId !== userId) {
    return {
      success: false,
      errorType: "server",
      error: { message: "You are allowed to only edit your own blogs!" },
    };
  }

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

  // 1. Update the blog
  const imageName = `${Math.random()}-${result.data.image?.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = result.data.image
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blogImages/${imageName}`
    : null;
  const { error } = await supabase
    .from("blogs")
    .update({
      categoryId: result.data.categoryId,
      title: result.data.title,
      content: result.data.content,
      image: imagePath ?? previousImagePath,
    })
    .eq("id", id);

  if (error) {
    console.error(error);
    return {
      success: false,
      errorType: "server",
      error: { message: error.message },
    };
  }

  if (!result.data.image) return { success: true };

  // If there was a new image:
  // 2. Upload the new image to storage
  const { error: storageError } = await supabase.storage
    .from("blogImages")
    .upload(imageName, result.data.image);

  // If there was a error uploading new image, set the previous image on blog
  if (storageError) {
    await supabase
      .from("blogs")
      .update({ image: previousImagePath })
      .eq("id", id);
    console.error(storageError);
    return {
      success: false,
      errorType: "server",
      error: { message: storageError.message },
    };
  }

  // 3. If uploading new image was successful, delete the old image from bucket
  await supabase.storage
    .from("blogImages")
    .remove([previousImagePath.split("/").pop()]);

  return { success: true };
}

export async function likeBlog(blogId) {
  const { supabase, userId } = await getSupabaseClient();

  const { data, error } = await supabase
    .from("blogLikes")
    .insert([{ blogId, userId }])
    .select();

  if (error) console.error(error);
  return data?.[0];
}

export async function unlikeBlog(blogId) {
  const { supabase, userId } = await getSupabaseClient();

  const { error } = await supabase
    .from("blogLikes")
    .delete()
    .match({ blogId, userId });

  if (error) console.error(error);
}

export async function signInWithGoogle() {
  await signIn("google", { redirectTo: "/" });
}
