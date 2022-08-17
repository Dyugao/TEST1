import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from './store'
import TypeNav from '@/components/TypeNav/index.vue'
import Pagination from '@/components/Pagination'

import {reqgetCategoryList} from '@/api'
reqgetCategoryList()
import '@/mock/mockServe'
import 'swiper/css/swiper.css'
import * as API from '@/api'
import { Button, MessageBox , Form,FormItem,Input} from 'element-ui';
//引入懒加载图片
import VueLazyload from 'vue-lazyload'

// 三级联动组件---全局组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Pagination.name,Pagination)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

Vue.use(VueLazyload,{
  loading:require('@/assets/image/1.gif')
})

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //全局事件总线$bus配置
  beforeCreate(){
   Vue.prototype.$bus=this,
   //将api上的所有数据绑定到原型上
   Vue.prototype.$API=API
  },
  router,
  store
}).$mount('#app')
