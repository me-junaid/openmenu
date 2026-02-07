import { supabase } from "../config/supabase";

async function uploadCategoryImage(file, userId) {
  if (!file) return null;

  const ext = file.name.split(".").pop();
  const filePath = `${userId}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from("category-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Image upload error:", error);
    throw error;
  }

  const { data } = supabase.storage
    .from("category-images")
    .getPublicUrl(filePath);

  return data.publicUrl;
}


export async function createCategory({
  userId,
  name,
  image,
  isLive,
}) {
  if (!userId) throw new Error("User not authenticated");

  const imageUrl = await uploadCategoryImage(image, userId);

  const { data, error } = await supabase
    .from("categories")
    .insert({
      user_id: userId,
      name,
      image: imageUrl,
      is_live: isLive,
    })
    .select()
    .single();

  if (error) {
    console.error("Category insert error:", error);
    throw error;
  }

  return data;
}
