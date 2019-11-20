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
Vue.use(ElementUI);
Vue.use(VueCompositionApi);
Vue.config.productionTip = false;

// runtime（运行模式）
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
