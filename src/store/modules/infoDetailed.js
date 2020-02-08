const state = {
    /**
     * 已经储存了值，不刷新页面的时候，值一直存在vuex
     * 刷新页面，就会去取session的值，赋值给变量
     * key: value
     * key: value
     */
    id: "" || sessionStorage.getItem('infoId'),
    title: "" || sessionStorage.getItem('infoTitle')
}

const getters = {
    infoId: state => state.id,
    infoTitle: state => state.title
}

const mutations = {  // 必须的  同步 没有回调处理事情
    UPDATE_STATE_VALUE(state, params){
        for(let key in params) {
            // 储存值
            state[key] = params[key].value
            // 是否存储session
            if(params[key].session) {
                sessionStorage.setItem(params[key].sessionKey, params[key].value);
            }
        }
    },


//    SET_ID(state, value){
//     state.id = value
//     // html5本地储存
//     sessionStorage.setItem('infoId', value);
//     console.log(state.id)
//    },
//    SET_TITLE(state, value){
//     state.title = value
//     // html5本地储存
//     sessionStorage.setItem('infoTitle', value);
//     console.log(state.title)
//    }
}

const actions = {  // 可以回调处理事情 
    
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
