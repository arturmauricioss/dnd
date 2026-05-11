import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../../'),
      '@components': path.resolve(__dirname, '../../components'),
      '@features': path.resolve(__dirname, '../../features'),
      '@systems': path.resolve(__dirname, '../../systems'),
    },
  },
  server: {
    port: 5173,
  },
})