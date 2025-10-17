import toast from "react-hot-toast";
import { supabase } from "./supabase";

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
