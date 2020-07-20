import { MessageBox } from 'element-ui';
export default {
  install (Vue, options) {
    // 注册全避方法
    Vue.prototype.confirm = (params) => {
        MessageBox.confirm(params.content,  params.tip || "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: params.type || "warning",
                center: true
            }).then(() => {
                params.fn && params.fn(params.id)
            }).catch(() => {
                // root.$message({
                //     type: 'info',
                //     message: '已取消删除'
                // });
            });
        }
    }
}
// exports.install = function(Vue, options) {
//     Vue.prototype.$back = function() { //全局函数1
//         xxx
//     };
//     Vue.prototype.$pushH = function() { //全局函数2
//         xxx
//     };
//     Vue.prototype.$pushHN = function() { //全局函数3
//         xxx
//     };
// };
// vue插件
