<template>
  <div/>
</template>

<script>
import EventBus from '@/EventBus.js'

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

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
    resetLength: 5000,
    playerHp: 5,
    enemyHp: 7
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
    // Mutations
    ...mapMutations('rounds', ['nextRound']),

    // Actions
    ...mapActions('trivias', ['fetchTrivias']),

    // Customs
    async startTimer () {
      await this.fetchTrivias({ amount: 1, category: 9 })

      // Reset localy
      this.timer.begin = Date.now()
      this.timer.end = this.timer.begin + this.timer.length

      // Broadcast timer-start
      console.log('[GameMaster] Emit event timer-start')
      EventBus.$emit('timer-start', { timer: this.timer, trivia: this.lastTrivia })

      // Start update
      this.updateTimer(this.round)
    },
    updateTimer (round) {
      if (round !== this.round) {
        return
      }

      // Update localy
      const updateTime = (this.timer.end - Date.now())
      if (updateTime > 0) {
        this.timer.remaining = updateTime
      } else {
        this.timer.remaining = 0
      }

      // Broadcast update
      EventBus.$emit('timer-update', { timer: this.timer })

      // Call next update
      if (this.timer.remaining > 0.12) {
        setTimeout(this.updateTimer.bind(null, round), 100)
      } else {
        setTimeout(this.endTimer, 100)
      }
    },
    endTimer () {
      this.nextRound({ round: this.round })
      this.timer.remaining = 0

      // Broadcast event timer-end
      console.log('[GameMaster] Emit timer-end')
      EventBus.$emit('timer-end', { timer: this.timer })

      setTimeout(this.resetTimer, this.endLength)
    },
    resetTimer () {
      this.timer.remaining = this.timer.length

      // Broadcast event timer-end
      console.log('[GameMaster] Emit event timer-reset')
      EventBus.$emit('timer-reset', { timer: this.timer })

      setTimeout(this.startTimer, this.resetLength)
    },

    // Event handlers
    onTimer_stop () {
      console.log('[GameMaster] On event timer-stop')

      this.endTimer()
    },
    onTrivia_success () {
      console.log('[GameMaster] On event trivia-success')
      this.enemyHp -= 1
    },
    onTrivia_failure () {
      console.log('[GameMaster] On event trivia-failure')
      this.playerHp -= 1
    }
  },
  created () {
    EventBus.$on('timer-stop', ({ timer }) => this.onTimer_stop({ timer }))
    EventBus.$on('trivia-success', this.onTrivia_success)
    EventBus.$on('trivia-failure', this.onTrivia_failure)
  },
  mounted () {
    console.log('GAMEMASTER')
    this.resetTimer()
  },
  watch: {
    enemyHp: function (newValue, oldValue) {
      console.log('[GameMaster] Emit event enemyHp-update')
      EventBus.$emit('enemyHp-update', { enemyHp: this.enemyHp })
    },
    playerHp: function (newValue, oldValue) {
      console.log('[GameMaster] Emit event playerHp-update')
      EventBus.$emit('playerHp-update', { playerHp: this.playerHp })
    }
  }
}

</script>
