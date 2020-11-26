import Vue from 'vue'

const state = {
  dungeons: []
}

const getters = {

  /**
   * Get a random roundTime depending of the one of the current dungeon and the difficulty of the next one
   */
  getRandomRoundTime: state => (currentDungeonRoundTime, nextDungeonDifficulty) => {
    const rand = Math.random()

    if (nextDungeonDifficulty.toLowerCase() === 'hard') {
      Math.pow(rand, 3)
    } else if (nextDungeonDifficulty.toLowerCase() === 'medium') {
      Math.pow(rand, 2)
    }

    return currentDungeonRoundTime - (rand * 2 * 1000)
  },

  /**
   * Get the dungeon by its id
   * @param {number} id - The id of the dungeon
   */
  getDungeonById: state => (id) => {
    return state.dungeons.find(dungeon => dungeon.id === id)
  },

  /**
   * Get all the dungeons with a specific party id
   * @param {number} partyId - The id of the party
   */
  getDungeonsByPartyId: state => (partyId) => {
    const result = state.dungeons.filter(dungeon => dungeon.partyId === partyId)
    return result
  },

  /**
   * Get the last dungeon with a specific party id
   * @param {number} partyId - The id of the party
   */
  getLastDungeonByPartyId: state => (partyId) => {
    const dungeonsForPartyId = getters.getDungeonsByPartyId(state)(partyId) || []
    return dungeonsForPartyId.sort((_1, _2) => _1.id - _2.id).slice(-1)[0]
  },

  /**
   * Get the last dungeon fetched
   */
  getLastDungeon: state => () => {
    return state.dungeons.sort((_1, _2) => _1.id - _2.id).slice(-1)[0]
  }
}

/**
 * Update all the prop of the dungeon by the given id
 * @param {object}  state                 - The dungeons state
 * @param {object}  dungeonPropValue
 * @param {number}  dungeonPropValue.id    - The id of the dungeon
 * @param {string}  dungeonPropValue.prop  - The key of a prop of the dungeon
 * @param {object}  dungeonPropValue.value - The new value for the prop of the dungeon
 */
function updateProp (state, { id, prop, value }) {
  const dungeon = getters.getDungeonById(state)(id)

  Vue.set(dungeon, prop, value)
}

const mutations = {
  /**
   * Add a new dungeon or update an existing one
   * @param {object} state  - The dungeons state
   * @param {object} dungeon - The dungeon to be added
   */
  addDungeon (state, { dungeon }) {
    if (!dungeon.id) {
      const lastDungeon = getters.getLastDungeon(state)()
      dungeon.id = (lastDungeon) ? lastDungeon.id + 1 : 0
    }

    const existing = state.dungeons.findIndex(e => e.id === dungeon.id)
    if (existing !== -1) {
      const keys = Object.keys(dungeon)
      for (const key of keys) {
        if (key === 'id') continue
        updateProp(state, { id: dungeon.id, prop: key, value: dungeon[key] })
      }
    } else {
      state.dungeons.push(dungeon)
    }
  },
  updateProp (state, { id, prop, value }) {
    updateProp(state, { id, prop, value })
  }

}

const actions = {
  nextDungeon ({ commit, rootGetters, getters }, { partyId, dungeon, defaultEnemyStat }) {
    const party = rootGetters['parties/getPartyById'](partyId)

    if (party.isFinished === true) {
      return
    }

    const lastDungeon = getters.getLastDungeonByPartyId(partyId)
    const number = (lastDungeon) ? parseInt(lastDungeon.number) + 1 : 1
    const newDungeon = {
      partyId,
      category: dungeon.category,
      difficulty: dungeon.difficulty,
      roundTime: dungeon.roundTime,
      number
    }

    commit('addDungeon', { dungeon: newDungeon })

    defaultEnemyStat.dungeonId = newDungeon.id
    commit('enemyStats/nextEnemyStat', { dungeonId: newDungeon.id, enemyStat: defaultEnemyStat }, { root: true })

    return newDungeon.id
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
