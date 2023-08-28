import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@styles': '/src/styles',
      '@variables': '/src/styles/variables.sass',
      '@images': '/src/assets',
    },
  }
});
