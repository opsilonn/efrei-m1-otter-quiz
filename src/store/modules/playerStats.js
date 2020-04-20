import Vue from 'vue'

const state = {
  playerstats: []
}

const getters = {
  /**
   * Get the playerstat by its id
   * @param {number} id - The id of the playerstat
   */
  getPlayerStatById: state => (id) => {
    return state.playerstats.find(playerstat => playerstat.id === id)
  },

  /**
   * Get all the player stats with a specific round id
   * @param {number} roundId - The id of the round
   */
  getPlayerStatsByRoundId: state => (roundId) => {
    return state.playerstats.find(playerstat => playerstat.roundId === roundId)
  },

  /**
   * Get the last playerStat fetched
   */
  getLastPlayerStat: state => () => {
    return state.trivias.sort((_1, _2) => _1.id - _2.id).slice(-1)[0]
  }
}

/**
 * Update all the prop of the playerstat by the given id
 * @param {object}  state                 - The playerstats state
 * @param {object}  playerstatPropValue
 * @param {number}  playerstatPropValue.id    - The id of the playerstat
 * @param {string}  playerstatPropValue.prop  - The key of a prop of the playerstat
 * @param {object}  playerstatPropValue.value - The new value for the prop of the playerstat
 */
function updateProp (state, { id, prop, value }) {
  const playerstat = getters.getPlayerStatById(state)(id)

  Vue.set(playerstat, prop, value)
}

const mutations = {
  /**
   * Add a new playerstat or update an existing one
   * @param {object} state  - The playerstats state
   * @param {object} playerstat - The playerstat to be added
   */
  addPlayerStat (state, { playerstat }) {
    if (!playerstat.id) {
      console.log('adding new id')
      const lastPlayerStat = getters.getLastPlayerStat(state)()
      console.log(`lastPlayerStat : ${lastPlayerStat}`)
      playerstat.id = (lastPlayerStat) ? lastPlayerStat.id + 1 : 0
      console.log(`playerstat id: ${playerstat.id}`)
    }

    const existing = state.playerstats.findIndex(e => e.id === playerstat.id)
    if (existing !== -1) {
      const keys = Object.keys(playerstat)
      for (const key of keys) {
        if (key === 'id') continue
        updateProp(state, { id: playerstat.id, prop: key, value: playerstat[key] })
      }
    } else {
      state.playerstats.push(playerstat)
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
