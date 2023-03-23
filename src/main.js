import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import $ from 'jquery'

Vue.config.productionTip = false

import cookie from "js-cookie"
Vue.prototype.Cook = cookie

import axios from 'axios';
Vue.prototype.axios = axios;

//element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
Vue.use(ElementUI);
Vue.component(CollapseTransition.name, CollapseTransition)

//iview
import iView from 'iview';	
import 'iview/dist/styles/iview.css';
Vue.use(iView);

//echarts
import echarts from 'echarts';
import 'echarts-gl';


Vue.prototype.$echarts = echarts;
 import 'babel-polyfill'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
//设置后台项目名称
Vue.prototype.$WarmTable='table_war_exploded';