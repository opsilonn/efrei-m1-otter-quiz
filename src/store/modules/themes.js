const state = {
  themes: {
    Base: '#3d3d3d',
    Dark: '#232323',
    DarkLight: '#323232',
    DarkLighter: '#595959',
    Light: '#c0c0c0',
    Success: '#117711',
    Failure: '#771111'
  }
}

const getters = {
  getThemes: state => state.themes,
  getStyleTheme: state => (theme, string) => string + ': ' + theme
}

const mutations = {
}

const actions = {
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
