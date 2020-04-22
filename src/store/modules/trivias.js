import Vue from 'vue'
import axios from 'axios'

import config from '../../client.config'

/** @param {String} path */
function api (path) {
  return config.apiTriviaURL + path
}

const state = {
  triviaCategories: [],
  trivias: []
}

const getters = {
  /**
   * Get the last trivia fetched
   */
  getTriviaCategoryNameById: state => (id) => {
    const triviaCategory = state.triviaCategories.find((trivia) => trivia.id === id) || {}
    console.log(`triviaCategory.name: ${triviaCategory.name}`)
    return triviaCategory.name
  },

  /**
   * Get the last trivia fetched
   */
  getLastTrivia: state => () => {
    return state.trivias.sort((_1, _2) => _1.id - _2.id).slice(-1)[0]
  },

  /**
   * Get the trivia by its id
   * @param {number} id - The id of the trivia
   */
  getTriviaById: state => (id) => {
    return state.trivias.find(trivia => trivia.id === id)
  }
}

/**
 * Update all the prop of the trivia by the given id
 * @param {object}  state                 - The trivias state
 * @param {object}  triviaPropValue
 * @param {number}  triviaPropValue.id    - The id of the trivia
 * @param {string}  triviaPropValue.prop  - The key of a prop of the trivia
 * @param {object}  triviaPropValue.value - The new value for the prop of the trivia
 */
function updateProp (state, { id, prop, value }) {
  const trivia = getters.getTriviaById(state)(id)

  Vue.set(trivia, prop, value)
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} array An array containing the items.
 */
function shuffle (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const x = array[i]
    array[i] = array[j]
    array[j] = x
  }
}

const mutations = {
  /**
   * Add a new trivia or update an existing one
   * @param {object} state  - The trivias state
   * @param {object} trivia - The trivia to be added
   */
  addTrivia (state, { trivia }) {
    if (!trivia.id) {
      const lastTrivia = getters.getLastTrivia(state)()
      trivia.id = (lastTrivia) ? lastTrivia.id + 1 : 0
    }

    trivia.answers = []
    trivia.answers.push({ answer: trivia.correct_answer, value: true })
    trivia.incorrect_answers.forEach((incorrectAnswer) => {
      trivia.answers.push({ answer: incorrectAnswer, value: false })
    })
    shuffle(trivia.answers)

    const existing = state.trivias.findIndex(e => e.id === trivia.id)
    if (existing !== -1) {
      const keys = Object.keys(trivia)
      for (const key of keys) {
        if (key === 'id') continue
        updateProp(state, { id: trivia.id, prop: key, value: trivia[key] })
      }
    } else {
      state.trivias.push(trivia)
    }
  },
  /**
   * Add a new trivia or update an existing one
   * @param {object} state  - The trivias state
   * @param {object} trivia - The trivia to be added
   */
  addTriviaCategories (state, { triviaCategories }) {
    state.triviaCategories = triviaCategories
  },
  updateProp (state, { id, prop, value }) {
    updateProp(state, { id, prop, value })
  },
  shuffle (array) {
    shuffle(array)
  }

}

const actions = {
  /**
   * fetch new trivias :
   * @param {object} commit
   * @param {object} option - The options for the fetch
   * @param {number} option.amount - The amount of trivias to fetch
   * @param {string} option.category - The category of trivias to fetch
   * @param {('easy'|'medium'|'hard')} option.difficulty - The difficulty of trivias to fetch
   * @param {('boolean'|'multiple')} option.type - The type of trivias to fetch
   */
  async fetchTrivias ({ commit }, { amount, category, difficulty, type }) {
    const url = '' + ((amount) ? `amount=${amount}&` : '') + ((category) ? `category=${category}&` : '') + ((difficulty) ? `difficulty=${difficulty}&` : '' + ((type) ? `type=${type}&` : ''))
    console.log(api(url))
    const { data } = await axios.get(api(url))
    console.log('data :')
    console.log(data)
    data.results.forEach(d => commit('addTrivia', { trivia: d }))
  },

  async fetchTriviaCategories ({ commit }) {
    const { data } = await axios.get('https://opentdb.com/api_category.php')
    console.log('data :')
    console.log(data)
    commit('addTriviaCategories', { triviaCategories: data.trivia_categories })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
