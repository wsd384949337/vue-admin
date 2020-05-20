import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/guild',
    component: Layout,
    name: 'Guild',
    meta: { title: '公会管理', icon: 'example' },
    children: [
      {
        path: 'member',
        name: 'member',
        component: () => import('@/views/guild/member'),
        meta: { title: '公会成员', icon: 'user' }
      },
      {
        path: 'join',
        name: 'join',
        component: () => import('@/views/guild/join'),
        meta: { title: '申请加入', icon: 'eye-open' }
      },
      {
        path: 'quit',
        name: 'quit',
        component: () => import('@/views/guild/quit'),
        meta: { title: '申请退出', icon: 'eye' }
      },
      {
        path: 'sort',
        name: 'sort',
        component: () => import('@/views/guild/sort'),
        meta: { title: '分组管理', icon: 'tree' }
      }
    ]
  },
  // {
  //   path: '/turnover',
  //   component: Layout,
  //   name: 'turnover',
  //   meta: { title: '公会列表', icon: 'example' },
  //   children: [
  //     {
  //       path: 'turnover',
  //       name: 'turnover',
  //       component: () => import('@/views/guild/turnover'),
  //       meta: { title: '公会列表', icon: 'form' }
  //     }
  //   ]
  // },
  {
    path: '/system',
    component: Layout,
    name: 'system',
    meta: { title: '设置', icon: 'example' },
    children: [
      {
        path: 'password',
        name: 'Password',
        component: () => import('@/views/system/password'),
        meta: { title: '修改密码', icon: 'password' }
      },
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/system/password'),
        meta: { title: '联系客服', icon: 'password' }
      }
    ]
  }

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
