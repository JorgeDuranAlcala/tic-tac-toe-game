import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/game',
      name: 'game',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      name: 'room',
      path: '/room/:roomName',
      component: () => import('../views/RoomView.vue')
    },
    {
      name: 'createRoom',
      path: '/createRoom',
      component: () => import('../views/CreateRoomView.vue')
    },
    {
      name: 'enterRoom',
      path: '/enterRoom',
      component: () => import('../views/EnterRoomView.vue')
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('../views/LoginView.vue')
    },
    {
      name: 'signup',
      path: '/signup',
      component: () => import('../views/SignUpView.vue')
    },
    {
      path: '/:pathMatch(.*)',
      redirect: { name: 'home' }
    }
  ]
})

export default router
