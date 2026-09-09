import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 解决跨域
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 代理目标地址
        changeOrigin: true, // 开启代理
      }
    }
  }
})
