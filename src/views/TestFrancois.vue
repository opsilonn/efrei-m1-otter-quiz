<template>
  <div>
    <GameMaster
      @timer-start="onStartTimer"
      @timer-update="onUpdateTimer"
      @timer-end="onEndTimer"
      @timer-reset="onResetTimer"
      :playerId="player.id"
    />

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
    <br/>
    {{step}} | {{new Intl.NumberFormat('en-EN', { minimumIntegerDigits: 2 }).format(step.toString(2))}}
    <br/>

    <!-- Questions -->
    <v-container>
    <h3 v-html="trivia.question" class="pa-0" align="center"/>
    <v-row>
      <v-col cols="6"
        v-for="(answer, index) in trivia.answers" v-bind:key="index"
      >
        <v-container>
          <v-card
            :elevation="answer === yourAnswer ? 12 : 2"
            @click="((step&1) === 1) ? yourAnswer = answer : ''"
            :style="'background-color: ' + ((step&2) === 2 ? (answer.value ? themes.Success : themes.Failure) :themes.DarkLight)"
          >
            <v-card-text v-html="answer.answer"/>
          </v-card>
        </v-container>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-container>
          Your answer : {{ yourAnswer.answer }}
          <v-card
            @click="((step&1) === 1) ? validate() : ''"
            class="mx-auto"
            :style="'background-color: ' + ((step&1) === 1 ? themes.DarkLight :themes.Dark) + '; width: 500px'"
          >
            <v-card-text>
              Validate
            </v-card-text>
          </v-card>
        </v-container>
      </v-col>
    </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import GameMaster from '@/components/GameMaster.vue'

import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'TestEddy',
  components: {
    GameMaster
  },
  data: () => ({
    player: {},
    timer: {
      length: 2000,
      begin: null,
      end: null,
      remaining: null
    },
    trivia: {},
    step: 1,
    yourAnswer: { answer: '' }
  }),
  computed: {
    // States
    ...mapState('themes', ['themes']),
    ...mapState('players', ['players']),
    ...mapState('dunjons', ['dunjons']),
    ...mapState('rounds', ['rounds']),

    // Getters
    ...mapGetters('dunjons', ['getDunjonsByPlayerId', 'getLastDunjonByPlayerId']),

    // Custom
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
    // Mutations
    ...mapMutations('players', ['addPlayer']),
    ...mapMutations('dunjons', ['addDunjon']),
    ...mapMutations('rounds', ['addRound']),

    // Custom
    validate () {
      console.log('emit timer-stop')
      this.$emit('timer-stop')
    },

    // Event handlers
    onStartTimer ({ timer, trivia }) {
      this.yourAnswer = { answer: 'none' }
      this.timer = timer
      this.trivia = trivia
      this.step = 1
    },
    onUpdateTimer ({ timer }) {
      this.timer = timer
    },
    onEndTimer ({ timer }) {
      console.log('[Eddy] Receiving event timer-end')
      this.timer = timer
      this.step = 0
    },
    onResetTimer ({ timer }) {
      this.timer = timer
      this.step = 2
    },
    onStopTimer ({ timer }) {
      console.log('[Eddy] Receiving event timer-stop')
    }
  },
  mounted () {
    const newPlayer = {
      accountId: 1,
      seed: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
      isFinished: 0
    }

    this.addPlayer({ player: newPlayer })

    this.player = newPlayer

    const newDunjon = {
      playerId: this.player.id,
      category: 9,
      difficulty: 'easy',
      number: 1
    }

    this.addDunjon({ dunjon: newDunjon })

    const newRound = {
      dunjonId: newDunjon.id,
      roundTime: 20000,
      number: 1
    }

    this.addRound({ round: newRound })
  }
}
</script>
