// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Particles from "vue3-particles"

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(Particles) // 注册粒子背景
app.mount('#app')
