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

export async function getCategories() {
  const { data, error } = await supabase.from("categories").select("*");

  if (error) console.error(error);
  return data;
}

export async function getUsersById(idOrIds) {
  let query = supabase.from("users").select("*");

  if (Array.isArray(idOrIds) && idOrIds.length > 0) {
    query = query.in("id", idOrIds);
  }
  if (typeof idOrIds === "number") {
    query = query.eq("id", idOrIds);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
}
