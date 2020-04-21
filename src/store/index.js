import Vue from 'vue'
import Vuex from 'vuex'

import themesStore from './modules/themes'
import AccountStore from './modules/accounts'
import PlayerStore from './modules/players'
import DunjonStore from './modules/dunjons'
import RoundStore from './modules/rounds'
import EnemyStatStore from './modules/enemyStats'
import PlayerStatStore from './modules/playerStats'
import InventoryStore from './modules/inventories'
import SpellStore from './modules/spells'
import TriviasStore from './modules/trivias'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  actions: {},
  mutations: {},
  getters: {},
  modules: {
    themes: themesStore,
    accounts: AccountStore,
    players: PlayerStore,
    dunjons: DunjonStore,
    rounds: RoundStore,
    enemyStats: EnemyStatStore,
    playerStats: PlayerStatStore,
    inventories: InventoryStore,
    spells: SpellStore,
    trivias: TriviasStore
  }
})
