import service from "@/utils/request";
/**
 * 列表
 */
export function GetList(data){
    return service.request({
        method: "post",
        url: "/news/getList/",
        data
        // data: data, 左边的data是变量名（key）后台接收的。右边的Data是接收的参数。如果两者都是同名的情况下，可以写成单一个即可（ES6的写法）
    })
}

/**
 * 新增信息
 */
export function AddInfo(data){
    return service.request({
        method: "post",
        url: "/news/add/",
        data
        // data: data, 左边的data是变量名（key）后台接收的。右边的Data是接收的参数。如果两者都是同名的情况下，可以写成单一个即可（ES6的写法）
    })
}
/**
 * 编辑
 */

/**
* 删除
*/

/**
 * 一级分类添加
 */
export function AddFristCategory(data){
    return service.request({
        method: "post",
        url: "/news/addFirstCategory/",
        data
        // data: data, 左边的data是变量名（key）后台接收的。右边的Data是接收的参数。如果两者都是同名的情况下，可以写成单一个即可（ES6的写法）
    })
}
/**
 * 获取分类
 */
export function GetCategory(data){
    return service.request({
        method: "post",
        url: "/news/getCategory/",
        data
        // data: data, 左边的data是变量名（key）后台接收的。右边的Data是接收的参数。如果两者都是同名的情况下，可以写成单一个即可（ES6的写法）
    })
}

/**
 * 删除分类
 */
export function DeleteCategory(data){
    return service.request({
        method: "post",
        url: "/news/deleteCategory/",
        data
        // data: data, 左边的data是变量名（key）后台接收的。右边的Data是接收的参数。如果两者都是同名的情况下，可以写成单一个即可（ES6的写法）
    })
}
/**
 * 修改分类
 */
export function EditCategory(data){
    return service.request({
        method: "post",
        url: "/news/editCategory/",
        data
        // data: data, 左边的data是变量名（key）后台接收的。右边的Data是接收的参数。如果两者都是同名的情况下，可以写成单一个即可（ES6的写法）
    })
}