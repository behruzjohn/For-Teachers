import { createClient } from "@supabase/supabase-js";

export const subbaseUrl = "https://oaglxlhfzfhblwrzsplh.supabase.co";
export const subbaseKey = "sb_publishable_cD0WY9xAVN9xB71aHYwMKw__OoVtT_b";
export const subbase = createClient(subbaseUrl, subbaseKey);
