import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VueSwal from 'vue-swal'

import VueApexCharts from 'vue-apexcharts'

Vue.component('apexchart', VueApexCharts)

// Vue.use(ApexCharts)
 
Vue.use(VueSwal)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
