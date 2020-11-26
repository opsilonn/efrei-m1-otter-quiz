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
  addPartyScore (state, { partyId, score }) {
    const party = getters.getPartyById(state)(partyId)
    updateProp(state, { id: partyId, prop: 'score', value: parseInt(party.score) + parseInt(score) })
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
  createParty ({ commit, dispatch }, { accountId, defaultPlayerStat, defaultEnemyStat }) {
    // Party
    const newParty = {
      accountId,
      score: 0,
      seed: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
      isFinished: false
    }
    commit('addParty', { party: newParty })

    defaultPlayerStat.partyId = newParty.id

    // Stats
    commit('playerStats/addPlayerStat', { playerStat: defaultPlayerStat }, { root: true })

    // Dungeon
    const newDungeon = {
      partyId: newParty.id,
      category: 9,
      difficulty: 'easy',
      roundTime: 20000
    }
    return dispatch('dungeons/nextDungeon', { partyId: newParty.id, dungeon: newDungeon, defaultEnemyStat }, { root: true })
      .then((dungeonId) => {
        return newParty.id
      })
      .catch((err) => {
        // console.log('[createParty] Error in dungeons/nextDungeon')
        // console.log(err)
        throw err
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
