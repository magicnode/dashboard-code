import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    title: '统计报表'
  },
  mutations: {
    setTitle (state, title) {
      state.title = title
    }
  },
  actions: {
    SET_TITLE (context) {
      context.commit('setTitle')
    }
  },
  getters: {
    title (state) {
      return state.title
    }
  }
})

export default store
