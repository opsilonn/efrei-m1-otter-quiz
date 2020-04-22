import Vue from 'vue'

const state = {
  connectedAccount: { id: 0, username: 'anonymous' },
  accounts: [{
    id: 1,
    username: 'user1',
    password: 'test'
  }],
  register: false
}

const getters = {
  /**
   * Get the account by its id
   * @param {number} id - The id of the account
   */
  getAccountById: state => (id) => {
    return state.accounts.find(account => account.id === id)
  },

  /**
   * Get the last account fetched
   */
  getLastAccount: state => () => {
    return state.accounts.sort((_1, _2) => _1.id - _2.id).slice(-1)[0]
  },

  /**
   * Get accont by its login and password
   */
  getAccountByLoginAndPassword: state => (login, password) => {
    console.log('balise 1')
    console.log(login)
    console.log(password)
    var logged = state.accounts.find(account => (account.username === login) && (account.password === password))
    if (logged === undefined) {
      return logged
    }
    // logged.connected = true
    return logged
  },

  getConnectedAccount: state => () => {
    const logged = state.connectedAccount
    return logged
  },

  getRegistration: state => () => {
    return state.register
  }
}

/**
 * Update all the prop of the account by the given id
 * @param {object}  state                 - The accounts state
 * @param {object}  accountPropValue
 * @param {number}  accountPropValue.id    - The id of the account
 * @param {string}  accountPropValue.prop  - The key of a prop of the account
 * @param {object}  accountPropValue.value - The new value for the prop of the account
 */
function updateProp (state, { id, prop, value }) {
  const account = getters.getAccountById(state)(id)

  Vue.set(account, prop, value)
}

const mutations = {
  /**
   * Add a new account or update an existing one
   * @param {object} state  - The accounts state
   * @param {object} account - The account to be added
   */
  addAccount (state, { account }) {
    if (!account.id) {
      const lastAccount = getters.getLastAccount(state)()
      account.id = (lastAccount) ? lastAccount.id + 1 : 0
      console.log(lastAccount)
    }
    console.log(account)
    const existing = state.accounts.findIndex(e => e.id === account.id)
    if (existing !== -1) {
      const keys = Object.keys(account)
      for (const key of keys) {
        if (key === 'id') continue
        updateProp(state, { id: account.id, prop: key, value: account[key] })
      }
    } else {
      console.log('registering')
      state.accounts.push(account)
      console.log(state.accounts)
    }
  },
  updateProp (state, { id, prop, value }) {
    updateProp(state, { id, prop, value })
  },
  connectedTo (state, { account }) {
    state.connectedAccount = account
  },
  registered (state, { registration }) {
    state.register = registration
  }
}

const actions = {
  connection ({ commit, getters }, { login, password }) {
    const account = getters.getAccountByLoginAndPassword(login, password)
    console.log('balise2')
    console.log(login)
    console.log(password)
    console.log(account)
    if (account !== undefined) {
      console.log('entrering the if ')
      commit('connectedTo', { account })
      return account
    }
  },
  register ({ commit, getters }, { login, password }) {
    const already = getters.getAccountByLoginAndPassword({ login, password })
    if (already === undefined) {
      const account = { username: login, password: password }
      commit('addAccount', { account })
      commit('registered', { registration: true })
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
