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
        <h3 v-html="trivia.question" class="pa-0" align="center"/>
        <v-row>
          <v-col cols="6"
            v-for="(answer, index) in trivia.answers" v-bind:key="index"
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
import EventBus from '@/EventBus.js'

import { mapState, mapGetters } from 'vuex'

export default {
  name: 'GameQuestions',
  props: ['playerId'],
  data: () => ({
    timer: {
      length: 0,
      begin: 0,
      end: 0,
      remaining: 0
    },
    trivia: {},
    step: 1,
    yourAnswer: { answer: '' },
    hasPlayerAnswered: false
  }),
  computed: {
    // States
    ...mapState('themes', ['themes']),
    ...mapState('players', ['players']),
    ...mapState('dunjons', ['dunjons']),
    ...mapState('rounds', ['rounds']),

    // Getters
    ...mapGetters('players', ['getPlayerById']),
    ...mapGetters('dunjons', ['getDunjonsByPlayerId', 'getLastDunjonByPlayerId']),
    ...mapGetters('rounds', ['getLastRoundByDunjonId']),

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
    timerRemainingSec () {
      return Math.abs((this.timer.remaining || 0.0) / 1000)
    },
    timerToProgress () {
      return ((this.timer.end - this.timer.begin) - this.timer.remaining) / (this.timer.end - this.timer.begin) * 100
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
    // Custom
    validate () {
      console.log('[GameQuestion] Emit timer-stop')
      EventBus.$emit('timer-stop', { timer: this.timer })
    },

    // Method called when the user chooses an answer
    chooseAnswer () {
      this.hasPlayerAnswered = true
    },

    // Event handlers
    onTimer_start ({ timer, trivia }) {
      this.hasPlayerAnswered = false
      console.log('[GameQuestion] On event timer-start')
      this.yourAnswer = { answer: 'none' }
      this.timer = timer
      this.trivia = trivia
      this.step = 1
    },
    onTimer_update ({ timer }) {
      this.timer = timer
    },
    onTimer_end ({ timer }) {
      console.log('[GameQuestion] On event timer-end')
      this.timer = timer
      this.step = 0
    },
    onTimer_reset ({ timer }) {
      console.log('[GameQuestion] On event timer-reset')
      this.timer = timer
      this.step = 2

      if (this.yourAnswer.value === true) {
        console.log('[GameQuestion] Emit event trivia-success')
        EventBus.$emit('trivia-success')
      } else {
        console.log('[GameQuestion] Emit event trivia-failure')
        EventBus.$emit('trivia-failure')
      }
    }
  },
  created () {
    EventBus.$on('timer-start', ({ timer, trivia }) => this.onTimer_start({ timer, trivia }))
    EventBus.$on('timer-update', ({ timer }) => this.onTimer_update({ timer }))
    EventBus.$on('timer-end', ({ timer }) => this.onTimer_end({ timer }))
    EventBus.$on('timer-reset', ({ timer }) => this.onTimer_reset({ timer }))
  }
}
</script>
