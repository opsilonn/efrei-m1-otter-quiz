<template>
    <div class="indigo darken-3 height100">
        <v-progress-linear
          v-model="timerToProgress"
          :color="timerToGradient"
          :background-color="timerToGradientDarken"
        >
        </v-progress-linear>
        <label
          class="d-flex justify-end align-end pr-1"
          :style="'color: ' + timerToGradient"
        >
          <h2>{{timerRemainingSec.toFixed(1)}}</h2>
          <h3>s</h3>
        </label>
        <v-container>
            <h3 align="center">
                Questions
            </h3>
        </v-container>
    </div>
</template>

<script>
export default {
  name: 'GameQuestions',
  data: () => ({
    timerLength: 6000,
    timerBegin: null,
    timerEnd: null,
    timerRemaining: null
  }),
  computed: {
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
    resetTimer () {
      this.timerBegin = Date.now()
      this.timerEnd = this.timerBegin + this.timerLength

      setTimeout(this.resetTimer, this.timerLength + 2000)
      this.updateTimer()
    },
    updateTimer () {
      this.timerRemaining = (this.timerEnd - Date.now())

      if (this.timerRemaining > 0.12) {
        setTimeout(this.updateTimer, 100)
      }
    }
  },
  mounted () {
    this.resetTimer()
  }
}
</script>
