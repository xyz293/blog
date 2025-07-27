import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
    path:'/',
    redirect:'/mainpage'
    },
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
      component: () => import('../views/layout/main-page.vue'),
    },
    {
      path:'/add',
      component: () => import('../views/layout/add-page.vue')
    },
    {
      path:'/detail/:id',
      component: () => import('../views/layout/detail-page.vue')
    },
    {
      path:'/search/:detail',
      component: () => import('../views/layout/search-page.vue')
    },
    {
      path:'/my',
      component: () => import('../views/person/my-deatail.vue')
    },
    {
      path:'/talk',
      component: () =>import('../views/layout/talk.vue')
    },
    {
      path:'/talk/:id',
      component: () =>import('../views/layout/talk-detail.vue'),
      children:[{
        path:'comment',
        component: () =>import('../views/layout/talk-comment.vue')
      }]
    },
    {
      path:'/add_talk',
      component: () =>import('../views/layout/add-talk.vue')
    },
    {
      path:'/myphoto',
      component: () =>import('../views/person/my-photo.vue')
    },
    {
      path:'/friend',
      component : () =>import ('../views/layout/friend.vue')
    },
    {
      path:'/talkfriend',
       component : () =>import ('../views/layout/message-friend.vue')
    }
    
  ]
})

export default router
