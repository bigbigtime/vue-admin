import Vue from "vue";
import SvuIcon from "./SvgIcon";
Vue.component("svg-icon", SvuIcon);
const req = require.context('./svg', false, /\.svg$/);
const requireAll = (requireContext) => {
    return requireContext.keys().map(requireContext)
};
requireAll(req);