import { GetCategory } from "@/api/news";
const actions = {  // 可以回调处理事情 
    getInfoCategory(content, repuestData) {
        return new Promise((resolve, reject) => {
            GetCategory({}).then((response) => {
                resolve(response.data.data.data)
            }).catch(error => {
                reject(error)
            })
        })
    }
}


export default {
    namespaced: true,
    actions
};
