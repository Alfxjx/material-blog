import Vue from 'vue'
import Vuex from 'vuex'
import { getCategory, getList } from './api'

Vue.use(Vuex)

const blogList = {
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
}

const category = {
  state: {
    categoryList: []
  },
  mutations: {
    getCategoryList (state, list) {
      state.categoryList = list
    }
  },
  actions: {
    async getCategoryList ({ commit }) {
      const list = await getCategory
      commit('getCategoryList', list)
    }
  }
}

export default new Vuex.Store(
  blogList,
  category
)
