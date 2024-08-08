import { UAParser } from "ua-parser-js";
import supabase from "./supabase";
export const getClicksForUrls = async (url_id) => {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", url_id);

  if (error) {
    console.error(error.message);
    throw new Error("Unable to fetch Urls");
  }
  return data;
};

const parser = new UAParser();

export const createClick = async ({ id, original_url }) => {
  try {
    const res = await parser.getResult();
    const device = res.device.type || "desktop";

    const response = await fetch("https://ipapi.co/json/");
    const { city, country_name: country } = await response.json();

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
};

export const getClicksForSingleUrl = async (url_id) => {
  const { data, error } = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", url_id);

  if (error) {
    console.error(error.message);
    throw new Error("Unable to fetch Clicks for Url");
  }

  return data;
};
