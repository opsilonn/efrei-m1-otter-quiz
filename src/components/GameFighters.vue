<template>
  <div class="prettyBackground" style="height: 100%">
    <!-- Turn and category -->
    <div>
      <label>
        <h2 align="center" style="font-size: 3vh">
            Dungeon n° {{ dunjon.number }} : {{ dunjonCategoryName }}
            <br/>
            Round n° {{ round.number }} : {{ round.result }}
            <br/>
            score: {{ party.score }}
        </h2>
      </label>
    </div>

    <!-- Display the players -->
    <div class="d-flex align-end" style="height: 100%; padding-bottom: 13vh">
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
    ...mapGetters('trivias', ['getTriviaCategoryNameById']),

    // Custom
    partyId () {
      return this.$route.params.partyId
    },
    party () {
      return this.getPartyById(this.partyId)
    },
    dunjon () {
      return this.getLastDunjonByPartyId(this.partyId) || { category: 'none', difficulty: 'none', number: '0' }
    },
    round () {
      return this.getLastRoundByDunjonId(this.dunjon.id) || { roundTime: '0', result: 'none', number: '0' }
    },
    dunjonCategoryName () {
      return this.dunjon ? this.getTriviaCategoryNameById(this.dunjon.category) : 'none'
    }
  },
  methods: {
  }
}
</script>
