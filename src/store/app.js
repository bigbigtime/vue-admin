
const app = {
    state: {
        isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false
    },
    getters: {
        isCollapse: state => state.isCollapse
    },
    mutations: {  // 必须的  同步 没有回调处理事情
        SET_COLLAPSE(state) {
            state.isCollapse = !state.isCollapse;
            // html5本地储存
            sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));
        }
    },
    actions: {  // 可以回调处理事情 
        login(content, repuestData) {
            return new Promise((resolve, reject) => {
                Login(repuestData).then((response) => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}

export default app;
