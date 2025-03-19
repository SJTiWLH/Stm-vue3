import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import indexView from '@/views/indexView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AppLayout,    // 父组件,显示整体布局，侧边栏和顶部栏，主题部分是子组件在下面的children中
      children: [
        {
          path: '',
          name: 'index',
          component: indexView,
        },
        {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/AboutView.vue'), // 懒加载方式
        },
      ],
    },
    {
      path: '/:xxx(.*)*',
      name: 'ErrorPage',
      component: () => import('../views/ErrorPage.vue'),
    }

  ],
})

export default router
