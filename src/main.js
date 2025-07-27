// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import persist from 'pinia-plugin-persistedstate'
import Particles from "vue3-particles"
import { createPinia } from 'pinia'
import VueLazyLoad from 'vue3-lazyload'

const app = createApp(App)

const pinia = createPinia()

pinia.use(persist)

app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.use(Particles)
app.use(VueLazyLoad, {
  loading: 'loading.gif', // 加载中占位图
  error: 'error.png',     // 加载失败占位图
  attempt: 3
})


app.mount('#app')
