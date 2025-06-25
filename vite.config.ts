import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Credit-risk-frontend/',
  plugins: [react()],
  optimizeDeps: {
  exclude: ['lucide-react'],
  },
});
