import ApiStore from 'ApiStore'
import axios from 'axios'

import window from 'window'
import { GetDateFormate, GetTimeStamp } from 'helpers'
import * as types from '../mutation-types'

export const state = {
  refresh: false,
  data: {
    array: [0],
    mapNum: {},
    number: [],
    payType: []
  },
  query: {
    startTime: 0,
    endTime: 0,
    pay_type: 0,
    brandId: 0
  }
}

// getters
export const getters = {
  getSendRefresh: state => state.refresh,
  getSendData: state => state.data,
  getSendQuery: state => state.query
}

// actions
export const actions = {
  changeSend ({ commit }) {
    axios.get(ApiStore.send, {
      params: {
        userId: window.localStorage.userId,
        startTime: GetTimeStamp(state.query.startTime),
        endTime: GetTimeStamp(state.query.endTime),
        pay_type: state.query.pay_type,
        brandId: state.query.brandId
      }
    })
    .then(res => {
      if (res.status === 200) {
        let data = res.data
        commit(types.SET_SEND, {data})
      }
    })
  },
  setSendQuery ({dispatch, commit}, {startTime = state.query.startTime, endTime = state.query.endTime, brandId = state.query.brandId, payType = state.query.pay_type}) {
    startTime = GetDateFormate(startTime)
    endTime = GetDateFormate(endTime)
    commit(types.SET_SEND_QUERY, {startTime, endTime, brandId, payType})
    dispatch('changeSend')
  }
}

export const mutations = {
  [types.SET_SEND] (state, {data}) {
    state.data = data
    state.refresh = true
  },
  [types.SET_SEND_QUERY] (state, {startTime, endTime, brandId, payType}) {
    state.query = {startTime, endTime, brandId, pay_type: payType}
  }
}
