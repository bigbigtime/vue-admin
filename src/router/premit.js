import router from "./index";
import store from "../store/index";

import { getToKen, removeToKen, removeUserName } from "@/utils/app";

const whiteRouter = ['/login']; // indexOf方法，判断数组中是否存在指定的某个对象，如果不存在，则返回-1

// 路由守卫
router.beforeEach((to, from, next) => {
    if(getToKen()){
        if(to.path === '/login'){
            removeToKen();
            removeUserName();
            store.commit("app/SET_TOKEN", '');
            store.commit("app/SET_USERNAME", '');
            next();
        }else{
            // 获取用户的色
            // 动态分配路由权限
            next();
        }
        /**
         * 1、to = /console
         * 2、to = /index
         */
        // 路由动态添加，分配菜单，每个角色分配不同的菜单
    }else{
        if(whiteRouter.indexOf(to.path) !== -1) {  // 存在
            next();  // to
        }else{
            next('/login')  // 路由指向
        }
        /**
         * 1、直接进入index的时候，参数to被改变成了 "/index"，触发路由指向，就会跑beforeEach
         * 2、再一次 next 指向了login，再次发生路由指向，再跑beforeEach，参数的to被改变成了"/login"
         * 3、白名单判断存在，则直接执行next()，因为没有参数，所以不会再次beforeEach。
         */
    }
  })