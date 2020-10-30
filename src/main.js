import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import 'theme/index.css';
import './utils/http'
import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import scroll from 'vue-seamless-scroll'
import Moment from 'moment'
import {Message} from 'element-ui'
import { Notification } from 'element-ui';
import {CodeToTag} from './cookie';
// import cookie from 'vue-cookie'; 
import Cookies from 'js-cookie'

import 'babel-polyfill';
import './assets/iconfont/iconfont.css'
import VueAMap from 'vue-amap';
import BaiduMap from 'vue-baidu-map';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import '../node_modules/swiper/dist/css/swiper.css'
import VueFullpage from 'vue-fullpage.js'
Vue.use(VueFullpage)
Vue.use(VueAwesomeSwiper)

Vue.use(VueAMap);
Vue.use(Cookies);

Vue.use(BaiduMap, {
      /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
      ak: 'jv12vuZqCBG30jV4FBDdKrSxcmG4lG0h'
})
VueAMap.initAMapApiLoader({
  key: '594f89b2e0fb82adadc7113372876925',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geolocation'],
  v: '1.4.4'
})
Vue.use(scroll)
import vuescroll from 'vuescroll';
// import BaiduMap from 'vue-baidu-map'
Vue.use(ElementUI);
// Vue.prototype.$Cookies=Cookies;
Vue.prototype.$moment = Moment;

Vue.prototype.$message = Message
Vue.prototype.$notification = Notification
// Vue.prototype.$cookie = Cookies;
Vue.prototype.$CodeToTag = {
  CodeToTag
}
// 定义全局时间戳过滤器
Vue.filter('formatDate', function(value) {
  var timestamp = (new Date()).getTime()-24*60*60*1000
  var timestampOne = (new Date()).getTime()-48*60*60*1000
  if(value > timestamp) {
    return Moment(value).format('今天'+'HH:mm');
  }
  else if(value > timestampOne && value < timestamp) {
    return Moment(value).format('昨天'+'HH:mm');
  }
  else{
    return Moment(value).format('YYYY-MM-DD');
  }
});
Vue.filter('formatDateOne', function(value) {
  return Moment(value).format('YYYY-MM-DD')
})
Vue.filter('formatDateTwo', function(value) {
  return Moment(value).format('YYYY-MM-DD HH:mm')
})
Vue.filter('formatDateThree', function(value) {
  return Moment(value).format('YYYY-MM-DD HH:mm')
})
Vue.config.productionTip = false;
Vue.use(vuescroll, {
  ops: {
    bar: {
      onlyShowBarOnScroll: false,
      background: '#c1c1c1',
    }
  },
  name: 'Scroll'
});
// Vue.use(BaiduMap, {
//   // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
//   ak: 'oGGWwB8nLwKnSrVveDmVrCcoBNB8E1Th'
// })


export default new Vue({
  Message,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
