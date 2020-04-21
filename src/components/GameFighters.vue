<template>
  <div class="prettyBackground" style="height: 100%">
    <!-- Turn and category -->
    <div>
      <label>
        <h2 align="center" style="font-size: 3vh">
            Dunjon n° {{ dunjon.number }} : {{ dunjon.category }}
            <br/>
            {{ round.id }} Round n° {{ round.number }} :
            {{ round.result }}
        </h2>
      </label>
    </div>

    <!-- Display the players -->
    <div class="d-flex align-end" style="height: 100%; padding-bottom: 9vh">
      <v-row no-gutters class="d-flex align-end">
        <GamePlayers
          :isPlayer="true"
          :doAnim="doAnim"
        />
        <GamePlayers
          :isPlayer="false"
          :doAnim="doAnim"
        />
      </v-row>
    </div>
  </div>
</template>

<script>
// import EventBus from '@/EventBus.js'
import GamePlayers from '@/components/GamePlayers'

import { mapState, mapGetters } from 'vuex'

export default {
  name: 'GameFighters',
  components: {
    GamePlayers
  },
  data: () => {
    return {
      doAnim: false,
      userPlayer: {
        name: 'I\'m the player !',
        hp: 3,
        hpMax: 5,
        money: 45,
        isPlayer: true
      },
      enemyPlayer: {
        name: 'I\'m the foe !',
        hp: 2,
        hpMax: 7,
        money: 15
      }
    }
  },
  computed: {
    // States
    ...mapState('players', ['players']),
    ...mapState('dunjons', ['dunjons']),
    ...mapState('rounds', ['rounds']),

    // Getters
    ...mapGetters('players', ['getPlayerById']),
    ...mapGetters('dunjons', ['getLastDunjonByPlayerId']),
    ...mapGetters('rounds', ['getLastRoundByDunjonId']),

    // Custom
    playerId () {
      return this.$route.params.playerId
    },
    dunjon () {
      return this.getLastDunjonByPlayerId(this.playerId) || { category: 'none', difficulty: 'none', number: '0' }
    },
    round () {
      return this.getLastRoundByDunjonId(this.dunjon.id) || { roundTime: '0', result: 'none', number: '0' }
    }
  }
}
</script>
