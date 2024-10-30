import adapter from '@sveltejs/adapter-node';
import { sveltePreprocess } from 'svelte-preprocess';

export default {
  kit: {
    adapter: adapter({
      // Pass the port through environment variable to ensure Render detects it
      env: {
        port: process.env.PORT || 3000
      }
    })
  },
  preprocess: sveltePreprocess(),
};
