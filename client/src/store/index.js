import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  blogList: []
}

const getters = {
  getBlogList(state) {
    return state.blogList
  }
}

const mutations = {

}

const actions = {
  blogIndex(context) {

  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});

export default store;
