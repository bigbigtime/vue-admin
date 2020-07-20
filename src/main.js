import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store/index.js";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./router/premit";
// 自定义全局组件
import "./icons";
// 全局方法引入
import global from './utils/global';
// 全局方法引入按钮权限
import { buttonPermission } from "./utils/buttonPermission";
// 自定义指令按钮权限
import "./utils/buttonPerm";
Vue.prototype.btnPerm = buttonPermission;
Vue.use(ElementUI);
Vue.use(VueCompositionApi);
Vue.use(global);

Vue.config.productionTip = false;

// runtime（运行模式）
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
