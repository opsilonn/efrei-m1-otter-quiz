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
   * Get all the player stats with a specific round id
   * @param {number} roundId - The id of the round
   */
  getPlayerStatByRoundId: state => (roundId) => {
    return state.playerStats.find(playerStat => playerStat.roundId === roundId)
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
  nextPlayerStat (state, { playerStat, roundId }) {
    const nextPlayerStat = {
      roundId: roundId,
      maxHP: playerStat.maxHP,
      HP: playerStat.HP,
      maxMana: playerStat.maxMana,
      mana: playerStat.mana,
      gold: playerStat.gold
    }
    mutations.addPlayerStat(state, { playerStat: nextPlayerStat })
  },
  setPlayerStatHP (state, { playerStat, HP }) {
    if (HP < 0) {
      HP = 0
    } else if (HP > playerStat.maxHP) {
      HP = playerStat.maxHP
    }

    updateProp(state, { id: playerStat.id, prop: 'HP', value: HP })
  },
  setPlayerStatMana (state, { playerStat, mana }) {
    if (mana < 0) {
      mana = 0
    } else if (mana > playerStat.maxmana) {
      mana = playerStat.maxmana
    }

    updateProp(state, { id: playerStat.id, prop: 'mana', value: mana })
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
