import Vue from 'vue'

const state = {
  ennemistats: []
}

const getters = {
  /**
   * Get the ennemistat by its id
   * @param {number} id - The id of the ennemistat
   */
  getEnnemiStatById: state => (id) => {
    return state.ennemistats.find(ennemistat => ennemistat.id === id)
  },

  /**
   * Get all the ennemi stats with a specific round id
   * @param {number} roundId - The id of the round
   */
  getEnnemiStatsByRoundId: state => (roundId) => {
    return state.ennemistats.filter(ennemistat => ennemistat.roundId === roundId)
  },

  /**
   * Get the last ennemiStat fetched
   */
  getLastEnnemiStat: state => () => {
    return state.ennemistats.sort((_1, _2) => _1.id - _2.id).slice(-1)[0]
  }
}

/**
 * Update all the prop of the ennemistat by the given id
 * @param {object}  state                 - The ennemistats state
 * @param {object}  ennemistatPropValue
 * @param {number}  ennemistatPropValue.id    - The id of the ennemistat
 * @param {string}  ennemistatPropValue.prop  - The key of a prop of the ennemistat
 * @param {object}  ennemistatPropValue.value - The new value for the prop of the ennemistat
 */
function updateProp (state, { id, prop, value }) {
  const ennemistat = getters.getEnnemiStatById(state)(id)

  Vue.set(ennemistat, prop, value)
}

const mutations = {
  /**
   * Add a new ennemistat or update an existing one
   * @param {object} state  - The ennemistats state
   * @param {object} ennemistat - The ennemistat to be added
   */
  addEnnemiStat (state, { ennemistat }) {
    if (!ennemistat.id) {
      console.log('adding new id')
      const lastEnnemiStat = getters.getLastEnnemiStat(state)()
      console.log(`lastEnnemiStat : ${lastEnnemiStat}`)
      ennemistat.id = (lastEnnemiStat) ? lastEnnemiStat.id + 1 : 0
      console.log(`ennemistat id: ${ennemistat.id}`)
    }

    const existing = state.ennemistats.findIndex(e => e.id === ennemistat.id)
    if (existing !== -1) {
      const keys = Object.keys(ennemistat)
      for (const key of keys) {
        if (key === 'id') continue
        updateProp(state, { id: ennemistat.id, prop: key, value: ennemistat[key] })
      }
    } else {
      state.ennemistats.push(ennemistat)
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
