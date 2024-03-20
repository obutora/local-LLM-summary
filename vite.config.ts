import { crx, defineManifest } from "@crxjs/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const manifest = defineManifest({
  manifest_version: 3,
  name: "Local LLM Summary",
  version: "1.0.0",
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["src/contents/content.ts"]
    }
  ],
  background: {
    service_worker: "src/background/worker.ts"
  },
  action: {
    default_popup: "index.html",
  },
  permissions: ["storage", "tabs", "contextMenus"],
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
});