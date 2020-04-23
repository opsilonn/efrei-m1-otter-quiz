import Vue from 'vue'

const state = {
  shopItems: []
}

const getters = {
  /**
   * Get the shopItem by its id
   * @param {number} id - The id of the shopItem
   */
  getShopItemById: state => (id) => {
    return state.shopItems.find(shopItem => shopItem.id === id)
  },

  /**
   * Get all the shopItem items with a specific playerStatId
   * @param {number} playerstatId - The id of the playerstat
   */
  getShopItemsByPlayerStatId: state => (playerstatId) => {
    return state.shopItems.filter(shopItem => shopItem.playerstatId === playerstatId)
  },

  /**
   * Get the last shopItem fetched
   */
  getLastShopItem: state => () => {
    return state.shopItems.sort((_1, _2) => _1.id - _2.id).slice(-1)[0]
  }
}

/**
 * Update all the prop of the shopItem by the given id
 * @param {object}  state                 - The shopItems state
 * @param {object}  shopItemPropValue
 * @param {number}  shopItemPropValue.id    - The id of the shopItem
 * @param {string}  shopItemPropValue.prop  - The key of a prop of the shopItem
 * @param {object}  shopItemPropValue.value - The new value for the prop of the shopItem
 */
function updateProp (state, { id, prop, value }) {
  const shopItem = getters.getShopItemById(state)(id)

  Vue.set(shopItem, prop, value)
}

const mutations = {
  /**
   * Add a new shopItem or update an existing one
   * @param {object} state  - The shopItems state
   * @param {object} shopItem - The shopItem to be added
   */
  addShopItem (state, { shopItem }) {
    if (!shopItem.id) {
      const lastShopItem = getters.getLastShopItem(state)()
      shopItem.id = (lastShopItem) ? lastShopItem.id + 1 : 0
    }

    const existing = state.shopItems.findIndex(e => e.id === shopItem.id)
    if (existing !== -1) {
      const keys = Object.keys(shopItem)
      for (const key of keys) {
        if (key === 'id') continue
        updateProp(state, { id: shopItem.id, prop: key, value: shopItem[key] })
      }
    } else {
      state.shopItems.push(shopItem)
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
