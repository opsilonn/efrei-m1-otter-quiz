<template>
  <div class="prettyBackground" style="height: 100%">
    <!-- Turn and category -->
    <div>
      <label>
        <h2 align="center" style="font-size: 3vh">
            Dungeon n° {{ dungeon.number }} : {{ dungeonCategoryName }}
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
import EventBus from '@/EventBus.js'
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
    ...mapState('dungeons', ['dungeons']),
    ...mapState('rounds', ['rounds']),

    // Getters
    ...mapGetters('parties', ['getPartyById']),
    ...mapGetters('dungeons', ['getLastDungeonByPartyId']),
    ...mapGetters('rounds', ['getLastRoundByDungeonId']),
    ...mapGetters('trivias', ['getTriviaCategoryNameById']),

    // Custom
    partyId () {
      return parseInt(this.$route.params.partyId)
    },
    party () {
      return this.getPartyById(this.partyId) || {}
    },
    dungeon () {
      return this.getLastDungeonByPartyId(this.partyId) || { category: 'none', difficulty: 'none', roundTime: 0, number: '0' }
    },
    round () {
      return this.getLastRoundByDungeonId(this.dungeon.id) || { result: 'none', number: '0' }
    },
    dungeonCategoryName () {
      return this.dungeon ? this.getTriviaCategoryNameById(this.dungeon.category) : 'none'
    }
  },
  methods: {
  },
  created () {
    EventBus.$on('party-start', this.$forceUpdate)
  }
}
</script>
