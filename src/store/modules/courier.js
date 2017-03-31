import ApiStore from 'ApiStore'
import axios from 'axios'
import window from 'window'

import { Toast } from 'mint-ui'
import { GetDateFormate } from 'helpers'
import * as types from '../mutation-types'

const state = {
  courier: null,
  courierquery: {
    brandId: 0,
    startTime: '',
    endTime: ''
  },
  courierdetail: {},
  courierdetailquery: {},
  courierexpress: {
    message: [],
    num: 0,
    query: {}
  }
}

// getters
const getters = {
  getCourier: state => state.courier
}

// actions
const actions = {
  changeCourier ({ commit }) {
    let instance = axios.create({
      timeout: 2000
    })
    const query = state.courierquery
    const url = ApiStore.courier + '?userId=' + window.localStorage.userId + '&startTime=' + query.startTime + '&endTime=' + query.endTime + '&brandId=' + query.brandId
    console.log('url', url)
    instance.get(url)
      .then((res) => {
        if (res.status === 200) {
          Toast({
            message: '数据获取成功!'
          })
          const courier = res.data.courier
          commit(types.SET_COURIER, { courier })
        } else {
          Toast({
            message: '数据获取失败!'
          })
        }
      })
      .catch(err => {
        console.error(err)
        Toast({
          message: '数据获取失败!'
        })
      })
  },
  setCourierQuery ({dispatch, commit}, {startTime = state.courierquery.startTime, endTime = state.courierquery.endTime, brandId = state.courierquery.brandId}) {
    startTime = GetDateFormate(startTime)
    endTime = GetDateFormate(endTime)
    commit(types.SET_COURIER_QUERY, {startTime, endTime, brandId})
    dispatch('changeCourier')
  },
  changeCourierDetail ({ commit }, { id }) {
    let instance = axios.create({
      timeout: 2000
    })
    const query = state.courierdetailquery[id]
    const url = ApiStore.courierdetail + '?userId=' + window.localStorage.userId + '&id=' + id + '&startTime=' + GetDateFormate(query.startTime) + '&endTime=' + GetDateFormate(query.endTime) + '&brandId=' + query.brandId
    console.log('url', url)
    instance.get(url)
      .then((res) => {
        if (res.status === 200) {
          const detail = res.data
          commit(types.SET_COURIERDETAIL, { detail, id })
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
  setCourierDetailQuery ({dispatch, commit}, {id, startTime = null, endTime = null, brandId = 0}) {
    /* eslint-disable no-unneeded-ternary */
    startTime = startTime ? startTime : state.courierdetailquery[id].startTime
    endTime = endTime ? endTime : state.courierdetailquery[id].endTime
    brandId = brandId || brandId === 0 ? brandId : state.courierdetailquery[id].brandId
    commit(types.SET_COURIERDETAIL_QUERY, {id, startTime, endTime, brandId})
    dispatch('changeCourierDetail', {id})
  },
  changeCourierExpress ({ commit }) {
    let instance = axios.create({
      timeout: 2000
    })
    const query = state.courierexpress.query
    const url = ApiStore.courierexpress + '?userId=' + window.localStorage.userId + '&state=' + query.expressstate + '&id=' + query.id + '&startTime=' + query.startTime + '&endTime=' + query.endTime + '&brandId=' + query.brandId
    console.log('url', url)
    instance.get(url)
      .then((res) => {
        if (res.status === 200) {
          Toast({
            message: '数据获取成功!'
          })
          const message = res.data.message
          const num = res.data.num
          commit(types.SET_COURIEREXPRESS, { message, num })
        } else {
          Toast({
            message: '数据获取失败!'
          })
        }
      })
      .catch(err => {
        console.error(err)
        Toast({
          message: '数据获取失败!'
        })
      })
  },
  setCourierExpressQuery ({dispatch, commit}, {id = state.courierexpress.query.id, expressstate = state.courierexpress.query.expressstate, startTime = state.courierexpress.query.startTime, endTime = state.courierexpress.query.endTime, brandId = state.courierexpress.query.brandId}) {
    commit(types.SET_COURIEREXPRESS_QUERY, {id, expressstate, startTime, endTime, brandId})
    dispatch('changeCourierExpress')
  }
}

const mutations = {
  [types.SET_COURIER] (state, {courier}) {
    state.courier = courier
  },
  [types.SET_COURIER_QUERY] (state, { startTime, endTime, brandId }) {
    state.courierquery = {startTime, endTime, brandId}
  },
  [types.SET_COURIERDETAIL] (state, {detail, id}) {
    state.courierdetail[id] = detail
  },
  [types.SET_COURIERDETAIL_QUERY] (state, {id, startTime, endTime, brandId}) {
    state.courierdetailquery[id] = {startTime, endTime, brandId}
  },
  [types.SET_COURIEREXPRESS] (state, {message, num}) {
    state.courierexpress.message = message
    state.courierexpress.num = num
  },
  [types.SET_COURIEREXPRESS_QUERY] (state, {id, expressstate, startTime, endTime, brandId}) {
    state.courierexpress.query = {id, expressstate, startTime, endTime, brandId}
    console.log('express', state.courierexpress.query)
    console.log('express id', state.courierexpress.query.id)
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
