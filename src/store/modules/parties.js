import Vue from 'vue'

const state = {
  parties: []
}

const getters = {
  /**
   * Get the party by its id
   * @param {number} id - The id of the party
   */
  getPartyById: state => (id) => {
    return state.parties.find(party => party.id === id)
  },

  /**
   * Get all the parties with a specific account id
   * @param {number} accountId - The id of the account
   */
  getPartiesByAccountId: state => (accountId) => {
    return state.parties.filter(party => party.accountId === accountId)
  },

  /**
   * Get the last party fetched
   */
  getLastParty: state => () => {
    return state.parties.sort((_1, _2) => _1.id - _2.id).slice(-1)[0]
  }
}

/**
 * Update all the prop of the round by the given id
 * @param {object}  state                 - The rounds state
 * @param {object}  roundPropValue
 * @param {number}  roundPropValue.id    - The id of the round
 * @param {string}  roundPropValue.prop  - The key of a prop of the round
 * @param {object}  roundPropValue.value - The new value for the prop of the round
 */
function updateProp (state, { id, prop, value }) {
  const party = getters.getPartyById(state)(id)

  if (party) {
    Vue.set(party, prop, value)
  }
}

function refreshProps (state, { party }) {
  const keys = Object.keys(party)
  for (const key of keys) {
    if (key === 'id') continue
    updateProp(state, { id: party.id, prop: key, value: party[key] })
  }
}

const mutations = {
  /**
   * Add a new party or update an existing one
   * @param {object} state  - The parties state
   * @param {object} party - The party to be added
   */
  addParty (state, { party }) {
    if (!party.id) {
      const lastParty = getters.getLastParty(state)()
      party.id = (lastParty) ? lastParty.id + 1 : 0
    }

    const existing = state.parties.findIndex(e => e.id === party.id)
    if (existing !== -1) {
      refreshProps(state, party)
    } else {
      state.parties.push(party)
    }
  },
  partyFinish (state, { partyId }) {
    updateProp(state, { id: partyId, prop: 'isFinished', value: true })
  },
  updateProp (state, { id, prop, value }) {
    updateProp(state, { id, prop, value })
  },
  refreshProps (state, { party }) {
    refreshProps(state, { party })
  }
}

const actions = {
  createParty ({ commit, dispatch }, { accountId }) {
    console.log('[parties] createParty')
    // Party
    const newParty = {
      accountId,
      seed: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
      isFinished: false
    }
    console.log(`[parties] commit addParty: ${newParty.id}`)
    commit('addParty', { party: newParty })
    console.log(`[parties] commited addParty: ${newParty.id}`)

    // Dunjon
    const newDunjon = {
      partyId: newParty.id,
      category: 9,
      difficulty: 'easy'
    }
    console.log(`[parties] dispatch dunjons/nextDunjon ${newDunjon.id}`)
    return dispatch('dunjons/nextDunjon', { partyId: newParty.id, dunjon: newDunjon }, { root: true })
      .then((dunjonId) => {
        console.log(`[parties] dispatched dunjons/nextDunjon: ${dunjonId}`)

        console.log(`[parties] return partyId: ${newParty.id}`)
        return newParty.id
      })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
