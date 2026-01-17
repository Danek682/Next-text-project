import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url"; 
import type { Image } from "sanity";

export const client = createClient({
  projectId: "59cwrbar",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: true,
});


const builder = createImageUrlBuilder(client);
export const urlFor = (source: Image) => builder.image(source);