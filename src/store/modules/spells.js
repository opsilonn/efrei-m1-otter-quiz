import Vue from 'vue'

const state = {
  spells: []
}

const getters = {
  /**
   * Get the spell by its id
   * @param {number} id - The id of the spell
   */
  getSpellById: state => (id) => {
    return state.spells.find(spell => spell.id === id)
  },

  /**
   * Get all the spells with a specific playerStatId
   * @param {number} playerstatId - The id of the playerstat
   */
  getSpellsByPlayerStatId: state => (playerstatId) => {
    return state.spells.filter(spell => spell.playerstatId === playerstatId)
  },

  /**
   * Get the last spell fetched
   */
  getLastSpell: state => () => {
    return state.spells.sort((_1, _2) => _1.id - _2.id).slice(-1)[0]
  }
}

/**
 * Update all the prop of the spell by the given id
 * @param {object}  state                 - The spells state
 * @param {object}  spellPropValue
 * @param {number}  spellPropValue.id    - The id of the spell
 * @param {string}  spellPropValue.prop  - The key of a prop of the spell
 * @param {object}  spellPropValue.value - The new value for the prop of the spell
 */
function updateProp (state, { id, prop, value }) {
  const spell = getters.getSpellById(state)(id)

  Vue.set(spell, prop, value)
}

const mutations = {
  /**
   * Add a new spell or update an existing one
   * @param {object} state  - The spells state
   * @param {object} spell - The spell to be added
   */
  addSpell (state, { spell }) {
    if (!spell.id) {
      const lastSpell = getters.getLastSpell(state)()
      spell.id = (lastSpell) ? lastSpell.id + 1 : 0
    }

    const existing = state.spells.findIndex(e => e.id === spell.id)
    if (existing !== -1) {
      const keys = Object.keys(spell)
      for (const key of keys) {
        if (key === 'id') continue
        updateProp(state, { id: spell.id, prop: key, value: spell[key] })
      }
    } else {
      state.spells.push(spell)
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
