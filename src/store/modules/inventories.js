import Vue from 'vue'

const state = {
  inventories: []
}

const getters = {
  /**
   * Get the inventory by its id
   * @param {number} id - The id of the inventory
   */
  getInventoryById: state => (id) => {
    return state.inventories.find(inventory => inventory.id === id)
  },

  /**
   * Get all the inventory items with a specific playerStatId
   * @param {number} playerstatId - The id of the playerstat
   */
  getInventoriesByPlayerStatId: state => (playerstatId) => {
    return state.inventories.filter(inventory => inventory.playerstatId === playerstatId)
  },

  /**
   * Get the last inventory fetched
   */
  getLastInventory: state => () => {
    return state.inventories.sort((_1, _2) => _1.id - _2.id).slice(-1)[0]
  }
}

/**
 * Update all the prop of the inventory by the given id
 * @param {object}  state                 - The inventories state
 * @param {object}  inventoryPropValue
 * @param {number}  inventoryPropValue.id    - The id of the inventory
 * @param {string}  inventoryPropValue.prop  - The key of a prop of the inventory
 * @param {object}  inventoryPropValue.value - The new value for the prop of the inventory
 */
function updateProp (state, { id, prop, value }) {
  const inventory = getters.getInventoryById(state)(id)

  Vue.set(inventory, prop, value)
}

const mutations = {
  /**
   * Add a new inventory or update an existing one
   * @param {object} state  - The inventories state
   * @param {object} inventory - The inventory to be added
   */
  addInventory (state, { inventory }) {
    if (!inventory.id) {
      console.log('adding new id')
      const lastInventory = getters.getLastInventory(state)()
      console.log(`lastInventory : ${lastInventory}`)
      inventory.id = (lastInventory) ? lastInventory.id + 1 : 0
      console.log(`inventory id: ${inventory.id}`)
    }

    const existing = state.inventories.findIndex(e => e.id === inventory.id)
    if (existing !== -1) {
      const keys = Object.keys(inventory)
      for (const key of keys) {
        if (key === 'id') continue
        updateProp(state, { id: inventory.id, prop: key, value: inventory[key] })
      }
    } else {
      state.inventories.push(inventory)
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
