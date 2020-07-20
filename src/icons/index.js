import Vue from "vue";
import SvuIcon from "./SvgIcon";
Vue.component("svg-icon", SvuIcon);
const req = require.context('./svg', false, /\.svg$/); // 获取当前svg目录所有为.svg结尾的文件
const requireAll = (requireContext) => {
    return requireContext.keys().map(requireContext);  // 解析获取的.svg文件的文件名称，并返回
};
requireAll(req);