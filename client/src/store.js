import Vue from 'vue'
import Vuex from 'vuex'
import { getCategory, getList, getTag } from './api'

Vue.use(Vuex)

export default new Vuex.Store(
  {
    state: {
      blogList: [],
      categoryList: [],
      tagList: []
    },
    mutations: {
      getBloglist (state, list) {
        state.blogList = list
      },
      getCategoryList (state, list) {
        state.categoryList = list
      },
      getTagList (state, list) {
        state.tagList = list
      }
    },
    actions: {
      async getBlogList ({ commit }) {
        const list = await getList()
        commit('getBloglist', list)
      },
      async getCategoryList ({ commit }) {
        const list = await getCategory()
        commit('getCategoryList', list)
      },
      async getTagList ({ commit }) {
        const list = await getTag()
        commit('getTagList', list)
      }
    }
  }
)
