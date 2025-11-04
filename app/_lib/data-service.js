import toast from "react-hot-toast";
import { supabase } from "./supabase";

export async function getBlogs(filters = {}) {
  const { category, sortBy, search, page = 1, limit = 10 } = filters;

  const offset = (page - 1) * limit;

  let query = supabase
    .from("blogs")
    // TODO: optimize this later. add a excerpt property while inserting blogs that will be created automatically, get the excerpt instead of content
    .select("id,createdAt,authorId,title,categoryId,content")
    .range(offset, offset + limit - 1); // Pagination

  // Filter by categoryId
  if (category?.id && category?.key !== "all") {
    query = query.eq("categoryId", category?.id);
  }

  // Filter by search term
  if (search?.trim()) {
    const terms = search.trim().split(/\s+/); // split by space
    const ilikeFilters = terms.map((term) => `title.ilike.%${term}%`).join(",");

    query = query.or(ilikeFilters);
  }

  // Sort by selected option
  if (sortBy === "newest") {
    query = query.order("createdAt", { ascending: false });
  } else if (sortBy === "oldest") {
    query = query.order("createdAt", { ascending: true });
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    toast.error(error.message);
  }

  return data;
}

export async function getLastBlogs() {
  const { data, error } = await supabase.from("blogs").select("*").range(0, 5);

  if (error) {
    console.error(error);
    toast.error(error.message);
  }
  return data;
}

export async function getBlog(id) {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    toast.error(error.message);
  }
  return data;
}

export async function getCategories() {
  const { data, error } = await supabase.from("categories").select("*");

  if (error) console.error(error);
  return data;
}

export async function getCategory(id) {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();

  if (error) console.error(error);
  return data;
}

export async function getUsersById(idOrIds) {
  let query = supabase.from("users").select("*");

  if (Array.isArray(idOrIds) && idOrIds.length > 0) {
    query = query.in("id", idOrIds);
  }
  if (typeof idOrIds === "number") {
    query = query.eq("id", idOrIds).single();
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
}

export async function getBlogLikes(blogId) {
  const { data, error } = await supabase
    .from("blogLikes")
    .select("*")
    .eq("blogId", blogId);

  if (error) console.error(error);
  return data;
}

export async function likeBlog({ blogId, userId }) {
  const { data, error } = await supabase
    .from("blogLikes")
    .insert([{ blogId, userId }])
    .select();

  if (error) console.error(error);
  return data?.[0];
}

export async function unlikeBlog({ blogId, userId }) {
  const { error } = await supabase
    .from("blogLikes")
    .delete()
    .match({ blogId, userId });

  if (error) console.error(error);
}

export async function getBlogComments(blogId) {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("blogId", blogId);

  if (error) console.error(error);
  return data;
}

export async function getCommentsLikes(commentIds) {
  const { data, error } = await supabase
    .from("commentLikes")
    .select("*")
    .in("commentId", commentIds);

  if (error) console.error(error);
  return data;
}

export async function likeComment({ commentId, userId }) {
  const { data, error } = await supabase
    .from("commentLikes")
    .insert({ commentId, userId })
    .select();

  if (error) console.error(error);
  return data?.[0];
}

export async function unlikeComment({ commentId, userId }) {
  const { error } = await supabase
    .from("commentLikes")
    .delete()
    .match({ commentId, userId });

  if (error) console.error(error);
}
