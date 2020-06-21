import Vue from 'vue'

const state = {
  enemyStats: []
}

const getters = {
  /**
   * Get the enemyStat by its id
   * @param {number} id - The id of the enemyStat
   */
  getEnemyStatById: state => (id) => {
    return state.enemyStats.find(enemyStat => enemyStat.id === id)
  },

  /**
   * Get all the enemy stats with a specific dungeon id
   * @param {number} dungeonId - The id of the dungeon
   */
  getEnemyStatByDungeonId: state => (dungeonId) => {
    return state.enemyStats.find(enemyStat => enemyStat.dungeonId === dungeonId)
  },

  /**
   * Get the last EnemyStat fetched
   */
  getLastEnemyStat: state => () => {
    return state.enemyStats.sort((_1, _2) => _1.id - _2.id).slice(-1)[0]
  }
}

/**
 * Update all the prop of the enemyStat by the given id
 * @param {object}  state                 - The enemyStats state
 * @param {object}  enemyStatPropValue
 * @param {number}  enemyStatPropValue.id    - The id of the enemyStat
 * @param {string}  enemyStatPropValue.prop  - The key of a prop of the enemyStat
 * @param {object}  enemyStatPropValue.value - The new value for the prop of the enemyStat
 */
function updateProp (state, { id, prop, value }) {
  const enemyStat = getters.getEnemyStatById(state)(id)

  Vue.set(enemyStat, prop, value)
}

const mutations = {
  /**
   * Add a new enemyStat or update an existing one
   * @param {object} state  - The enemyStats state
   * @param {object} enemyStat - The enemyStat to be added
   */
  addEnemyStat (state, { enemyStat }) {
    if (!enemyStat.id) {
      const lastEnemyStat = getters.getLastEnemyStat(state)()
      enemyStat.id = (lastEnemyStat) ? lastEnemyStat.id + 1 : 0
    }

    const existing = state.enemyStats.findIndex(e => e.id === enemyStat.id)
    if (existing !== -1) {
      const keys = Object.keys(enemyStat)
      for (const key of keys) {
        if (key === 'id') continue
        updateProp(state, { id: enemyStat.id, prop: key, value: enemyStat[key] })
      }
    } else {
      state.enemyStats.push(enemyStat)
    }
  },
  nextEnemyStat (state, { enemyStat, dungeonId }) {
    const nextEnemyStat = {
      dungeonId: dungeonId,
      maxHP: enemyStat.maxHP,
      HP: enemyStat.HP
    }
    mutations.addEnemyStat(state, { enemyStat: nextEnemyStat })
  },
  setEnemyStatHP (state, { enemyStat, HP }) {
    if (HP < 0) {
      HP = 0
    } else if (HP > enemyStat.maxHP) {
      HP = enemyStat.maxHP
    }

    updateProp(state, { id: enemyStat.id, prop: 'HP', value: HP })
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
