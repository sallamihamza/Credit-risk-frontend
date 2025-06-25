import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Credit-risk-project',
  plugins: [react()],
  optimizeDeps: {
  exclude: ['lucide-react'],
  },
});
