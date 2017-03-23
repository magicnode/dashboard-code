import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { apiUrl } from '../../config/index'

import sendpayPng from '../assets/inc_ico_sen.png'
import promisePng from '../assets/inc_ico_pro.png'
import proxPng from '../assets/inc_ico_col.png'
import destinationPng from '../assets/inc_ico_to.png'
import dispatchPng from '../assets/inc_ico_dis.png'

Vue.use(Vuex)

const ApiStore = {
  income: apiUrl + '/StatisticalReports/send',
  courier: apiUrl + '/StatisticalReports/courier',
  courierdetail: apiUrl + '/StatisticalReports/courierdetails',
  brand: apiUrl + '/StatisticalReports/allBrand'
}

const store = new Vuex.Store({
  state: {
    title: '统计报表',
    userId: '2367',
    api: ApiStore,
    brand: [{
      'brand': '全部品牌',
      'id': 0
    }, {
      'brand': '全峰',
      'id': 6
    }, {
      'brand': '快捷',
      'id': 5
    }, {
      'brand': '速尔',
      'id': 4
    }, {
      'brand': '龙邦',
      'id': 3
    }],
    courierData: {},
    incomeQuery: {
      userId: '2367',
      startTime: '2017-01-15',
      endTime: '2017-03-15',
      brandId: '0',
      type: '0'
    },
    incomeData: {
      brandId: 0,
      type: 1,
      startTime: '',
      endTime: '',
      total: '',
      sendpay: {
        imgsrc: sendpayPng,
        name: '寄件费',
        total: 1000
      },
      proxmoney: {
        imgsrc: proxPng,
        name: '代收货款',
        total: 1000
      },
      destinationpay: {
        imgsrc: destinationPng,
        name: '到付件',
        total: 1000
      },
      dispatchpay: {
        imgsrc: dispatchPng,
        name: '派件费',
        total: 1000
      },
      promise: {
        imgsrc: promisePng,
        name: '保价费',
        total: 1000
      }
    }
  },
  mutations: {
    setTitle (state, title) {
      state.title = title
    },
    setUserId (state, id) {
      state.userId = id
    },
    setCourierUrl (state, { userId = '2367', startTime = '2017-01-15', endTime = '2017-03-15', brandId = '0' }) {
      state.api.courier = ApiStore.courier + '?userId=' + userId + '&startTime=' + startTime + '&endTime=' + endTime + '&brandId=' + brandId
    },

    setIncomeQuery (state, { userId, startTime, endTime, brandId, type }) {
      let query = state.incomeQuery
      userId = !userId ? query.userId : userId
      startTime = !startTime ? query.startTime : startTime
      endTime = !endTime ? query.endTime : endTime
      brandId = !brandId ? query.brandId : brandId
      type = !type ? query.type : type
      state.incomeQuery = {userId, startTime, endTime, brandId, type}
    },

    getCourierData (state, { userId = '2367', startTime = '2017-01-15', endTime = '2017-03-15', brandId = '0' }) {
      const url = ApiStore.courier + '?userId=' + userId + '&startTime=' + startTime + '&endTime=' + endTime + '&brandId=' + brandId
      axios.get(url).then((res) => {
        if (res.status === 200) {
          state.courierData = res.data
        }
      })
    },

    getIncomeData (state) {
      const query = state.incomeQuery
      const url = ApiStore.income + '?userId=' + query.userId + '&startTime=' + query.startTime +
        '&endTime=' + query.endTime + '&brandId=' + query.brandId + '&type=' + query.type
      axios.get(url).then((res) => {
        if (res.status === 200) {
          const data = res.data
          console.log('url', url)
          console.log('data', data)
          let incomeData = state.incomeData
          incomeData.startTime = data.startTime
          incomeData.endTime = data.endTime
          incomeData.sendpay.total = data.num1
          incomeData.proxmoney.total = data.num2
          incomeData.destinationpay.total = data.num3
          incomeData.dispatchpay.total = data.num4
          incomeData.promise.total = data.num5
          incomeData.total = data.num1 + data.num2 + data.num3 + data.num4 + data.num5
        }
      })
    },

    getBrand (state) {
      const url = ApiStore.brand + '?userId=' + state.userId
      axios.get(url).then((res) => {
        if (res.status === 200) {
          state.brand = res.data
          state.brand.unshift({brand: '全部品牌', id: '0'})
          // console.log('brand', state.brand)
        }
      })
    }
  },
  actions: {
    SET_TITLE (context) {
      context.commit('setTitle')
    },

    SET_INCOME_QUERY (context, object) {
      context.commit('setIncomeQuery', object)
    },

    GET_COURIER_DATA (context, object) {
      context.commit('getCourierData', object)
    },

    GET_INCOME (context, object) {
      context.commit('getIncomeData', object)
    },

    GET_BRAND (context) {
      context.commit('getBrand')
    }
  },
  getters: {
    title (state) {
      return state.title
    }
  }
})

export default store
