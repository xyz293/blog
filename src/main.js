// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import persist from 'pinia-plugin-persistedstate'
import Particles from "vue3-particles"
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()
pinia.use(persist)

app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.use(Particles) // 注册粒子背景
app.mount('#app')
