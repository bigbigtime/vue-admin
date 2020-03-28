import { GetCategory, GetCategoryAll } from "@/api/news";
import { reactive } from "@vue/composition-api";
import service from "@/utils/request";
export function common(){
    const categoryItem = reactive({
        item: []
    });
    /**
     * 获取分类
     */
    const getInfoCategory = () => {
        GetCategory({}).then(response => {
            categoryItem.item = response.data.data.data
        }).catch(error => {})
    }

    /**
     * 获取全部分类
     */
    const getInfoCategoryAll = () => {
        GetCategoryAll({}).then(response => {
            categoryItem.item = response.data.data
        }).catch(error => {})
    }
    
    return  {
        getInfoCategory,
        getInfoCategoryAll,
        categoryItem
    }
}

/**
 * 获取七牛云token
 * 
 * @param {
 *  AK: 七牛云的密钥AK；type: string
 *  SK: 七牛云的密钥AK；type: string
 *  buckety: 七牛云储存空间名称；type: string
 * } params 
 * 
 */
export function QiniuToKen(data){
    return service.request({
        method: "post",
        url: "/uploadImgToken/",
        data
    })
}

/**
 * 请求表格数据
 */
export function loadTableData(params){
    return service.request({
        method: params.method || "post",
        url: params.url,
        data: params.data || {}
    })
}

/**
 * 获取省市区街关联
 * 
 * @param {
    *  
    * } params 
    * 
    */
export function GetCityPicker(data){
    return service.request({
        method: "post",
        url: "/cityPicker/",
        data
    })
}

