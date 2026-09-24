import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

const escapeXml = (value: string) => value.replace(/[<>&'"]/g, (character) => ({
  "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;",
}[character]!));

export const GET: APIRoute = async ({ site }) => {
  const posts = await getCollection("writing", ({ data }) => !data.draft);
  const paths = ["/", "/about/", "/writing/", ...posts.map((post) => `/writing/${post.id}/`)];
  const urls = paths.map((path) => `<url><loc>${escapeXml(new URL(path, site).href)}</loc></url>`).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
