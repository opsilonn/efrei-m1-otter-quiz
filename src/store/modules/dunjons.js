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
   * Get all the dunjons with a specific party id
   * @param {number} partyId - The id of the party
   */
  getDunjonsByPartyId: state => (partyId) => {
    const result = state.dunjons.filter(dunjon => dunjon.partyId === partyId)
    return result
  },

  /**
   * Get the last dunjon with a specific party id
   * @param {number} partyId - The id of the party
   */
  getLastDunjonByPartyId: state => (partyId) => {
    const dunjonsForPartyId = getters.getDunjonsByPartyId(state)(partyId) || []
    return dunjonsForPartyId.sort((_1, _2) => _1.id - _2.id).slice(-1)[0]
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
      const lastDunjon = getters.getLastDunjon(state)()
      dunjon.id = (lastDunjon) ? lastDunjon.id + 1 : 0
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
  nextDunjon ({ commit, rootGetters, getters }, { partyId, dunjon, defaultEnemyStat }) {
    console.log('[dunjons] nextDunjon')
    console.log(`[dunjons] getting parties/getPartyById: ${partyId}`)
    const party = rootGetters['parties/getPartyById'](partyId)
    console.log(`[dunjons] party.id: ${party.id}`)

    if (party.isFinished === true) {
      return
    }

    const lastDunjon = getters.getLastDunjonByPartyId(partyId)
    const number = (lastDunjon) ? parseInt(lastDunjon.number) + 1 : 1
    const newDunjon = {
      partyId,
      category: dunjon.category,
      difficulty: dunjon.difficulty,
      number
    }

    console.log(`[dunjons] commit addDunjon: ${newDunjon.id}`)
    commit('addDunjon', { dunjon: newDunjon })
    console.log(`[dunjons] commited addDunjon: ${newDunjon.id}`)

    defaultEnemyStat.dunjonId = newDunjon.id
    console.log('[parties] commit enemyStats/addEnemyStat')
    commit('enemyStats/nextEnemyStat', { dunjonId: newDunjon.id, enemyStat: defaultEnemyStat }, { root: true })

    console.log(`[dunjons] return dunjonId: ${newDunjon.id}`)
    return newDunjon.id
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
