import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { apiUrl } from '../../config/index'

Vue.use(Vuex)

const ApiStore = {
  courier: apiUrl + '/StatisticalReports/courier',
  courierdetail: apiUrl + '/StatisticalReports/courierdetails'
}

const store = new Vuex.Store({
  state: {
    title: '统计报表',
    userId: '2314',
    api: ApiStore,
    courierData: {}
  },
  mutations: {
    setTitle (state, title) {
      state.title = title
    },
    setUserId (state, id) {
      state.userId = id
    },
    setCourierUrl (state, {userId = '2367', startTime = '2017-01-15', endTime = '2017-03-15', brandId = '0'}) {
      state.api.courier = ApiStore.courier + '?userId=' + userId + '&startTime=' + startTime + '&endTime=' + endTime + '&brandId=' + brandId
    },

    getCourierData (state, {userId = '2367', startTime = '2017-01-15', endTime = '2017-03-15', brandId = '0'}) {
      const url = ApiStore.courier + '?userId=' + userId + '&startTime=' + startTime + '&endTime=' + endTime + '&brandId=' + brandId
      axios.get(url).then((res) => {
        console.log('res', res)
        if (res.status === 200) {
          state.courierData = res.data
        }
      })
    }
  },
  actions: {
    SET_TITLE (context) {
      context.commit('setTitle')
    },

    GET_COURIER_DATA (context, object) {
      context.commit('getCourierData', object)
    }
  },
  getters: {
    title (state) {
      return state.title
    }
  }
})

export default store
