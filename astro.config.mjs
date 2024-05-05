import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  site: "https://ureshinosalon.com",
  integrations: [tailwind(), icon(), react()],
  output: "server",
  adapter: node({
    mode: "standalone"
  }),
  vite: {
    ssr: {
      // 例: 必要な場合、壊れたパッケージがSSRの処理を行うのをスキップさせます
      external: ['astro-icon']
    },
    optimizeDeps: {
      // 例: 必要な場合、壊れたパッケージがビルド時にスキップされるのを防ぎます
      exclude: ['fsevents']
    }
  }
});