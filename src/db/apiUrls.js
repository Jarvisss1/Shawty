import UAParser from "ua-parser-js";
import supabase, { supabaseUrl } from "./supabase";

export const getUrls = async (user_id) => {
  const { data, error } = await supabase.from("urls").select("*").eq("user_id",user_id);

  if (error) {
    console.error(error.message);
    throw new Error("Unable to fetch Clicks");
  }
  return data;
};

export const deleteUrl = async (id) => {
  const { data, error } = await supabase
    .from("urls")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error.message);
    throw new Error("Unable to delete Url");
  }
  return data;
};

export const createUrl = async ({title,longUrl,customUrl,user_id},qr_code) => {
  const short_url = Math.random().toString(36).substring(2,6);
  const fileName = `qr-${short_url}`;

  const { error: storageError } = await supabase.storage
    .from("qrs")
    .upload(fileName, qr_code);

  if (storageError) throw new Error(storageError.message);

  const qr = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`;

  const { data, error } = await supabase.from("urls").insert([
    {
      title,
      original_url: longUrl,
      custom_url: customUrl || null,
      user_id,
      short_url,
      qr,
    },
  ]).select();

  if (error) {
    console.error(error.message);
    throw new Error("Error creating URL");  
  }
  return data;
};

export const getLongUrl = async (id) => {
  const { data, error } = await supabase
    .from("urls")
    .select("id,original_url")
    .or(`short_url.eq.${id}`, `custom_url.eq.${id}`).single();

  if (error) {
    console.error(error.message);
    throw new Error("Unable to Long URL");
  }
  return data;
};

const parser = new UAParser();

export const createClick = async ({id,original_url}) => {
  try {
    const res = await parser.getResult();
    const device = res.device.type || "desktop";

    const response = await fetch("https://ipapi.co/json/");
    const {city,country_name : country} = await response.json();

    await supabase.from("clicks").insert([
      {
        url_id: id,
        device,
        city,
        country,
      },
    ]);

    window.location.href = original_url;

  } catch (error) {
    console.error(error.message);
    throw new Error("Error creating Click");
  }
}
