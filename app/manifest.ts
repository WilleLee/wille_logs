import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Wille logs...",
    short_name:
      process.env.NEXT_PUBLIC_MODE === "production"
        ? "Wille logs"
        : "Wille(dev)",
    description: "see what Wille read today",
    categories: [
      "books",
      "blog",
      "resumé",
      "frontend",
      "development",
      "philosophy",
    ],
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "red",
    dir: "ltr",
    lang: "ko",
    screenshots: [
      {
        src: "/logos/screenshot_iphone12.PNG",
        sizes: "1170x2532",
      },
      {
        src: "/logos/screenshot_macbook.png",
        sizes: "2880x1560",
      },
    ],
    icons: [
      {
        src: "/logos/avatar48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/logos/avatar72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "/logos/avatar96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/logos/avatar144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "/logos/avatar168.png",
        sizes: "168x168",
        type: "image/png",
      },
      {
        src: "/logos/avatar192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logos/avatar512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
