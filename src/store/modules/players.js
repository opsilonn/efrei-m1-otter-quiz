import Vue from 'vue'

const state = {
  players: []
}

const getters = {
  /**
   * Get the player by its id
   * @param {number} id - The id of the player
   */
  getPlayerById: state => (id) => {
    return state.players.find(player => player.id === id)
  },

  /**
   * Get all the players with a specific account id
   * @param {number} accountId - The id of the account
   */
  getPlayersByAccountId: state => (accountId) => {
    return state.players.filter(player => player.accountId === accountId)
  },

  /**
   * Get the last player fetched
   */
  getLastPlayer: state => () => {
    return state.players.sort((_1, _2) => _1.id - _2.id).slice(-1)[0]
  }
}

/**
 * Update all the prop of the player by the given id
 * @param {object}  state                 - The players state
 * @param {object}  playerPropValue
 * @param {number}  playerPropValue.id    - The id of the player
 * @param {string}  playerPropValue.prop  - The key of a prop of the player
 * @param {object}  playerPropValue.value - The new value for the prop of the player
 */
function updateProp (state, { id, prop, value }) {
  const player = getters.getPlayerById(state)(id)

  Vue.set(player, prop, value)
}

const mutations = {
  /**
   * Add a new player or update an existing one
   * @param {object} state  - The players state
   * @param {object} player - The player to be added
   */
  addPlayer (state, { player }) {
    if (!player.id) {
      const lastPlayer = getters.getLastPlayer(state)()
      player.id = (lastPlayer) ? lastPlayer.id + 1 : 0
    }

    const existing = state.players.findIndex(e => e.id === player.id)
    if (existing !== -1) {
      const keys = Object.keys(player)
      for (const key of keys) {
        if (key === 'id') continue
        updateProp(state, { id: player.id, prop: key, value: player[key] })
      }
    } else {
      state.players.push(player)
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
