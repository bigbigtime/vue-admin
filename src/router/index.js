import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

/**
 * 1、系统分配
 * 2、角色分配
 * 
 * 工作，动态路由到底是由后台返回出来，还是由前端
 */

/**
 * 
 * 1、默认路由
 * 2、动态路由
 */


// 引入布局组件
import Layout from '@/views/Layout'
/**
 * 默认路由
 */
export const defaultRouterMap = [
  {
    path: "/",
    redirect: "login",
    hidden: true,
    meta: {
      name: "主页"
    }
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    meta: {
      name: "登录"
    },
    component: () => import("../views/Login/index.vue")
  },
  {
    path: "/console",
    name: "Console",
    redirect: "index",
    meta: {
      name: "控制台",
      icon: 'console'
    },
    component: Layout,
    children: [
      {
        path: "/index",
        name: "Index",
        meta: {
          name: "首页"
        },
        component: () => import("../views/Console/index.vue")
      }
    ]
  }
]

export default new Router({
  routes: defaultRouterMap
});

/**
 * 动态路由
 */
export const asnycRouterMap = [
  {
    path: "/info",
    name: "Info",
    meta: {
      system: 'infoSystem',
      name: "信息管理",
      icon: 'info'
    },
    component: Layout,
    children: [
      {
        path: "/infoIndex",
        name: "InfoIndex",
        meta: {
          name: "信息列表"
        },
        component: () => import("../views/Info/index.vue")
      },
      {
        path: "/infoCategory",
        name: "InfoCategory",
        meta: {
          name: "信息分类"
        },
        component: () => import("../views/Info/category.vue")
      },
      {
        path: "/infoDetailed",
        name: "InfoDetailed",
        hidden: true,
        meta: {
          name: "信息详情"
        },
        component: () => import("../views/Info/detailed.vue")
      }
    ]
  },
  /**
   * 用户管理
   */
  {
    path: "/user",
    name: "User",
    meta: {
      system: 'userSystem', // 自定义key
      name: "用户管理",
      icon: 'user'
    },
    component: Layout,
    children: [
      {
        path: "/userIndex",
        name: "UserIndex",
        meta: {
          name: "用户列表"
        },
        component: () => import("../views/User/index.vue")
      }
    ]
  }
]