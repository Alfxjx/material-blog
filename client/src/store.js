import Vue from 'vue'
import Vuex from 'vuex'
import {getCategory, getList, getTag} from './api'

Vue.use(Vuex)

export default new Vuex.Store(
  {
    state: {
      blogList: [],
      categoryList: [],
      tagList: [],
      tabColor: 'white',
      fontColor: 'black',

      /**
       * toast相关
       */
      myConfirmStatus: false,
      myAlertStatus: false,
      myAlertTitle: 'notice',
      myAlertContent: 'Your post <strong>Material Design is awesome</strong> has been created.',
      myConfirmTitle: 'Use Google\'s location service?',
      myConfirmContent: 'Let Google help apps determine location. <br> This means sending <strong>anonymous</strong> location data to Google, even when no apps are running.',
      myConfirmAgreeEvent: () => console.log('you confirm'),
      myConfirmDisagreeEvent: () => console.log('you disconfirm'),

      /**
       * 用户相关
       */
      username: '',
      avatar: ''
    },
    mutations: {
      getBloglist(state, list) {
        state.blogList = list
      },
      getCategoryList(state, list) {
        state.categoryList = list
      },
      getTagList(state, list) {
        state.tagList = list
      },
      tab2White(state) {
        state.tabColor = 'white'
      },
      tab2Transparent(state) {
        state.tabColor = 'transparent'
      },
      font2White(state) {
        state.fontColor = 'white'
      },
      font2Black(state) {
        state.fontColor = 'black'
      },
      changeToaste(state, payload) {
        // 下面这种方法替换了state引用，导致state断了， 不能及时反映数据改变
        // state = { ...state, ...payload }
        // 要用这种
        Object.assign(state, payload)
      },
      userInfo(state, payload) {
        Object.assign(state, payload)
      }
    },
    actions: {
      async getBlogList({commit}) {
        const list = await getList()
        commit('getBloglist', list)
      },
      async getCategoryList({commit}) {
        const list = await getCategory()
        commit('getCategoryList', list)
      },
      async getTagList({commit}) {
        const list = await getTag()
        commit('getTagList', list)
      },
      tab2White({commit}) {
        commit('tab2White')
      },
      tab2Transparent({commit}) {
        commit('tab2Transparent')
      },
      font2White({commit}) {
        commit('font2White')
      },
      font2Black({commit}) {
        commit('font2Black')
      },
      async changeToaste({commit, dispatch}, payload) {
        commit('changeToaste', payload)
        // 重置myAlertStatus
        if (payload.myAlertStatus) {
          setTimeout(function () {
            dispatch('changeToaste', {myAlertStatus: false})
          }, 500)
        }
      },
      userInfo({commit}, payload) {
        commit('userInfo', payload)
      }
    }
  }
)
