import { createStore } from 'vuex'

export default createStore({
  state: {
    app_version: '',
  },
  getters: {
    getAppVersion(state) {
      return state.app_version;
    }
  },
  mutations: {
    setAppVersion(state, version) {
      state.app_version = version;
    }
  },
  actions: {
  },
  modules: {
  }
})
