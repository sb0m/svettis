import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugIn = {
  registerType: "prompt",
  manifest: {
    name: "Svettis",
    short_name: "Svettis",
    description: "Svettis - trainings application",
    icons: [
      {
        src: "/svettis/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/svettis/icons/icon-384x384.png",
        sizes:
          "72x72 96x96 128x128 144x144 152x152 192x192 256x256 384x384 512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    theme_color: "#f56038",
    background_color: "#f56038",
    display: "standalone",
    scope: "/svettis/",
    start_url: "/svettis/",
    orientation: "portrait",
  },
};

export default defineConfig({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  plugins: [react(), VitePWA(manifestForPlugIn)],
  base: "/svettis/",
});
