import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Foot from './components/Foot'
import Header from './components/Header'
import mintUI from 'mint-ui'
import elementUI from 'element-ui'
import Distpicker from 'v-distpicker'
import request from './request/interceptor'
import Cookies from 'js-cookie'

axios.defaults.baseURL='/api';
let token = Cookies.get('Authorization')
axios.defaults.headers.get['Authorization'] = token;
axios.defaults.headers.post['Authorization'] = token;

Vue.prototype.request = request
Vue.prototype.axios=axios;
Vue.prototype.Cookies=Cookies;
Vue.component("foot",Foot)
Vue.component('Head',Header)
Vue.component('v-distpicker', Distpicker)
//导入elementui的css样式并注册为vue组件
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(elementUI)
//导入MintUI下的css样式
import 'mint-ui/lib/style.min.css'
Vue.use(mintUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
