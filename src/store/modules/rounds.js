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
   * Get all the rounds with a specific dunjon id
   * @param {number} dunjonId - The id of the dunjon
   */
  getRoundsByDunjonId: state => (dunjonId) => {
    return state.rounds.filter(round => round.dunjonId === dunjonId)
  },

  /**
   * Get the last round with a specific dunjon id
   * @param {number} dunjonId - The id of the dunjon
   */
  getLastRoundByDunjonId: state => (dunjonId) => {
    const roundsForDunjonId = getters.getRoundsByDunjonId(state)(dunjonId) || []
    console.log(roundsForDunjonId)
    return roundsForDunjonId.sort((_1, _2) => _1.id - _2.id).slice(-1)[0]
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
  console.log('updateProp id :')
  console.log(id)
  const round = getters.getRoundById(state)(id)

  console.log('updateProp round : id')
  console.log(round.id)
  if (round) {
    console.log(`Update prop ${prop} with value ${value}`)
    console.log(`from ${round[prop]}`)
    Vue.set(round, prop, value)
    console.log(`to ${round[prop]}`)
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
  nextRound (state, { round }) {
    const nextRound = {
      dunjonId: round.dunjonId,
      roundTime: round.roundTime,
      number: parseInt(round.number) + 1
    }
    mutations.addRound(state, { round: nextRound })
  },
  setRoundResult (state, { roundId, result }) {
    console.log('changing round s result')
    console.log(roundId)
    updateProp(state, { id: roundId, prop: 'result', value: result })
    // Second update or it don't work
    // updateProp(state, { id: round.id, prop: '', value: '' })
  },
  updateProp (state, { id, prop, value }) {
    updateProp(state, { id, prop, value })
  },
  refreshProps (state, { round }) {
    refreshProps(state, { round })
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
