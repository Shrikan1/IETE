import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    base: '/IETE/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          'vendor-motion': ['framer-motion'],
          'vendor-gsap': ['gsap'],
          'vendor-lottie': ['lottie-react'],
          'vendor-ui': ['lucide-react', 'react-parallax-tilt'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
    // Compress assets
    assetsInlineLimit: 4096,
    cssMinify: true,
    minify: 'esbuild',
    target: 'es2015',
  },
})
