import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 确保路径和导出方式正确（默认导出用默认引入）

createApp(App)
  .use(router)       // 先注册路由
  .mount('#app')     // 后挂载