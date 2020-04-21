import Vue from 'vue'

const state = {
  accounts: []
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
    return state.account.sort((_1, _2) => _1.id - _2.id).slice(-1)[0]
  },

  /**
   * Get accont by its login and password
   */
  getAccountByLoginAndPassword: state => (login, password) => {
    var logged = state.accounts.find(account => (account.login === login) && (account.password === password))
    if(logged===undefined){
      return logged
    }
    logged.connected = true
    return logged
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
      console.log('adding new id')
      const lastAccount = getters.getLastAccount(state)()
      console.log(`lastAccount : ${lastAccount}`)
      account.id = (lastAccount) ? lastAccount.id + 1 : 0
      console.log(`account id: ${account.id}`)
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
  }

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
