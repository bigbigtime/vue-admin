import store from "../store/index";
export function buttonPermission(permission){
    const button = store.getters["app/buttonPermission"];
    return button.indexOf(permission) != -1; //
}
// 2.0