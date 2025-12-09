import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './', // Essential for Electron apps to load assets via file:// protocol
  server: {
    port: 3000, // Matches the port the Electron main process listens to in development
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      // Externalize electron to allow usage of Node.js/Electron APIs in renderer
      external: ['electron'],
    },
  },
  optimizeDeps: {
    // Prevent Vite from pre-bundling electron
    exclude: ['electron'],
  },
})