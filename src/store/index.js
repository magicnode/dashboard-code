import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import ApiStore from 'ApiStore'
import { Toast } from 'mint-ui'
import window from 'window'

import courier from './modules/courier'
import dispatch from './modules/dispatch'
import income from './modules/income'
import * as user from './modules/user'

import sendpayPng from '../assets/inc_ico_sen.png'
import promisePng from '../assets/inc_ico_pro.png'
import proxPng from '../assets/inc_ico_col.png'
import destinationPng from '../assets/inc_ico_to.png'
import dispatchPng from '../assets/inc_ico_dis.png'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    courier,
    income,
    dispatch,
    user
  },
  state: {
    title: '统计报表',
    brands: [{
      'brand': '全部品牌',
      'id': 0
    }],
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
  actions: {
    setBrands ({commit}) {
      const url = ApiStore.brand + '?userId=' + window.localStorage.userId
      axios.get(url).then(rs => {
        if (rs.status === 200) {
          let brands = rs.data
          brands.unshift({brand: '全部品牌', id: '0'})
          window.localStorage.removeItem('brands')
          window.localStorage.setItem('brands', JSON.stringify(brands))
          commit('SET_BRANDS', {brands})
        }
      })
    },
    SET_INCOME_QUERY (context, object) {
      context.commit('setIncomeQuery', object)
    },
    GET_COURIER_DATA (context, object) {
      let instance = axios.create({
        timeout: 2000
      })
      const url = ApiStore.courier + '?userId=' + object.userId + '&startTime=' + object.startTime + '&endTime=' + object.endTime + '&brandId=' + object.brandId
      instance.get(url)
        .then((res) => {
          if (res.status === 200) {
            const courier = res.data
            context.commit('getCourierData', courier)
          } else {
            Toast({
              message: '数据获取失败!'
            })
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    GET_INCOME (context, object) {
      context.commit('getIncomeData', object)
    },
    GET_BRAND (context) {
      context.commit('getBrand')
    }
  },
  getters: {
    getBrands: state => {
      let brands = state.brands
      if (brands.length < 2) {
        const local = window.localStorage.getItem('brands')
        brands = JSON.parse(local)
      }
      return brands
    }
  },
  mutations: {
    SET_TITLE (state, { title }) {
      state.title = title
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
    getCourierData (state, { courier }) {
      state.courier = courier
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
    SET_BRANDS (state, {brands}) {
      state.brands = brands
    }
  }
})

export default store
