import ApiStore from 'ApiStore'
import axios from 'axios'

import window from 'window'
import { GetDateFormate } from 'helpers'
import * as types from '../mutation-types'

const state = {
  data: {
    day: {}
  },
  query: {},
  detail: {},
  detailquery: {
    state: 0
  }
}

// getters
const getters = {
  getDispatch: state => state.data,
  getDispatchQuery: state => state.query,
  getDispatchDetail: state => state.detail,
  getDispatchDetailQuery: state => state.detailquery
}

// actions
const actions = {
  changeDispatch ({ commit }) {
    let instance = axios.create({
      timeout: 2000
    })
    let query = state.query
    query.userId = window.localStorage.userId
    query.time = GetDateFormate(query.time)
    query.month = GetDateFormate(query.month)
    instance.get(ApiStore.dispatch, {
      params: query
    })
    .then((res) => {
      if (res.status === 200) {
        let data = res.data
        data.refresh = 1
        const enter = data.day.Arrive + data.day.Invite + data.day.Send
        const out = data.day.Received + data.day.Back
        const inside = data.day.InArrive + data.day.InInvite + data.day.InSend
        const question = data.day.Questioned + data.day.Questioning
        data.enter = enter
        data.out = out
        data.inside = inside
        data.question = question
        console.log('data', data)
        console.log('data rs', res.request.responseURL)
        commit(types.SET_DISPATCH, {data})
      }
    })
    .catch(err => {
      console.error(err)
    })
  },
  setDispatchQuery ({dispatch, commit}, {time = state.query.time, brandId = state.query.brandId, month = state.query.month}) {
    time = GetDateFormate(time)
    month = GetDateFormate(month)
    commit(types.SET_DISPATCH_QUERY, {time, brandId, month})
    dispatch('changeDispatch')
  },
  changeDispatchDetail ({ commit }) {
    let instance = axios.create({
      timeout: 2000
    })
    let query = state.detailquery
    query.userId = window.localStorage.userId
    query.time = GetDateFormate(query.time)
    query.month = GetDateFormate(query.month)
    instance.get(ApiStore.dispatchDetail, {
      params: query
    })
    .then((res) => {
      if (res.status === 200) {
        let data = res.data
        data.refresh = 1
        const enter = data.day.Arrive + data.day.Invite + data.day.Send
        const out = data.day.Received + data.day.Back
        const inside = data.day.InArrive + data.day.InInvite + data.day.InSend
        const question = data.day.Questioned + data.day.Questioning
        data.enter = enter
        data.out = out
        data.inside = inside
        data.question = question
        console.log('data', data)
        console.log('data rs', res.request.responseURL)
        // commit(types.SET_DISPATCH, {data})
      }
    })
    .catch(err => {
      console.error(err)
    })
  },
  setDispatchDetailQuery ({dispatch, commit}, {time = state.query.time, brandId = state.query.brandId, month = state.query.month}) {
    time = GetDateFormate(time)
    month = GetDateFormate(month)
    // commit(types.SET_DISPATCH_QUERY, {time, brandId, month})
    // dispatch('changeDispatch')
  }
}

const mutations = {
  [types.SET_DISPATCH] (state, {data}) {
    state.data = data
  },
  [types.SET_DISPATCH_QUERY] (state, {time, brandId, month}) {
    state.query = {time, brandId, month}
  },
  [types.SET_DISPATCHDETAIL] (state, {data}) {
    state.detail = data
  },
  [types.SET_DISPATCHDETAIL_QUERY] (state, {time, brandId, month, startTime, endTime}) {
    state.detailquery = {time, brandId, month, startTime, endTime}
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
