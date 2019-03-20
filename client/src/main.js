import Vue from 'vue';
import Axios from 'axios';
import Bars from 'vuebars';
import VueMaterial from 'vue-material';
import App from './App.vue';
import store from './store/index';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

Vue.config.productionTip = false;

const token = localStorage.getItem('token');
if (token) {
  Axios.defaults.headers.Authorization = token;
}
Vue.prototype.$axios = Axios;

Vue.use(Bars);
Vue.use(VueMaterial);

Vue.material.locale.dateFormat = 'dd/MM/yyyy';

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
