// sveltekit-app/svelte.config.js
import adapter from '@sveltejs/adapter-node';
import { sveltePreprocess } from 'svelte-preprocess';

export default {
  kit: {
    adapter: adapter(), // Switch to Node adapter for Render
  },
  preprocess: sveltePreprocess(),
};
