import { Login } from "@/api/login";
import { setToKen, removeToKen, removeUserName, setUserName, getUserName } from "@/utils/app";
const state = {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
    to_ken: '',
    username: getUserName() || ''
}

const getters = {
    isCollapse: state => state.isCollapse
}

const mutations = {  // 必须的  同步 没有回调处理事情
    SET_COLLAPSE(state) {
        state.isCollapse = !state.isCollapse;
        // html5本地储存
        sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));
    },
    SET_TOKEN(state, value){
        state.to_ken = value
    },
    SET_USERNAME(state, value){
        state.username = value
    }
}

const actions = {  // 可以回调处理事情 
    login({ commit }, repuestData) {
        return new Promise((resolve, reject) => {
            Login(repuestData).then((response) => {
                console.log(response)
                let data = response.data.data
                // 普通的
                // content.commit('SET_TOKEN', data.toKen);
                // content.commit('SET_USERNAME', data.username);
                // 解构的
                commit('SET_TOKEN', data.token);
                commit('SET_USERNAME', data.username);
                setToKen(data.token);
                setUserName(data.username);
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    exit({ commit }){
        return new Promise((resolve, reject) => {
            removeToKen();
            removeUserName();
            commit('SET_TOKEN', '');
            commit('SET_USERNAME', '');
            resolve();
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
