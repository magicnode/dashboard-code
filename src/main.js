// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import MintUI from 'mint-ui'
import axios from 'axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import App from './App'
import router from './router'
import store from './store'
import {getBrandType, dateFormate, defaultCourierImg, handleNull, expresstype, expressoperation, expressstate, failImg} from './filters'

import Chart from './components/Chart'

import 'mint-ui/lib/style.css'

Vue.use(VueResource)
Vue.use(MintUI)
Vue.use(VueAwesomeSwiper)

Vue.component('dh-chart', {
  prop: ['data'],
  template: Chart
})

Vue.filter('brand', getBrandType)
Vue.filter('datestr', dateFormate)
Vue.filter('courierimg', defaultCourierImg)
Vue.filter('handlenull', handleNull)
Vue.filter('expresstype', expresstype)
Vue.filter('expressoperation', expressoperation)
Vue.filter('expressstate', expressstate)
Vue.filter('failimg', failImg)

Vue.axios = axios
Vue.config.productionTip = false

router.afterEach((to, from) => {
  if (to.path === '/') {
    const query = to.query
    return router.push({'path': 'list', 'query': query})
  }
})

/* eslint-disable no-new */
/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  http: {
  	headers: {
  		'Access-Control-Allow-Origin': '*'
  	}
  }
})
