import Vue from "vue/dist/vue.js";
import App from "./App";
import router from "./router";
import Axios from "axios";

Vue.prototype.$http = Axios;

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
