import Vue from 'vue'

const state = {
  playerStats: []
}

const getters = {
  /**
   * Get the playerStat by its id
   * @param {number} id - The id of the playerStat
   */
  getPlayerStatById: state => (id) => {
    return state.playerStats.find(playerStat => playerStat.id === id)
  },

  /**
   * Get all the player stats with a specific party id
   * @param {number} partyId - The id of the party
   */
  getPlayerStatByPartyId: state => (partyId) => {
    return state.playerStats.find(playerStat => playerStat.partyId === partyId)
  },

  /**
   * Get the last playerStat fetched
   */
  getLastPlayerStat: state => () => {
    return state.playerStats.sort((_1, _2) => _1.id - _2.id).slice(-1)[0]
  }
}

/**
 * Update all the prop of the playerStat by the given id
 * @param {object}  state                 - The playerStats state
 * @param {object}  playerStatPropValue
 * @param {number}  playerStatPropValue.id    - The id of the playerStat
 * @param {string}  playerStatPropValue.prop  - The key of a prop of the playerStat
 * @param {object}  playerStatPropValue.value - The new value for the prop of the playerStat
 */
function updateProp (state, { id, prop, value }) {
  const playerStat = getters.getPlayerStatById(state)(id)

  Vue.set(playerStat, prop, value)
}

const mutations = {
  /**
   * Add a new playerStat or update an existing one
   * @param {object} state  - The playerStats state
   * @param {object} playerStat - The playerStat to be added
   */
  addPlayerStat (state, { playerStat }) {
    if (!playerStat.id) {
      console.log('adding new id')
      const lastPlayerStat = getters.getLastPlayerStat(state)()
      console.log(`lastPlayerStat : ${lastPlayerStat}`)
      playerStat.id = (lastPlayerStat) ? lastPlayerStat.id + 1 : 0
      console.log(`playerStat id: ${playerStat.id}`)
    }

    const existing = state.playerStats.findIndex(e => e.id === playerStat.id)
    if (existing !== -1) {
      const keys = Object.keys(playerStat)
      for (const key of keys) {
        if (key === 'id') continue
        updateProp(state, { id: playerStat.id, prop: key, value: playerStat[key] })
      }
    } else {
      state.playerStats.push(playerStat)
    }
  },
  setPlayerStatHP (state, { playerStat, HP }) {
    if (HP < 0) {
      updateProp(state, { id: playerStat.id, prop: 'HP', value: 0 })
    } else if (HP > playerStat.maxHP) {
      updateProp(state, { id: playerStat.id, prop: 'HP', value: playerStat.maxHP })
    } else {
      updateProp(state, { id: playerStat.id, prop: 'HP', value: HP })
    }
  },
  setPlayerStatMana (state, { playerStat, mana }) {
    if (mana < 0) {
      updateProp(state, { id: playerStat.id, prop: 'mana', value: 0 })
    } else if (mana > playerStat.maxMana) {
      updateProp(state, { id: playerStat.id, prop: 'mana', value: playerStat.maxMana })
    } else {
      updateProp(state, { id: playerStat.id, prop: 'mana', value: mana })
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
