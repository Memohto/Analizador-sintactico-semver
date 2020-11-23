import Vue from 'vue';
import App from './App.vue';
import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { Network } from "vue-vis-network";
import "vue-vis-network/node_modules/vis-network/dist/vis-network.css";

Vue.use(BootstrapVue);
Vue.component('network', Network);

new Vue({
  render: h => h(App),
}).$mount('#app')
