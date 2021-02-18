import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import store from "@/Store";
import {i18n} from "@/plugins/i18n";
import { v4 as uuidv4 } from 'uuid'

Vue.use(uuidv4);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App)
}).$mount('#app');
