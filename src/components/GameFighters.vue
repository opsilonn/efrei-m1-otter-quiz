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

        <!-- First player : the user -->
        <GamePlayers :isPlayer="true"/>

        <!-- Second player : the bot -->
        <GamePlayers :isPlayer="false"/>

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
  computed: {
    // States
    ...mapState('parties', ['parties']),
    ...mapState('dunjons', ['dunjons']),
    ...mapState('rounds', ['rounds']),

    // Getters
    ...mapGetters('parties', ['getPartyById']),
    ...mapGetters('dunjons', ['getLastDunjonByPartyId']),
    ...mapGetters('rounds', ['getLastRoundByDunjonId']),

    // Custom
    partyId () {
      return this.$route.params.partyId
    },
    dunjon () {
      return this.getLastDunjonByPartyId(this.partyId) || { category: 'none', difficulty: 'none', number: '0' }
    },
    round () {
      return this.getLastRoundByDunjonId(this.dunjon.id) || { roundTime: '0', result: 'none', number: '0' }
    }
  },
  methods: {
  }
}
</script>
