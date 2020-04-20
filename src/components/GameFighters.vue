<template>
  <div class="prettyBackground" style="height: 100%">
    <!-- Turn and category -->
    <div>
      <label>
        <h2 align="center" style="font-size: 3vh">
            Dunjon n° {{ dunjon.number }} : {{ dunjon.category }}
            <br/>
            Round n° {{ round.number }}
        </h2>
      </label>
    </div>

    <!-- Display the players -->
    <div class="d-flex align-end" style="height: 100%; padding-bottom: 9vh">
      <v-row no-gutters class="d-flex align-end">
        <GamePlayers
          :player="userPlayer"
          :doAnim="doAnim"
        />
        <GamePlayers
          :player="ennemiPlayer"
          :doAnim="doAnim"
        />
      </v-row>
    </div>
  </div>
</template>

<script>

import GamePlayers from '@/components/GamePlayers'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'GameFighters',
  components: {
    GamePlayers
  },
  props: ['playerId'],
  data: () => {
    return {
      doAnim: false,
      userPlayer: {
        name: 'I\'m the player !',
        imagePath: require('@/assets/sprite_player_1.png'),
        hp: 3,
        hpMax: 5,
        money: 45,
        isPlayer: true
      },
      ennemiPlayer: {
        name: 'I\'m the foe !',
        imagePath: require('@/assets/sprite_player_3.png'),
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
    player () {
      return this.getPlayerById(this.playerId)
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

<style>

/* Sets up a picture background properly */
.prettyBackground {
  background-image: url('../assets/background_1.jpg');
  background-color: transparent;
  background-repeat: repeat;
  background-position: center;
  background-size: cover;
}

</style>
