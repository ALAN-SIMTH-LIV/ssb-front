import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // 解决 编译时标志
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
  },
  // 配置别名
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
