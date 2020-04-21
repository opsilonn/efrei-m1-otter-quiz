<template>
  <div/>
</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'GameMaster',
  props: ['playerId'],
  data: () => ({
    timer: {
      length: 20000,
      begin: null,
      end: null,
      remaining: 0
    },
    endLength: 2000,
    resetLength: 5000
  }),
  computed: {
    // States
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
      return this.getLastDunjonByPlayerId(this.playerId) || { category: '9', difficulty: 'none', number: '0' }
    },
    round () {
      return this.getLastRoundByDunjonId(this.dunjon.id) || { roundTime: '0', result: 'none', number: '0' }
    },
    lastTrivia () {
      return this.getLastTrivia() || {}
    }
  },

  methods: {
    // Actions
    ...mapActions('trivias', ['fetchTrivias']),

    // Customs
    async startTimer () {
      await this.fetchTrivias({ amount: 1, category: 9 })

      // Reset localy
      this.timer.begin = Date.now()
      this.timer.end = this.timer.begin + this.timer.length

      // Broadcast timer-start
      this.$emit('timer-start', { timer: this.timer, trivia: this.lastTrivia })

      // Start update
      this.updateTimer()
    },
    updateTimer () {
      // Update localy
      const updateTime = (this.timer.end - Date.now())
      if (updateTime > 0) {
        this.timer.remaining = updateTime
      } else {
        this.timer.remaining = 0
      }

      // Broadcast update
      this.$emit('timer-update', { timer: this.timer })

      // Call next update
      if (this.timer.remaining > 0.12) {
        setTimeout(this.updateTimer, 100)
      } else {
        setTimeout(this.endTimer, 100)
      }
    },
    endTimer () {
      // Broadcast event timer-end
      console.log('emit timer-end')
      this.$emit('timer-end', { timer: this.timer })

      setTimeout(this.resetTimer, this.endLength)
    },
    resetTimer () {
      this.timer.remaining = this.timer.length
      // Broadcast event timer-end
      this.$emit('timer-reset', { timer: this.timer })

      setTimeout(this.startTimer, this.resetLength)
    },

    // Event handlers
    onTimerStop () {
      console.log('[GameMaster] Receiving event timer-stop')
      // Broadcast event timer-end
      this.$emit('timer-end', { timer: this.timer })

      setTimeout(this.startTimer, this.endLength)
    }
  },
  mounted () {
    console.log('GAMEMASTER')
    this.resetTimer()
  }
}

</script>
