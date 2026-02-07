import { supabase } from "../config/supabase";

async function uploadItemImage(file, categoryId) {
  if (!file) return null;

  const ext = file.name.split(".").pop();
  const path = `categories/${categoryId}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from("item-images")
    .upload(path, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from("item-images")
    .getPublicUrl(path);

  return data.publicUrl;
}

export async function addItemToCategory({
  categoryId,
  name,
  price,
  description,
  image,
  isOfferAvailable,
  isLive
}) {
  if (!categoryId) throw new Error("categoryId is required");

  const imageUrl = await uploadItemImage(image, categoryId);

  const { data, error } = await supabase
    .from("items")
    .insert({
      category_id: categoryId,
      name,
      price: Number(price),
      description,
      image_url: imageUrl,
      is_available: isOfferAvailable,
      is_live: isLive
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}
