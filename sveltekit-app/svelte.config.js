// sveltekit-app/svelte.config.js
import adapter from '@sveltejs/adapter-node';  // Use Node adapter for Render deployment
import { sveltePreprocess } from 'svelte-preprocess';

export default {
  kit: {
    adapter: adapter(),
    alias: {
      $lib: './src/lib',
    }
  },
  preprocess: sveltePreprocess(),
};
