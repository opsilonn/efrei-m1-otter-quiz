import Vue from 'vue'
import Vuex from 'vuex'

import themesStore from './modules/themes'
import AccountStore from './modules/accounts'
import PartyStore from './modules/parties'
import DungeonStore from './modules/dungeons'
import RoundStore from './modules/rounds'
import EnemyStatStore from './modules/enemyStats'
import PlayerStatStore from './modules/playerStats'
import InventoryItemStore from './modules/inventoryItems'
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
    parties: PartyStore,
    dungeons: DungeonStore,
    rounds: RoundStore,
    enemyStats: EnemyStatStore,
    playerStats: PlayerStatStore,
    inventoryItems: InventoryItemStore,
    spells: SpellStore,
    trivias: TriviasStore
  }
})
