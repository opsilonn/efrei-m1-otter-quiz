<template>
    <div class="indigo darken-3 height100">
          <v-card
            class="height100"
            dark
          >
            <!-- Progress bar -->
            <v-progress-linear
              v-model="timerToProgress"
              :color="timerToGradient"
              :background-color="timerToGradientDarken"/>
            <label
              class="d-flex justify-end align-end pr-3"
              :style="'color: ' + timerToGradient"
            >
              <h2>{{timerRemainingSec.toFixed(1)}}</h2>
              <h3>s</h3>
            </label>

            <!-- Questions -->
            <v-container>
            <h3 v-html="lastTrivia.question" class="pa-0" align="center"/>
            <v-row>
              <v-col cols="6"
                v-for="(answer, index) in lastTrivia.answers" v-bind:key="index"
                >
                <v-hover v-slot:default="{ hover }">
                  <v-container>
                    <!-- Card if the player HAS answered -->
                    <v-card v-if="hasPlayerAnswered"
                      :style="'background-color: ' + (answer.value ? themes.Success : themes.Failure)"
                      >
                      <v-card-text v-html="answer.answer"/>
                    </v-card>

                    <!-- Card if the player HAS NOT answered -->
                    <v-card v-else
                      :style="'background-color: ' + (hover ? themes.DarkLighter : themes.DarkLight)"
                      @click="chooseAnswer"
                      >
                      <v-card-text v-html="answer.answer"/>
                    </v-card>
                  </v-container>
                </v-hover>
              </v-col>
            </v-row>
            </v-container>
          </v-card>
    </div>
</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'GameQuestions',
  props: ['playerId'],
  data: () => ({
    trivia: null,
    timerLength: 20000,
    timerBegin: null,
    timerEnd: null,
    timerRemaining: null,
    hasPlayerAnswered: false
  }),
  computed: {
    // States
    ...mapState('themes', ['themes']),
    ...mapState('players', ['players']),
    ...mapState('dunjons', ['dunjons']),
    ...mapState('rounds', ['rounds']),
    ...mapState('trivias', ['trivias']),

    // Getters
    ...mapGetters('players', ['getPlayerById']),
    ...mapGetters('dunjons', ['getLastDunjonByPlayerId']),
    ...mapGetters('rounds', ['getLastRoundByDunjonId']),
    ...mapGetters('trivias', ['getLastTrivia']),

    // Custom
    player () {
      return this.getPlayerById(this.playerId)
    },
    dunjon () {
      return this.getLastDunjonByPlayerId(this.playerId) || { category: '0', difficulty: 'none', number: '0' }
    },
    round () {
      return this.getLastRoundByDunjonId(this.dunjon.id) || { roundTime: '0', result: 'none', number: '0' }
    },
    lastTrivia () {
      return this.getLastTrivia() || {}
    },
    timerRemainingSec () {
      return Math.abs((this.timerRemaining || 0.0) / 1000)
    },
    timerToProgress () {
      return ((this.timerEnd - this.timerBegin) - this.timerRemaining) / (this.timerEnd - this.timerBegin) * 100
    },
    timerToRed () {
      return parseFloat((this.timerToProgress / 100 * 255).toFixed(0))
    },
    timerToGreen () {
      return parseFloat(255 - this.timerToRed)
    },
    timerToGradient () {
      return '#' + this.timerToRed.toString(16) + this.timerToGreen.toString(16) + '00'
    },
    timerToGradientDarken () {
      return '#' + (this.timerToRed / 255 * 153).toString(16) + (this.timerToGreen / 255 * 153).toString(16) + '00'
    }
  },
  methods: {
    // Actions
    ...mapActions('trivias', ['fetchTrivias']),

    resetTimer () {
      this.fetchTrivias({ amount: 1, category: this.dunjon.category })
      this.round.number += 1
      this.timerBegin = Date.now()
      this.timerEnd = this.timerBegin + this.timerLength

      setTimeout(this.resetTimer, this.timerLength + 2000)
      this.updateTimer()
    },

    // Updates the timer
    updateTimer () {
      this.timerRemaining = (this.timerEnd - Date.now())

      if (!this.hasPlayerAnswered || this.timerRemaining > 0.12) {
        setTimeout(this.updateTimer, 100)
      }
    },

    // Method called when the user chooses an answer
    chooseAnswer () {
      this.hasPlayerAnswered = true
    }
  },
  async mounted () {
    this.resetTimer()
  }
}
</script>
