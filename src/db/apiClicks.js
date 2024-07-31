import supabase from "./supabase";


export const getClicksForUrls = async (url_id) => {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", url_id);

  if (error) {
    console.error(error.message);
    throw new Error("Unable to fetch Urls");
  }
  return data;
};
