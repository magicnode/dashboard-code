import ApiStore from 'ApiStore'
import axios from 'axios'

import { Toast } from 'mint-ui'
import {state as userstate} from './user'
import * as types from '../mutation-types'

const state = {
  courier: null,
  courierquery: {
    brandId: 0,
    startTime: '',
    endTime: ''
  },
  courierdetail: {},
  courierdetailquery: {}
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
    const url = ApiStore.courier + '?userId=' + userstate.userId + '&startTime=' + query.startTime + '&endTime=' + query.endTime + '&brandId=' + query.brandId
    // console.log('url', url)
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
    commit(types.SET_COURIER_QUERY, {startTime, endTime, brandId})
    dispatch('changeCourier')
  },
  changeCourierDetail ({ commit }, { id }) {
    let instance = axios.create({
      timeout: 2000
    })
    const query = state.courierdetailquery[id]
    const url = ApiStore.courier + '?userId=' + userstate.userId + '&id=' + id + '&startTime=' + query.startTime + '&endTime=' + query.endTime + '&brandId=' + query.brandId
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
  setCourierDetailQuery ({dispatch, commit}, {id, startTime, endTime, brandId}) {
    /* eslint-disable no-unneeded-ternary */
    startTime = startTime ? startTime : state.courierquery[id].startTime
    endTime = endTime ? endTime : state.courierquery[id].endTime
    brandId = brandId ? brandId : state.courierquery[id].brandId
    console.log('brandId', brandId)
    commit(types.SET_COURIERDETAIL_QUERY, {id, startTime, endTime, brandId})
    dispatch('changeCourierDetail', {id})
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
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
