import Vue from "vue";
import App from "./App.vue";

import xyui from '../packages';
Vue.use(xyui);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
