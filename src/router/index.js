import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/views/Index'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Index',
    component: Index,
    children: [{
      path: '/list',
      name: 'List',
      component: require('../views/List')
    }, {
      path: '/dispatch',
      name: 'Dispatch',
      component: require('../views/Dispatch')
    }, {
      path: '/dispatch/detail',
      name: 'DispatchDetail',
      component: require('../views/DispatchDetail')
    }, {
      path: '/send',
      name: 'Send',
      component: require('../views/Send')
    }, {
      path: '/income',
      name: 'Income',
      component: require('../views/Income')
    }, {
      path: '/income/genera',
      name: 'IncomeGenera',
      component: require('../views/IncomeGenera')
    }, {
      path: '/income/detail',
      name: 'IncomeDetail',
      component: require('../views/IncomeDetail')
    }, {
      path: '/courier',
      name: 'Courier',
      component: require('../views/Courier')
    }, {
      path: '/courier/detail',
      name: 'CourierDetail',
      component: require('../views/CourierDetail')
    }, {
      path: '/courier/express',
      name: 'CourierExpress',
      component: require('../views/CourierExpress')
    }, {
      path: '/courier/orderdetail',
      name: 'OrderDetail',
      component: require('../views/OrderDetail')
    }]
  }, {
    path: '/chart',
    name: 'Chart',
    component: require('../components/Chart')
  }]
})
