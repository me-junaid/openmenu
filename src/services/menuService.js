import { supabase } from "../config/supabase";

export async function getCategoriesWithItems(userId) {
  const { data, error } = await supabase
    .from("categories")
    .select(`
      id,
      name,
      items (
        id,
        name,
        price
      )
    `)
    .eq("user_id", userId)
    .eq("is_live", true)
    .order("id", { ascending: true });

  if (error) throw error;
  return data;
}
