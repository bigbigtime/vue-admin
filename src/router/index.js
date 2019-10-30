import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "login",
      hidden: true
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/Login/index.vue"),
      hidden: true
    },
    {
      path: "/console",
      name: "Console",
      meta: {
        name: '控制台'
      },
      component: () => import("../views/Layout/index.vue"),
      children: [
        {
          path: "/console",
          name: "Console",
          meta: {
            name: '控制台'
          },
          component: () => import("../views/Console/index.vue")
        }
      ]
    }
  ]
});
