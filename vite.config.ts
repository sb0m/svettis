import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(), VitePWA({ registerType: "autoUpdate" })],
//   base: "/Svettis/",
// });

const manifestForPlugIn = {
  registerType: "prompt",
  // includeAssests: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
  manifest: {
    name: "React-vite-app",
    short_name: "react-vite-app",
    description: "I am a simple vite app",
    icons: [
      {
        src: "/icons/icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "/icons/icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/icons/icon-128x128.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        src: "/icons/icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "/icons/icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/maskable_icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    //  [
    //   {
    //     src: "/icons/android-chrome-192x192.png",
    //     sizes: "192x192",
    //     type: "image/png",
    //     purpose: "favicon",
    //   },
    //   {
    //     src: "/icons/android-chrome-512x512.png",
    //     sizes: "512x512",
    //     type: "image/png",
    //     purpose: "favicon",
    //   },
    //   {
    //     src: "/icons/apple-touch-icon.png",
    //     sizes: "180x180",
    //     type: "image/png",
    //     purpose: "apple touch icon",
    //   },
    //   {
    //     src: "/icons/maskable_icon.png",
    //     sizes: "512x512",
    //     type: "image/png",
    //     purpose: "any maskable",
    //   },
    //   {
    //     src: "/icons/android-chrome-144x144.png",
    //     sizes: "144x144",
    //     type: "image/png",
    //     purpose: "any",
    //   },
    //   {
    //     src: "/icons/android-chrome-144x144.png",
    //     sizes: "144x144",
    //     type: "image/png",
    //   },
    // ],
    theme_color: "#171717",
    background_color: "#f0e7db",
    display: "standalone",
    scope: "/svettis/",
    start_url: "/svettis/",
    orientation: "portrait",
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  plugins: [react(), VitePWA(manifestForPlugIn)],
  base: "/svettis/",
});

// registerType: "autoUpdate",
// devOptions: {
//   enabled: true,
// },
// injectRegister: "auto",
