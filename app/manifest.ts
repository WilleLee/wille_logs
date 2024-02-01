import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Wille logs... (daily book log)",
    short_name: "Wille logs",
    description: "see what Wille logs today",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
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
    ],
  };
}
