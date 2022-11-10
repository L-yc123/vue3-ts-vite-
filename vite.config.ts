import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  server:{
    proxy:{
      '/api': {
        ws: false,
        // 只需要改动target 改成后端接口的根路径
        // 我们把后端接口的根路径代理成立/api
        // 这种方式只存在开发阶段 如果项目上线了 后端会处理跨域
        target: 'https://api.shop.eduwork.cn/',
        secure:true,//开启https协议
        changeOrigin: true,
        autoRewrite: true
      }
    },
  }
})
