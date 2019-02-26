import Vue from 'vue'
import Vuex from 'vuex'
import { getList } from './api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      blogList: []
  },
  mutations: {
    getBloglist (state, list) {
      state.blogList = list
    }
  },
  actions: {
    async getBlogList ({ commit }) {
      const list = await getList()
      commit('getBloglist', list)
    }
  }
})
