import supabase from "./supabase";

export const getUrls = async (user_id) => {
  const { data, error } = await supabase.from("urls").select("*").eq("user_id",user_id);

  if (error) {
    console.error(error.message);
    throw new Error("Unable to fetch Clicks");
  }
  return data;
};
