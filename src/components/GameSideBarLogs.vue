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
                  (isPlayerCorrect(round) && answer.value) ? 'green darken-4' :
                  (isPlayerCorrect(round) && !answer.value) ? 'red darken-3' :
                  (!isPlayerCorrect(round) && answer.value) ? 'green darken-2' : 'red darken-5'"
                >
                  {{isThePlayersAnswer(round, answer) ? 'mdi-check-box-outline' : 'mdi-checkbox-blank-outline'}}
                </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <div
                  v-html="answer.answer"
                  :style="(isThePlayersAnswer(round.trivia, answer) ? 'font-weight: bolder' : 'font-weight: normal')"
                  :class="
                  (isPlayerCorrect(round) && answer.value) ? 'green--text text--darken-4' :
                  (isPlayerCorrect(round) && !answer.value) ? 'red--text text--darken-3' :
                  (!isPlayerCorrect(round) && answer.value) ? 'green--text text--darken-2' : 'red--text text--darken-5'"
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
      return round.result === 'Succeded'
    },
    isTheAnswerCorrect (question, answer) {
      return true // question.correctAnswer === question.answers.indexOf(answer)
    },
    isThePlayersAnswer (question, answer) {
      return true // question.playerAnswer === question.answers.indexOf(answer)
    },

    // Returns a list of the Rounds, minus the last one that has not been answered yet
    roundsPlayed () {
      // We initialize a List
      var list = []

      // We add all the questions to our List several times
      for (var i = 0; i < this.rounds.length - 1; i++) {
        list.push(this.rounds[i])
      }

      // We return the List
      return list
    }
  },
  computed: {
    // State
    ...mapState('parties', ['parties']),
    ...mapState('dunjons', ['dunjons']),
    ...mapState('rounds', ['rounds']),

    // Getter
    ...mapGetters('parties', ['getPartyById']),
    ...mapGetters('dunjons', ['getLastDunjonByPartyId']),
    ...mapGetters('rounds', ['getRoundsByDunjonId']),

    partyId () {
      return this.$route.params.partyId
    },
    party () {
      return this.getPartyById(this.partyId)
    },
    dunjon () {
      return this.getLastDunjonByPartyId(this.partyId)
    },
    rounds () {
      return this.getRoundsByDunjonId(this.dunjon.id)
    }
  }
}
</script>
