import ApiStore from 'ApiStore'
import axios from 'axios'

import window from 'window'
import { GetDateFormate } from 'helpers'
import * as types from '../mutation-types'

const state = {
  income: {
    data: {
      total: 0
    },
    query: {}
  }
}

// getters
const getters = {
  getIncome: state => state.income,
  getIncomeData: state => state.income.data
}

// actions
const actions = {
  changeIncome ({ commit }) {
    let instance = axios.create({
      timeout: 5000
    })
    let query = state.income.query
    query.userId = window.localStorage.userId
    query.startTime = GetDateFormate(query.startTime)
    query.endTime = GetDateFormate(query.endTime)
    instance.get(ApiStore.income, {
      params: query
    })
    .then((res) => {
      if (res.status === 200) {
        let income = res.data
        console.log('data', income)
        console.log('data rs', res.request.responseURL)
        let detail = []
        detail.push({feetype: 1, money: income.num1})
        detail.push({feetype: 2, money: income.num2})
        detail.push({feetype: 3, money: income.num3})
        detail.push({feetype: 4, money: income.num4})
        detail.push({feetype: 5, money: income.num5})
        income.detail = detail
        let total = Number(income.num1) + Number(income.num2) + Number(income.num3) + Number(income.num4) + Number(income.num5)
        income.total = total || 0
        income.refresh = true
        commit(types.SET_INCOME, {income})
      }
    })
    .catch(err => {
      console.error(err)
    })
  },
  setIncomeQuery ({dispatch, commit}, {startTime = state.income.query.startTime, endTime = state.income.query.endTime, brandId = state.income.query.brandId, type = state.income.query.type}) {
    startTime = GetDateFormate(startTime)
    endTime = GetDateFormate(endTime)
    commit(types.SET_INCOME_QUERY, {startTime, endTime, brandId, type})
    dispatch('changeIncome')
  }
}

const mutations = {
  [types.SET_INCOME] (state, {income}) {
    state.income.data = income
  },
  [types.SET_INCOME_QUERY] (state, {startTime, endTime, brandId, type}) {
    state.income.query = {startTime, endTime, brandId, type}
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
