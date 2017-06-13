import ApiStore from 'ApiStore'
import axios from 'axios'

// import window from 'window'
import { GetDateFormate } from 'helpers'
import * as types from '../mutation-types'

export const state = {
  data: {},
  query: {}
}

// getters
export const getters = {
  getSendData: state => state.data,
  getSendQuery: state => state.query
}

// actions
export const actions = {
  changeSend ({ commit }) {
    axios.get(ApiStore.send, {
      params: {
        userId: 2339,
        startTime: 1487606400000,
        endTime: 1492704000000
      }
    })
    .then(res => {
      if (res.status === 200) {
        let data = res.data
        commit(types.SET_SEND, {data})
      }
    })
  },
  setSendQuery ({dispatch, commit}, {startTime = state.query.startTime, endTime = state.query.endTime, brandId = state.income.query.brandId, type = state.income.query.type}) {
    startTime = GetDateFormate(startTime)
    endTime = GetDateFormate(endTime)
    commit(types.SET_SEND_QUERY, {startTime, endTime, brandId, type})
    dispatch('changeIncome')
  }
}

export const mutations = {
  [types.SET_SEND] (state, {data}) {
    state.data = data
  },
  [types.SET_SEND_QUERY] (state, {startTime, endTime, brandId, type}) {
    state.query = {startTime, endTime, brandId, type}
  }
}
