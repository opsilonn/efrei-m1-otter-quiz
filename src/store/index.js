import Vue from 'vue'
import Vuex from 'vuex'

import themesStore from './modules/themes'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  actions: {},
  mutations: {},
  getters: {},
  modules: {
    themes: themesStore
  }
})
