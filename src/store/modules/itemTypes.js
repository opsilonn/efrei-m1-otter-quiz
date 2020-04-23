import Vue from 'vue'

const state = {
  ItemTypes: [
    {
      id: 0,
      name: 'Health potion',
      description: 'Heal 1 HP'
    },
    {
      id: 1,
      name: 'Mana potion',
      description: 'Restore 1 mana'
    }
  ]
}

const getters = {
  /**
   * Get the itemtype by its id
   * @param {number} id - The id of the itemtype
   */
  getItemTypeById: state => (id) => {
    return state.itemtypes.find(itemtype => itemtype.id === id)
  },

  /**
   * Get all the itemtype items with a specific playerStatId
   * @param {number} playerstatId - The id of the playerstat
   */
  getItemTypesByPlayerStatId: state => (playerstatId) => {
    return state.itemtypes.filter(itemtype => itemtype.playerstatId === playerstatId)
  },

  /**
   * Get the last itemtype fetched
   */
  getLastItemType: state => () => {
    return state.itemtypes.sort((_1, _2) => _1.id - _2.id).slice(-1)[0]
  }
}

/**
 * Update all the prop of the itemtype by the given id
 * @param {object}  state                 - The itemtypes state
 * @param {object}  itemtypePropValue
 * @param {number}  itemtypePropValue.id    - The id of the itemtype
 * @param {string}  itemtypePropValue.prop  - The key of a prop of the itemtype
 * @param {object}  itemtypePropValue.value - The new value for the prop of the itemtype
 */
function updateProp (state, { id, prop, value }) {
  const itemtype = getters.getItemTypeById(state)(id)

  Vue.set(itemtype, prop, value)
}

const mutations = {
  /**
   * Add a new itemtype or update an existing one
   * @param {object} state  - The itemtypes state
   * @param {object} itemtype - The itemtype to be added
   */
  addItemType (state, { itemtype }) {
    if (!itemtype.id) {
      const lastItemType = getters.getLastItemType(state)()
      itemtype.id = (lastItemType) ? lastItemType.id + 1 : 0
    }

    const existing = state.itemtypes.findIndex(e => e.id === itemtype.id)
    if (existing !== -1) {
      const keys = Object.keys(itemtype)
      for (const key of keys) {
        if (key === 'id') continue
        updateProp(state, { id: itemtype.id, prop: key, value: itemtype[key] })
      }
    } else {
      state.itemtypes.push(itemtype)
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
