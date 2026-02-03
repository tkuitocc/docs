// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  image: {
    domains: [
      'avatars.githubusercontent.com',
      'raw.githubusercontent.com',
      'user-images.githubusercontent.com',
      'media.githubusercontent.com',
    ],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});