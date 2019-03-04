import Axios from 'axios';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;
// get the user's token from storage if they have one so it can be used for authentication
const token = localStorage.getItem('token');
if (token) {
  Axios.defaults.headers.Authorization = token;
}
Vue.prototype.$axios = Axios;
Vue.use(VueMaterial);

new Vue({
  render: h => h(App),
}).$mount('#app');
