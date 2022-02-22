import Vue from "vue";
import App from "./App.vue";

import cstarui from '../packages';
Vue.use(cstarui);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
