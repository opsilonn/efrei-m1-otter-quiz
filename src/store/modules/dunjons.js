import Vue from 'vue'

const state = {
  dunjons: []
}

const getters = {
  /**
   * Get the dunjon by its id
   * @param {number} id - The id of the dunjon
   */
  getDunjonById: state => (id) => {
    return state.dunjons.find(dunjon => dunjon.id === id)
  },

  /**
   * Get all the dunjons with a specific player id
   * @param {number} playerId - The id of the player
   */
  getDunjonsByPlayerId: state => (playerId) => {
    const result = state.dunjons.filter(dunjon => dunjon.playerId === playerId)
    return result
  },

  /**
   * Get the last dunjon with a specific player id
   * @param {number} playerId - The id of the player
   */
  getLastDunjonByPlayerId: state => (playerId) => {
    const dunjonsForPlayerId = getters.getDunjonsByPlayerId(state)(playerId) || []
    return dunjonsForPlayerId.sort((_1, _2) => _1.id - _2.id).slice(-1)[0]
  },

  /**
   * Get the last dunjon fetched
   */
  getLastDunjon: state => () => {
    return state.dunjons.sort((_1, _2) => _1.id - _2.id).slice(-1)[0]
  }
}

/**
 * Update all the prop of the dunjon by the given id
 * @param {object}  state                 - The dunjons state
 * @param {object}  dunjonPropValue
 * @param {number}  dunjonPropValue.id    - The id of the dunjon
 * @param {string}  dunjonPropValue.prop  - The key of a prop of the dunjon
 * @param {object}  dunjonPropValue.value - The new value for the prop of the dunjon
 */
function updateProp (state, { id, prop, value }) {
  const dunjon = getters.getDunjonById(state)(id)

  Vue.set(dunjon, prop, value)
}

const mutations = {
  /**
   * Add a new dunjon or update an existing one
   * @param {object} state  - The dunjons state
   * @param {object} dunjon - The dunjon to be added
   */
  addDunjon (state, { dunjon }) {
    if (!dunjon.id) {
      console.log('adding new id')
      const lastDunjon = getters.getLastDunjon(state)()
      console.log(`lastDunjon : ${lastDunjon}`)
      dunjon.id = (lastDunjon) ? lastDunjon.id + 1 : 0
      console.log(`dunjon id: ${dunjon.id}`)
    }

    const existing = state.dunjons.findIndex(e => e.id === dunjon.id)
    if (existing !== -1) {
      const keys = Object.keys(dunjon)
      for (const key of keys) {
        if (key === 'id') continue
        updateProp(state, { id: dunjon.id, prop: key, value: dunjon[key] })
      }
    } else {
      state.dunjons.push(dunjon)
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
