import Vue from "vue/dist/vue.js";
import App from "./App";
import router from "./router";
import Axios from "axios";
import ApiService from "./services/api.service";
import { TokenService } from "./services/storage.service";

Vue.prototype.$http = Axios;
Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});

ApiService.init("http://localhost:3000");
if (TokenService.getToken()) {
  ApiService.setHeader();
}
