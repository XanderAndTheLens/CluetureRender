import adapter from '@sveltejs/adapter-vercel';
import { sveltePreprocess } from 'svelte-preprocess';



export default {
  kit: {
    adapter: adapter(), // Vercel adapter for deployment
  },
  preprocess: sveltePreprocess(),
};
