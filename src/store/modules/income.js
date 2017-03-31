import ApiStore from 'ApiStore'
import axios from 'axios'

import window from 'window'
import { GetDateFormate } from 'helpers'
import * as types from '../mutation-types'

const state = {
  income: {
    data: {},
    query: {}
  }
}

// getters
const getters = {
  getIncome: state => state.income
}

// actions
const actions = {
  changeIncome ({ commit }) {
    let instance = axios.create({
      timeout: 2000
    })
    let query = state.courierquery
    query.userId = window.localStorage.userId
    instance.get(ApiStore.income, {
      params: query
    })
    .then((res) => {
      if (res.status === 200) {
        const income = res.data
        commit(types.SET_INCOME, {income})
      }
    })
    .catch(err => {
      console.error(err)
    })
  },
  setIncomeQuery ({dispatch, commit}, {startTime = state.courierquery.startTime, endTime = state.courierquery.endTime, brandId = state.courierquery.brandId}) {
    startTime = GetDateFormate(startTime)
    endTime = GetDateFormate(endTime)
    commit(types.SET_INCOME_QUERY, {startTime, endTime, brandId})
    dispatch('changeCourier')
  }
}

const mutations = {
  [types.SET_INCOME] (state, {income}) {
    state.income.data = income
  },
  [types.SET_INCOME_QUERY] (state, { startTime, endTime, brandId }) {
    state.courierquery = {startTime, endTime, brandId}
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
