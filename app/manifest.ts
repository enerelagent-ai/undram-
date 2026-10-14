import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Undram Brand — Монгол зөгийн бал",
    short_name: "Undram",
    description: "Монголын байгалийн цэвэр зөгийн бал, бэлгийн багц болон эрүүл хэрэглээ.",
    start_url: "/",
    display: "standalone",
    background_color: "#FDFBF7",
    theme_color: "#F59E0B",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
