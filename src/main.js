import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/scss/common.scss'
import '@/assets/scss/arcgis.scss'
import '@/assets/scss/antd.scss'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import esriConfig from "@arcgis/core/config";
esriConfig.assetsPath = "./assets";
import '@arcgis/core/assets/esri/themes/light/main.css';


window.MAP ={};

Vue.use(Antd);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
