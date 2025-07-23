import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/resiger',
      component: () => import('../views/login/resiger.vue')
    },
    {
      path:'/login',
      component: () => import('../views/login/login.vue')
    },
    {
      path:'/mainpage',
      component: () => import('../views/layout/main-page.vue')
    },
    {
      path:'/add',
      component: () => import('../views/layout/add-page.vue')
      
    
    }
    
  ]
})

export default router
