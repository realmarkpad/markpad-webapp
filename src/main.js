import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import hljs from "highlight.js";

window.hljs = hljs;

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
