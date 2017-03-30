import * as types from '../mutation-types'

export const state = {
  userId: '2367'
}

export const getters = {
  getUserId: state => state.userId
}

export const actions = {
  setUserId ({ commit }, { userId }) {
    commit(types.SET_USERID, { userId })
  }
}

export const mutations = {
  [types.SET_USERID] (state, { userId }) {
    state.userId = userId
  }
}

