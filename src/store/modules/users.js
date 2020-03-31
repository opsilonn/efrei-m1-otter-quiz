const state = {
  Users: {
    Base: '#3d3d3d',
    Dark: '#232323',
    DarkLight: '#323232',
    Light: '#c0c0c0',
    Success: '#117711',
    Failure: '#771111'
  }
}

const getters = {
  getUsers: state => state.Users,
  getStyleUser: state => (User, string) => string + ': ' + User
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
