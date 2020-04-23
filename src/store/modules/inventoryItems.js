import Vue from 'vue'

const state = {
  inventoryItems: []
}

const getters = {
  /**
   * Get the inventoryItem by its id
   * @param {number} id - The id of the inventory
   */
  getInventoryItemById: state => (id) => {
    return state.inventoryItems.find(inventoryItem => inventoryItem.id === id)
  },

  /**
   * Get all the inventoryItem items with a specific playerStatId
   * @param {number} playerstatId - The id of the playerstat
   */
  getInventoryItemsByPlayerStatId: state => (playerstatId) => {
    return state.inventoryItems.filter(inventoryItem => inventoryItem.playerstatId === playerstatId)
  },

  /**
   * Get the last inventoryItem fetched
   */
  getLastInventory: state => () => {
    return state.inventoryItems.sort((_1, _2) => _1.id - _2.id).slice(-1)[0]
  }
}

/**
 * Update all the prop of the inventoryItem by the given id
 * @param {object}  state                 - The inventoryItems state
 * @param {object}  inventoryPropValue
 * @param {number}  inventoryPropValue.id    - The id of the inventory
 * @param {string}  inventoryPropValue.prop  - The key of a prop of the inventory
 * @param {object}  inventoryPropValue.value - The new value for the prop of the inventory
 */
function updateProp (state, { id, prop, value }) {
  const inventoryItem = getters.getInventoryById(state)(id)

  Vue.set(inventoryItem, prop, value)
}

const mutations = {
  /**
   * Add a new inventoryItem or update an existing one
   * @param {object} state  - The inventoryItems state
   * @param {object} inventoryItem - The inventoryItem to be added
   */
  addInventoryItem (state, { inventoryItem }) {
    if (!inventoryItem.id) {
      const lastInventoryItem = getters.getLastInventory(state)()
      inventoryItem.id = (lastInventoryItem) ? lastInventoryItem.id + 1 : 0
    }

    const existing = state.inventoryItems.findIndex(e => e.id === inventoryItem.id)
    if (existing !== -1) {
      const keys = Object.keys(inventoryItem)
      for (const key of keys) {
        if (key === 'id') continue
        updateProp(state, { id: inventoryItem.id, prop: key, value: inventoryItem[key] })
      }
    } else {
      state.inventoryItems.push(inventoryItem)
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
