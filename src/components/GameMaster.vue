<template>
  <div>
    <!-- Dialog at the end -->
    <v-dialog
      v-model="dialogEnding"
      persistent
      max-width="130vh"
    >
      <v-card
        v-if="!!party"
        class="blue-grey darken-3"
        >
        <v-card-title
          class="blue-grey darken-4"
        >
          <label>
            <h2
              class='font-weight-black blue-grey--text text--lighten-4'
              style='font-size: 6vh; line-height: 6vh; font-variant: small-caps'
            >
              Game over !
            </h2>
          </label>
        </v-card-title>
        <v-card-text
          class="blue-grey darken-2 blue-grey--text text--lighten-4"
          style="padding: 30px 70px"
        >
          <p style="font-size: 3.5vh; line-height: 3.5vh">
            You managed to beat <b>{{ getDunjonsByPartyId(partyId).length - 1}} dungeon{{getDunjonsByPartyId(partyId).length - 1 > 1 ? 's' : ''}}</b>.
            <br/>
            You went through <b>x rounds</b> and answered good to <b>x questions</b>.
          </p>

          <h1 class="pt-5" style="font-size: 5vh; line-height: 5vh">Your score is <b>{{ party.score }} pts</b>.</h1>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            x-large
            dark
            :style="'background-color: #A53532'"
            @click="$router.push({ name: 'Home' })"
          >
            Exit
          </v-btn>
          <v-spacer/>
          <v-btn
            x-large
            dark
            :style="'background-color: #46A65D'"
            @click="startNewGame"
          >
            Retry
          </v-btn>
          <v-spacer/>
        </v-card-actions>
      </v-card>
      <v-card
        v-else
        class="blue-grey darken-3"
      >
        <v-card-title
          class="blue-grey darken-4"
        >
          <h2
            class='font-weight-black blue-grey--text text--lighten-4'
            style='font-size: 6vh; line-height: 6vh; font-variant: small-caps'
          >
            Oups ! You got lost !
          </h2>
        </v-card-title>
        <v-card-text
          class="blue-grey darken-2 blue-grey--text text--lighten-4"
          style="padding: 30px 70px"
          >
          <p style="font-size: 3.5vh; line-height: 3.5vh">
            You seems to be on a party that doesn't exist or that is already finished.
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            x-large
            dark
            :style="'background-color: #A53532'"
            @click="$router.push({ name: 'Home' })"
            >
            Exit
          </v-btn>
          <v-spacer/>
          <v-btn
            x-large
            dark
            :style="'background-color: #46A65D'"
            @click="startNewGame"
            >
            Retry
          </v-btn>
          <v-spacer/>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog to choose next dunjon -->
    <v-dialog
      v-model="dialogNextDunjon"
      persistent
      max-width="150vh"
    >
      <v-card
        v-if="!!party"
        class="blue-grey darken-3"
      >
        <v-card-title
          class="blue-grey darken-4"
        >
          <label>
            <h2
              class='font-weight-black blue-grey--text text--lighten-4'
              style='font-size: 6vh; line-height: 6vh; font-variant: small-caps'
            >
              Next dungeon !
            </h2>
          </label>
        </v-card-title>
        <v-card-text
          class="blue-grey darken-2 blue-grey--text text--lighten-4"
          style="padding: 30px 70px"
        >
          <p style="font-size: 3.5vh; line-height: 3.5vh">
            Choose one :
          </p>
          <v-row>
            <v-col cols="12" :sm="4">
              <v-card
                class="blue-grey lighten-3"
                @click="enterNewDunjon({
                  category: 9,
                  difficulty: 'Easy'
                 })"
              >
                <v-card-title>
                  Dungeon 1
                </v-card-title>
                <v-card-text>
                  Category : {{ this.getTriviaCategoryNameById(9) }}
                  <br/>
                  Difficulty : Easy
                  <br/>
                  Round timer : 20s
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" :sm="4">
              <v-card
                class="blue-grey lighten-3"
                @click="enterNewDunjon({
                  category: 10,
                  difficulty: 'Easy'
                 })"
              >
                <v-card-title>
                  Dungeon 2
                </v-card-title>
                <v-card-text>
                  Category : {{ this.getTriviaCategoryNameById(10) }}
                  <br/>
                  Difficulty : Easy
                  <br/>
                  Round timer : 18s
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" :sm="4">
              <v-card
                class="blue-grey lighten-3"
                @click="enterNewDunjon({
                  category: 11,
                  difficulty: 'Medium'
                 })"
              >
                <v-card-title>
                  Dungeon 3
                </v-card-title>
                <v-card-text>
                  Category : {{ this.getTriviaCategoryNameById(11) }}
                  <br/>
                  Difficulty : Medium
                  <br/>
                  Round timer : 20s
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card
        v-else
        class="blue-grey darken-3"
      >
        <v-card-title
          class="blue-grey darken-4"
        >
          <h2
            class='font-weight-black blue-grey--text text--lighten-4'
            style='font-size: 6vh; line-height: 6vh; font-variant: small-caps'
          >
            Oups ! You got lost !
          </h2>
        </v-card-title>
        <v-card-text
          class="blue-grey darken-2 blue-grey--text text--lighten-4"
          style="padding: 30px 70px"
        >
          <p style="font-size: 3.5vh; line-height: 3.5vh">
            You seems to be on a party that doesn't exist or that is already finished.
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            x-large
            dark
            :style="'background-color: #A53532'"
            @click="$router.push({ name: 'Home' })"
          >
            Exit
          </v-btn>
          <v-spacer/>
          <v-btn
            x-large
            dark
            :style="'background-color: #46A65D'"
            @click="startNewGame"
          >
            Retry
          </v-btn>
          <v-spacer/>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import EventBus from '@/EventBus.js'

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'GameMaster',
  data: () => ({
    timer: {
      length: 20000,
      begin: null,
      end: null,
      remaining: 0
    },
    endLength: 1000,
    resetLength: 3000,
    dialogEnding: false,
    dialogNextDunjon: false,
    gameReaload: true
  }),
  computed: {
    // States
    ...mapState('themes', ['themes']),
    ...mapState('parties', ['parties']),
    ...mapState('dunjons', ['dunjons']),
    ...mapState('rounds', ['rounds']),
    ...mapState('playerStats', ['playerStats']),
    ...mapState('enemyStats', ['enemyStats']),
    ...mapState('trivias', ['trivias']),

    // Getters
    ...mapGetters('parties', ['getPartyById']),
    ...mapGetters('dunjons', ['getLastDunjonByPartyId', 'getDunjonsByPartyId']),
    ...mapGetters('rounds', ['getLastRoundByDunjonId', 'getRoundsByDunjonId']),
    ...mapGetters('playerStats', ['getPlayerStatByPartyId']),
    ...mapGetters('enemyStats', ['getEnemyStatByDunjonId']),
    ...mapGetters('trivias', ['getLastTrivia', 'getTriviaCategoryNameById']),

    // Custom
    partyId () {
      return this.$route.params.partyId
    },
    party () {
      return this.getPartyById(this.partyId)
    },
    dunjon () {
      return this.getLastDunjonByPartyId(this.partyId)
    },
    round () {
      return this.dunjon ? this.getLastRoundByDunjonId(this.dunjon.id) || { roundTime: 20000 } : { roundTime: 20000 }
    },
    playerStat () {
      return this.getPlayerStatByPartyId(this.partyId)
    },
    playerStat_HP () {
      return this.playerStat ? this.playerStat.HP : 0
    },
    enemyStat () {
      return this.dunjon ? this.getEnemyStatByDunjonId(this.dunjon.id) : {}
    },
    enemyStat_HP () {
      return this.enemyStat ? this.enemyStat.HP : 0
    },
    lastTrivia () {
      return this.getLastTrivia() || {}
    },
    totalRounds () {
      let number = 0
      const dunjons = this.getDunjonsByPartyId(this.partyId)
      dunjons.forEach((dunjon) => {
        number += this.getRoundsByDunjonId(dunjon.id)
      })
      return number
    }
  },

  methods: {
    // Mutations
    ...mapMutations('parties', ['addParty', 'addPartyScore', 'partyFinish']),
    ...mapMutations('dunjons', ['addDunjon']),
    ...mapMutations('rounds', ['addRound', 'setRoundResult']),
    ...mapMutations('playerStats', ['addPlayerStat', 'setPlayerStatHP']),
    ...mapMutations('enemyStats', ['addEnemyStat', 'setEnemyStatHP']),

    // Actions
    ...mapActions('parties', ['createParty']),
    ...mapActions('dunjons', ['nextDunjon']),
    ...mapActions('rounds', ['nextRound']),
    ...mapActions('trivias', ['fetchTrivias', 'fetchTriviaCategories']),

    // Customs
    startNewGame () {
      const defaultPlayerStat = {
        maxHP: 10,
        HP: 10,
        maxMana: 5,
        mana: 5,
        gold: 1
      }
      const defaultEnemyStat = {
        maxHP: 3,
        HP: 3
      }

      this.createParty({ accountId: 1, defaultPlayerStat, defaultEnemyStat })
        .then((partyId) => {
          const dunjonId = this.getLastDunjonByPartyId(partyId).id

          console.log(`[GameMaster] partyId: ${partyId}`)
          console.log(`[GameMaster] dunjonId: ${dunjonId}`)

          // Go to Game page
          this.$router.push({ name: 'Game', params: { partyId } })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    enterNewDunjon (dunjon) {
      this.dialogNextDunjon = false
      const defaultEnemyStat = {
        maxHP: parseInt(this.enemyStat.maxHP) + 1,
        HP: parseInt(this.enemyStat.maxHP) + 1
      }
      this.nextDunjon({ partyId: this.partyId, dunjon, defaultEnemyStat })
      EventBus.$emit('dunjon-enter')
      this.startTimer()
    },
    async startTimer () {
      if (this.party.isFinished || this.dialogNextDunjon) {
        return
      }
      console.log('start timer')
      await this.fetchTrivias({ amount: 1, category: this.dunjon.category })
      console.log('before nextRound')
      this.nextRound({ dunjonId: this.dunjon.id, round: this.round, trivia: this.lastTrivia })
      console.log('after nextRound')
      this.gameReaload = false

      // Reset localy
      this.timer.begin = Date.now()
      this.timer.end = this.timer.begin + this.timer.length

      // Broadcast timer-start
      console.log('[GameMaster] Emit event timer-start')
      EventBus.$emit('timer-start', { timer: this.timer, trivia: this.lastTrivia })

      // Start update
      this.updateTimer(this.round)
    },
    updateTimer () {
      if (this.round.result || this.party.isFinished) {
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
        setTimeout(this.updateTimer, 100)
      } else {
        setTimeout(this.endTimer, 100)
      }
    },
    endTimer () {
      this.setRoundResult({ roundId: this.round.id, result: 'Pending' })
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
      this.setRoundResult({ roundId: this.round.id, result: 'Succeded' })
      this.setEnemyStatHP({ enemyStat: this.enemyStat, HP: parseInt(this.enemyStat.HP) - 1 })
      this.addPartyScore({ partyId: this.partyId, score: 100 })
    },
    onTrivia_failure () {
      console.log('[GameMaster] On event trivia-failure')
      this.setRoundResult({ roundId: this.round.id, result: 'Failed' })
      this.setPlayerStatHP({ playerStat: this.playerStat, HP: parseInt(this.playerStat.HP) - 1 })
    },
    onPlayer_death () {
      console.log('[GameMaster] On event player-death')
      this.partyFinish({ partyId: this.partyId })
      this.dialogEnding = true
    },
    onEnemy_death () {
      console.log('[GameMaster] On event enemy-death')
      this.dialogNextDunjon = true
      this.addPartyScore({ partyId: this.partyId, score: 500 })
    }
  },
  created () {
    EventBus.$on('timer-stop', ({ timer }) => this.onTimer_stop({ timer }))
    EventBus.$on('trivia-success', this.onTrivia_success)
    EventBus.$on('trivia-failure', this.onTrivia_failure)
    EventBus.$on('player-death', this.onPlayer_death)
    EventBus.$on('enemy-death', this.onEnemy_death)
  },
  async mounted () {
    this.fetchTriviaCategories()

    if (this.party === undefined) {
      this.dialogEnding = true
    } else {
      this.dialogEnding = false
      this.startTimer()
    }
  },
  watch: {
    partyId: function (newValue, oldValue) {
      if (this.party === undefined) {
        this.dialogEnding = true
      } else {
        this.dialogEnding = false
        this.startTimer()
      }
    },
    playerStat_HP: function (newValue, oldValue) {
      if (!this.gameReaload) {
        if (newValue <= 0) {
          console.log('[GameMaster] Emit event player-death')
          EventBus.$emit('player-death')
          return
        }
        if (newValue > oldValue) {
          console.log('[GameMaster] Emit event player-heal')
          EventBus.$emit('player-heal', { oldValue })
        } else {
          console.log('[GameMaster] Emit event player-damage')
          EventBus.$emit('player-damage', { oldValue })
        }
      }
    },
    enemyStat_HP: function (newValue, oldValue) {
      if (!this.gameReaload) {
        if (newValue <= 0) {
          console.log('[GameMaster] Emit event enemy-death')
          EventBus.$emit('enemy-death')
          return
        }
        if (newValue > oldValue) {
          console.log('[GameMaster] Emit event enemy-heal')
          EventBus.$emit('enemy-heal', { oldValue })
        } else {
          console.log('[GameMaster] Emit event enemy-damage')
          EventBus.$emit('enemy-damage', { oldValue })
        }
      }
    }
  }
}

</script>
