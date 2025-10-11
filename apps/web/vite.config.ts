import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  envDir: path.resolve(__dirname, '..', '..'),
  base: process.env.VITE_BASE || '/',
})
  
