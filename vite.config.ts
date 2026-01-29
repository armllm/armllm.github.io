import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  build: {
    outDir: 'dist',
    // Use esbuild for minification (faster, included with Vite)
    minify: 'esbuild',
    // Chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'particles': ['@tsparticles/react', '@tsparticles/slim'],
        },
        // Asset file naming for better caching
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      }
    },
    // Target modern browsers for smaller bundles
    target: 'es2020',
    // No source maps in production
    sourcemap: false,
    // CSS code splitting
    cssCodeSplit: true,
    // Chunk size warning limit
    chunkSizeWarningLimit: 500,
  },
  // Esbuild options
  esbuild: {
    drop: ['console', 'debugger'], // Remove console.logs in production
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'clsx'],
  },
  // Server settings for development
  server: {
    open: true,
    cors: true,
  },
  // Preview settings
  preview: {
    port: 4173,
  }
})
