import Vue from 'vue'

const state = {
  rounds: []
}

const getters = {
  /**
   * Get the round by its id
   * @param {number} id - The id of the round
   */
  getRoundById: state => (id) => {
    return state.rounds.find(round => round.id === id)
  },

  /**
   * Get all the rounds with a specific dungeon id
   * @param {number} dungeonId - The id of the dungeon
   */
  getRoundsByDungeonId: state => (dungeonId) => {
    return state.rounds.filter(round => round.dungeonId === dungeonId)
  },

  /**
   * Get the last round with a specific dungeon id
   * @param {number} dungeonId - The id of the dungeon
   */
  getLastRoundByDungeonId: state => (dungeonId) => {
    const roundsForDungeonId = getters.getRoundsByDungeonId(state)(dungeonId) || []
    return roundsForDungeonId.sort((_1, _2) => _1.id - _2.id).slice(-1)[0]
  },

  /**
   * Get the last round fetched
   */
  getLastRound: state => () => {
    return state.rounds.sort((_1, _2) => _1.id - _2.id).slice(-1)[0]
  }
}

/**
 * Update all the prop of the round by the given id
 * @param {object}  state                 - The rounds state
 * @param {object}  roundPropValue
 * @param {number}  roundPropValue.id    - The id of the round
 * @param {string}  roundPropValue.prop  - The key of a prop of the round
 * @param {object}  roundPropValue.value - The new value for the prop of the round
 */
function updateProp (state, { id, prop, value }) {
  const round = getters.getRoundById(state)(id)

  if (round) {
    Vue.set(round, prop, value)
  }
}

function refreshProps (state, { round }) {
  const keys = Object.keys(round)
  for (const key of keys) {
    if (key === 'id') continue
    updateProp(state, { id: round.id, prop: key, value: round[key] })
  }
}

const mutations = {
  /**
   * Add a new round or update an existing one
   * @param {object} state  - The rounds state
   * @param {object} round - The round to be added
   */
  addRound (state, { round }) {
    if (!round.id) {
      const lastRound = getters.getLastRound(state)()
      round.id = (lastRound) ? lastRound.id + 1 : 0
    }

    const existing = state.rounds.findIndex(e => e.id === round.id)
    if (existing !== -1) {
      refreshProps(state, round)
    } else {
      state.rounds.push(round)
    }
  },
  setRoundResult (state, { roundId, result }) {
    updateProp(state, { id: roundId, prop: 'result', value: result })
  },
  setRoundAnswer (state, { roundId, answer }) {
    updateProp(state, { id: roundId, prop: 'answer', value: answer })
  },
  updateProp (state, { id, prop, value }) {
    updateProp(state, { id, prop, value })
  },
  refreshProps (state, { round }) {
    refreshProps(state, { round })
  }

}

const actions = {
  nextRound ({ commit, rootGetters, getters }, { dungeonId, trivia }) {
    const dungeon = rootGetters['dungeons/getDungeonById'](dungeonId)
    const party = rootGetters['parties/getPartyById'](dungeon.partyId)

    if (party.isFinished === true) {
      return
    }

    const lastRound = getters.getLastRoundByDungeonId(dungeonId)
    const number = (lastRound) ? parseInt(lastRound.number) + 1 : 1
    const newRound = {
      dungeonId,
      trivia,
      number
    }
    commit('addRound', { round: newRound })

    return newRound.id
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
