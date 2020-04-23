import Vue from 'vue'

const state = {
  connectedAccount: { id: -1, username: 'anonymous' },
  accounts: [{
    id: 0,
    username: 'user1',
    password: 'test'
  }]
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
   * Get accont by its username and password
   */
  getAccountByUsername: state => (username, password) => {
    const account = state.accounts.find(account => (account.username === username) && (account.password === password))

    return account
  },

  /**
   * Get accont by its login and password
   */
  getAccountByUsernameAndPassword: state => (username, password) => {
    const account = state.accounts.find(account => (account.username === username) && (account.password === password))

    return account
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
    }
    const existing = state.accounts.findIndex(e => e.id === account.id)
    if (existing !== -1) {
      const keys = Object.keys(account)
      for (const key of keys) {
        if (key === 'id') continue
        updateProp(state, { id: account.id, prop: key, value: account[key] })
      }
    } else {
      state.accounts.push(account)
    }
  },
  updateProp (state, { id, prop, value }) {
    updateProp(state, { id, prop, value })
  },
  connectedTo (state, { account }) {
    state.connectedAccount = account
  },
  logOut (state) {
    state.connectedAccount = {}
  }
}

const actions = {
  signIn ({ commit, getters }, { username, password }) {
    return new Promise((resolve, reject) => {
      const account = getters.getAccountByUsernameAndPassword(username, password)
      if (account !== undefined) {
        commit('connectedTo', { account })
        resolve(account)
      } else {
        reject(new Error('User not found'))
      }
    })
  },
  signUp ({ commit, getters }, { username, password }) {
    const already = getters.getAccountByUsername({ username })
    if (already === undefined) {
      const account = { username: username, password: password }
      commit('addAccount', { account })
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
