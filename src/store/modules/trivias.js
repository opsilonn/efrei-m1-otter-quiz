const state = {
  Trivias: {
    Base: '#3d3d3d',
    Dark: '#232323',
    DarkLight: '#323232',
    Light: '#c0c0c0',
    Success: '#117711',
    Failure: '#771111'
  }
}

const getters = {
  getTrivias: state => state.Trivias,
  getStyleTrivia: state => (Trivia, string) => string + ': ' + Trivia
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
