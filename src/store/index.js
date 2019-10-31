import Vue from 'vue'
import Vuex from 'vuex'
import common from './module/common/index'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    a: 'a'
  },
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    common
  }
})
