import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Data-Science-Projects/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
