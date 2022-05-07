import { createRouter, createWebHistory } from 'vue-router'

// 创建路由对象
export default createRouter({
  history: createWebHistory(),
  routes: [
    // 路由的默认路径
    {
      path: '/',
      redirect: "/empregister"
    },
    {
      path: '/empregister',
      name: 'Emprehister',
      component: () => import('./components/CreateNewUser.vue')
    },
    {
      path: '/empdata',
      component: () => import('./components/UserData.vue')
    },

    // 组别
    {
      path: '/serive',
      component: () => import('./components/departments/Serive.vue')
    },
    {
      path: '/security',
      component: () => import('./components/departments/Security.vue')
    },
    {
      path: '/engineering',
      component: () => import('./components/departments/Engineering.vue')
    },
    {
      path: '/cleaning',
      component: () => import('./components/departments/Cleaning.vue')
    },
  ]
})