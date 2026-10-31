import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const pages = ['index', 'men', 'women', 'kids', 'sale', 'product', 'contact', 'cart', 'login', 'signup', 'admin-login', 'admin'];

export default defineConfig({
  build: {
    rollupOptions: {
      input: Object.fromEntries(pages.map(page => [page, resolve(root, `${page}.html`)])),
    },
  },
});
