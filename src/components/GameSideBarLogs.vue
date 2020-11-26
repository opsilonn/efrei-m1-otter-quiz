<template>
  <v-list
    style="background-color: inherit"
    flat
    subheader
  >
    <!-- The next line adds a Label, but I'm not sure we really need it -->
    <!-- <v-subheader dark><label>History</label></v-subheader> -->

    <!-- We iterate through the rounds -->
    <div
      v-for="(round, index) in roundsPlayed()" :key="round.id"
      >
      <!-- A divider between each round -->
      <v-divider/>

      <!-- We create a dropdown for the current round -->
      <v-list-item
        :style="'background-color: ' + (isPlayerCorrect(round) ? '#56966D' : '#954542')"
        @click="expendId == index ? expendId = null : expendId = index"
      >
        <!-- We create a dropdown for the current question -->
        <v-list-item-content>

          <!-- Trivia's question -->
          <v-list-item-title
            class="font-weight-black grey--text text--darken-4" v-html="round.trivia.question"/>

          <!-- If the current trivia is selected -->
          <v-list
            v-if="expendId == index"
            dense
          >
            <!-- We display all the trivia's answers -->
            <v-list-item v-for="(answer) in round.trivia.answers" :key="answer.id">
              <v-list-item-icon>
                <v-icon
                  :color="
                  (round.result === 'Succeeded' && answer.value) ? 'green darken-4' :
                  (round.result === 'Succeeded' && !answer.value) ? 'red darken-3' :
                  (round.result !== 'Succeeded' && answer.value) ? 'green darken-2' : 'red darken-5'"
                >
                  {{ (round.answer === answer) ? 'mdi-check-box-outline' : 'mdi-checkbox-blank-outline'}}
                </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <div
                  v-html="answer.answer"
                  :style="(round.answer === answer ? 'font-weight: bolder' : 'font-weight: normal')"
                  :class="
                  (round.result === 'Succeeded' && answer.value) ? 'green--text text--darken-4' :
                  (round.result === 'Succeeded' && !answer.value) ? 'red--text text--darken-3' :
                  (round.result !== 'Succeeded' && answer.value) ? 'green--text text--darken-2' : 'red--text text--darken-5'"
                />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-list-item-content>

        <!-- Icon to expand the dropdown -->
        <v-list-item-icon>
          <v-icon :style="(expendId == index) ? 'opacity: 80%' : 'opacity: 30%'">{{(expendId == index) ? "mdi-chevron-up" : "mdi-chevron-down"}}</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </div>
  </v-list>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'GameSideBarLogs',
  data: () => ({
    expendId: {}
  }),
  methods: {
    isPlayerCorrect (round) {
      return round.result === 'Succeeded'
    },

    // Returns a list of the Rounds, minus the last one that has not been answered yet
    roundsPlayed () {
      // We initialize a List
      var list = []

      // We add all the questions to our List, starting by the most recents
      // Why minus 2 ?
      // - because we draw one from the array length (array of size 10 -> from 0 to 9, with 10 minus 1 is 9)
      // - because we don't keep the current round, which is located at the end of the array
      // Hence the minus 2
      for (var i = this.rounds.length - 2; i >= 0; i--) {
        list.push(this.rounds[i])
      }

      // We return the List
      return list
    }
  },
  computed: {
    // State
    ...mapState('parties', ['parties']),
    ...mapState('dungeons', ['dungeons']),
    ...mapState('rounds', ['rounds']),

    // Getter
    ...mapGetters('parties', ['getPartyById']),
    ...mapGetters('dungeons', ['getLastDungeonByPartyId']),
    ...mapGetters('rounds', ['getRoundsByDungeonId']),

    partyId () {
      return this.$route.params.partyId
    },
    party () {
      return this.getPartyById(this.partyId)
    },
    dungeon () {
      return this.getLastDungeonByPartyId(this.partyId)
    },
    rounds () {
      return this.dungeon ? this.getRoundsByDungeonId(this.dungeon.id) : 0
    },
    totalRounds () {
      let rounds = []
      const dungeons = this.getDungeonsByPartyId(this.partyId)
      dungeons.forEach((dungeon) => {
        rounds = rounds.concat(this.getRoundsByDungeonId(dungeon.id))
      })
      return rounds
    }
  }
}
</script>
