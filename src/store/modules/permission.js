import { getUserRole } from "@/api/login";
import { defaultRouterMap, asnycRouterMap } from "@/router"
const state = {
    roles: [],
    allRouters: defaultRouterMap,
    addRouters: [],
}

const getters = {
    roles: state => state.roles,
    allRouters: state => state.allRouters,  // 所有的
    addRouters: state => state.addRouters,  // 匹配的
}

const mutations = {  // 必须的  同步 没有回调处理事情
    SET_ROLES(state, value){
        state.roles = value;
    },
    SET_ROUTER(state, router) {
        state.addRouters = router
        state.allRouters = defaultRouterMap.concat(router)
    }
}

const actions = {  // 可以回调处理事情 
    /**
     * 获取用户角色 
     * @param {*} param0
     * @param {*} repuestData 
     */
    getRoles({ commit }, repuestData) {
        return new Promise((resolve, reject) => {
            getUserRole().then(response => {
                let role = response.data.data;
                commit('SET_ROLES', role);
                resolve(role);
            })
        })
    },
    /**
     * 创建动态路由
     */
    createRouter({ commit }, data){
        return new Promise((resolve, reject) => {
            // ["infoSystem", "userSystem"]
            let role = data;
            // 超管的状态
            let addRouters = []
            if(role.includes('admin')) {
                addRouters = asnycRouterMap
            }else{ // 普通管理员
                addRouters = asnycRouterMap.filter(item => {
                    // es6 includes
                    if(role.includes(item.meta.system)) {
                        return item;
                    }
                })
            }
            // 更新路由
            commit('SET_ROUTER', addRouters);
            resolve()
        })
    }
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
