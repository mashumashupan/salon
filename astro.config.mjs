import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), icon(), react()],
  output: "static",
  adapter: vercel(),
  vite: {
    ssr: {
      // 例: 必要な場合、壊れたパッケージがSSRの処理を行うのをスキップさせます
      external: ['astro-icon'],
    }
  }
});