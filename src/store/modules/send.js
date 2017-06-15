import ApiStore from 'ApiStore'
import axios from 'axios'

import window from 'window'
import { GetDateFormate, GetTimeStamp } from 'helpers'
import * as types from '../mutation-types'

export const state = {
  refresh: false,
  data: {},
  query: {
    startTime: 1487606400000,
    endTime: 1492704000000
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
        endTime: GetTimeStamp(state.query.endTime)
      }
    })
    .then(res => {
      if (res.status === 200) {
        let data = res.data
        console.log('res data', data)
        commit(types.SET_SEND, {data})
      }
    })
  },
  setSendQuery ({dispatch, commit}, {startTime = state.query.startTime, endTime = state.query.endTime}) {
    startTime = GetDateFormate(startTime)
    endTime = GetDateFormate(endTime)
    commit(types.SET_SEND_QUERY, {startTime, endTime})
    dispatch('changeSend')
  }
}

export const mutations = {
  [types.SET_SEND] (state, {data}) {
    state.data = data
    state.refresh = true
  },
  [types.SET_SEND_QUERY] (state, {startTime, endTime}) {
    state.query = {startTime, endTime}
  }
}
