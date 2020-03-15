import service from "@/utils/request";
/**
 * 列表
 */
export function GetRole(data = {}){
    return service.request({
        method: "post",
        url: "/role/",
        data
    })
}

/**
 * 列表
 */
export function UserAdd(data = {}){
    return service.request({
        method: "post",
        url: "/user/add/",
        data
    })
}

/**
 * 删除用户
 */
export function UserDel(data){
    return service.request({
        method: "post",
        url: "/user/delete/",
        data
    })
}

/**
 * 用户禁启用
 */
export function UserActives(data){
    return service.request({
        method: "post",
        url: "/user/actives/",
        data
    })
}


/**
 * 用户编辑
 */
export function UserEdit(data){
    return service.request({
        method: "post",
        url: "/user/edit/",
        data
    })
}