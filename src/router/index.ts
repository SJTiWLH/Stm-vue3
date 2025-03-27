import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import IndexView from '@/views/IndexView.vue'

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
          component: IndexView,
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('../views/AboutView.vue'), // 懒加载方式@/views/AboutView.vue
        },
        {
          path: '/stm_tb',
          name: 'stm_tb',
          component: () => import('@/views/stm_tb.vue'),
        },

      ],
    },
    {
      path: '/:xxx(.*)*',
      name: 'ErrorPage',
      component: () => import('@/views/ErrorPage.vue'),
    }

  ],
})

export default router
