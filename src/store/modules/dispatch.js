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
      timeout: 200000
    })
    let query = state.query
    query.userId = window.localStorage.userId
    query.time = GetDateFormate(query.time)
    query.month = GetDateFormate(query.month)
    instance.get(ApiStore.dispatch, {
      params: query
    })
    .then((res) => {
      let data
      if (res.status === 200) {
        data = res.data
        data.refresh = 1
        const enter = data.day.Arrive + data.day.Invite + data.day.Send
        const out = data.day.Received + data.day.Back
        const inside = data.day.InArrive + data.day.InInvite + data.day.InSend
        const question = data.day.Questioned + data.day.Questioning
        data.enter = enter
        data.out = out
        data.inside = inside
        data.question = question
      } else {
        data = {
          chart: {
          },
          day: {
            Send: 0,
            Arrive: 0,
            Invite: 0,
            Received: 0,
            Back: 0,
            InSend: 0,
            InArrive: 0,
            InInvite: 0,
            Questioned: 0,
            Questioning: 0
          },
          month: {
            MonthSend: 0,
            MonthArrive: 0,
            MonthInvite: 0,
            MonthReceived: 0,
            MonthBack: 0,
            MonthInSend: 0,
            MonthInArrive: 0,
            MonthInInvite: 0,
            MonthQuestioned: 0,
            MonthQuestioning: 0
          }
        }
        data.enter = 0
        data.out = 0
        data.inside = 0
        data.question = 0
      }
      console.log('data', data)
      console.log('data rs', res.request.responseURL)
      commit(types.SET_DISPATCH, {data})
    })
    .catch(err => {
      let data = {}
      data = {
        chart: {
        },
        day: {
          Send: 0,
          Arrive: 0,
          Invite: 0,
          Received: 0,
          Back: 0,
          InSend: 0,
          InArrive: 0,
          InInvite: 0,
          Questioned: 0,
          Questioning: 0
        },
        month: {
          MonthSend: 0,
          MonthArrive: 0,
          MonthInvite: 0,
          MonthReceived: 0,
          MonthBack: 0,
          MonthInSend: 0,
          MonthInArrive: 0,
          MonthInInvite: 0,
          MonthQuestioned: 0,
          MonthQuestioning: 0
        }
      }
      data.enter = 0
      data.out = 0
      data.inside = 0
      data.question = 0
      data.error = true
      commit(types.SET_DISPATCH, {data})
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
      timeout: 5000
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
