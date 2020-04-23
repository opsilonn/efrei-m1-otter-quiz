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
              <v-icon x-large class="pb-2 pr-3" color="blue-grey lighten-4">mdi-skull-crossbones</v-icon>Game over !
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
            <v-icon class="pr-2">mdi-exit-run</v-icon>
            Exit
          </v-btn>
          <v-spacer/>
          <v-btn
            x-large
            dark
            :style="'background-color: #46A65D'"
            @click="startNewGame"
          >
            <v-icon class="pr-2">mdi-restore</v-icon>
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
            <v-icon x-large class="pb-2 pr-3" color="blue-grey lighten-4">mdi-cloud-question</v-icon>Oups ! You got lost !
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
            <v-icon class="pr-2">mdi-exit-run</v-icon>
            Exit
          </v-btn>
          <v-spacer/>
          <v-btn
            x-large
            dark
            :style="'background-color: #46A65D'"
            @click="startNewGame"
          >
            <v-icon class="pr-2">mdi-restore</v-icon>
            Retry
          </v-btn>
          <v-spacer/>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog to choose a loot -->
    <v-dialog
      v-model="dialogLoot"
      persistent
      max-width="150vh"
    >
      <v-card
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
              <v-icon x-large class="pb-2 pr-3" color="blue-grey lighten-4">mdi-trophy</v-icon>Dungeon finished !
            </h2>
          </label>
        </v-card-title>
        <v-card-text
          class="blue-grey darken-2 blue-grey--text text--lighten-4"
          style="padding: 30px 70px"
        >
          <p style="font-size: 3.5vh; line-height: 3.5vh">
            Choose one loot :
          </p>
          <v-row>
            <!-- Loot Heal -->
            <v-hover v-slot:default="{ hover }">
              <v-col
                cols="12"
                :sm="6"
                :md="3"
                class="zoom pa-3 d-flex flex-column"
              >
                <v-card
                  class="blue-grey lighten-3 flex d-flex flex-column"
                  @click="applyingLoot('heal')"
                >
                  <v-card-title>
                    <v-row justify="center" :class="{ 'green--text': hover }">
                      Heal 1 HP
                    </v-row>
                  </v-card-title>
                  <v-card-text>
                    <v-row justify="center">
                      <v-icon x-large :color="hover ? 'green' : ''">mdi-medical-bag</v-icon>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-hover>

            <!-- Loot Mana -->
            <v-hover v-slot:default="{ hover }">
              <v-col
                cols="12"
                :sm="6"
                :md="3"
                class="zoom pa-3 d-flex flex-column"
              >
                <v-card
                  class="blue-grey lighten-3 flex d-flex flex-column"
                  @click="applyingLoot('mana')"
                >
                  <v-card-title>
                    <v-row justify="center" :class="{ 'blue--text': hover }">
                      Recover 1 Mana
                    </v-row>
                  </v-card-title>
                  <v-card-text>
                    <v-row justify="center">
                      <v-icon x-large :color="hover ? 'blue' : ''">mdi-head-snowflake</v-icon>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-hover>

            <!-- Loot Golds -->
            <v-hover v-slot:default="{ hover }">
              <v-col
                cols="12"
                :sm="6"
                :md="3"
                class="zoom pa-3 d-flex flex-column"
              >
                <v-card
                  class="blue-grey lighten-3 flex d-flex flex-column"
                  @click="applyingLoot('golds')"
                >
                  <v-card-title>
                    <v-row justify="center" :class="{ 'yellow--text': hover }">
                      Take 2 Golds
                    </v-row>
                  </v-card-title>
                  <v-card-text>
                    <v-row justify="center">
                      <v-icon x-large :color="hover ? 'yellow' : ''">mdi-circle-multiple</v-icon>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-hover>

            <!-- Loot Time -->
            <v-hover v-slot:default="{ hover }">
              <v-col
                cols="12"
                :sm="6"
                :md="3"
                class="zoom pa-3 d-flex flex-column"
              >
                <v-card
                  class="blue-grey lighten-3 flex d-flex flex-column"
                  @click="applyingLoot('time')"
                >
                  <v-card-title>
                    <v-row justify="center" :class="{ 'red--text': hover }">
                      Recover 1 sec
                    </v-row>
                  </v-card-title>
                  <v-card-text>
                    <v-row justify="center">
                      <v-icon x-large :color="hover ? 'red' : ''">mdi-run-fast</v-icon>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-hover>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Dialog to choose next dunjon -->
    <v-dialog
      v-model="dialogNextDunjon"
      persistent
      max-width="150vh"
    >
      <v-card
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
              <v-icon x-large class="pb-2 pr-3" color="blue-grey lighten-4">mdi-sword-cross</v-icon>Next dungeon !
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
            <v-col
              v-for="(choosableDungeon, index) in choosableDungeons"
              :key="index"
              cols="12"
              :sm="4"
              class="zoom-sm pa-3 d-flex flex-column"
            >
              <v-card
                class="blue-grey lighten-3 flex d-flex flex-column"
                @click="enterNewDunjon({
                  category: choosableDungeon.category.id,
                  difficulty: choosableDungeon.difficulty,
                  roundTime: choosableDungeon.roundTime
                 })"
              >
                <v-card-title style="font-size: 2.8vh; line-height: 2.8vh">
                  <v-icon class="pb-1 pr-2">mdi-castle</v-icon> &nbsp; Dungeon {{ index + 1 }}
                </v-card-title>
                <v-divider/>
                <v-card-text style="font-size: 1.9vh; line-height: 3vh">
                  <v-icon class="pb-1" small>mdi-shape</v-icon> <b class="pr-2">Category</b> {{ choosableDungeon.category.name }}
                  <br/>
                  <v-icon class="pb-1" small>mdi-fire</v-icon> <b class="pr-2">Difficulty</b> {{ choosableDungeon.difficulty }}
                  <br/>
                  <v-icon class="pb-1" small>mdi-timer</v-icon> <b class="pr-2">Round timer</b> {{ ((choosableDungeon.roundTime) / 1000).toFixed(1) }}s
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
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
    // Timer
    timer: {
      length: 20000,
      begin: null,
      end: null,
      remaining: 0
    },
    endLength: 1000,
    resetLength: 3000,
    // Dialog controller
    dialogEnding: false,
    dialogLoot: false,
    dialogNextDunjon: false,
    // Game controller
    gameReaload: true,
    chooseDungeon: false,
    // Random values
    choosableDungeons: []
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
    ...mapGetters('dunjons', ['getLastDunjonByPartyId', 'getDunjonsByPartyId', 'getRandomRoundTime']),
    ...mapGetters('rounds', ['getLastRoundByDunjonId', 'getRoundsByDunjonId']),
    ...mapGetters('playerStats', ['getPlayerStatByPartyId']),
    ...mapGetters('enemyStats', ['getEnemyStatByDunjonId']),
    ...mapGetters('trivias', ['getLastTrivia', 'getTriviaCategoryNameById', 'getRandomTriviasCategorySet', 'getRandomTriviasDifficulty']),

    // Custom
    partyId () {
      return parseInt(this.$route.params.partyId)
    },
    party () {
      return this.getPartyById(this.partyId)
    },
    dunjon () {
      return this.getLastDunjonByPartyId(this.partyId)
    },
    round () {
      return this.dunjon ? this.getLastRoundByDunjonId(this.dunjon.id) : {}
    },
    roundAnswer () {
      return this.round ? this.round.answer : undefined
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
    beginPlay () {
      if (this.party === undefined) {
        this.dialogEnding = true
      } else {
        this.dialogEnding = false
        this.startTimer()
      }
    },
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
          // Go to Game page
          EventBus.$emit('party-start')
          if (parseInt(this.partyId) === partyId) {
            this.beginPlay()
          } else {
            this.$router.replace({ name: 'Game', params: { partyId } })
          }
        })
        .catch((err) => {
          console.log('Error in createParty')
          console.log(err)
        })
    },
    applyingLoot (selection) {
      console.log(`selected loot is ${selection}`)
      this.dialogLoot = false
      this.choosableDungeons = []

      const RandomTriviasCategorySet = Array.from(this.getRandomTriviasCategorySet(3))
      RandomTriviasCategorySet.forEach((category, index) => {
        this.choosableDungeons[index] = {}
        this.choosableDungeons[index].category = category
      })

      const RandomTriviasDifficulty = this.getRandomTriviasDifficulty(3, this.dunjon.number)
      RandomTriviasDifficulty.forEach((difficulty, index) => {
        this.choosableDungeons[index].difficulty = difficulty
        this.choosableDungeons[index].roundTime = this.getRandomRoundTime(this.dunjon.roundTime, difficulty)
      })

      this.dialogNextDunjon = true
    },
    enterNewDunjon (dunjon) {
      this.dialogNextDunjon = false
      this.chooseDungeon = false
      const defaultEnemyStat = {
        maxHP: parseInt(this.enemyStat.maxHP) + 1,
        HP: parseInt(this.enemyStat.maxHP) + 1
      }
      this.nextDunjon({ partyId: this.partyId, dunjon, defaultEnemyStat })
      EventBus.$emit('dunjon-enter')
      this.startTimer()
    },
    async startTimer () {
      if (this.party.isFinished || this.chooseDungeon) {
        return
      }
      await this.fetchTrivias({ amount: 1, category: this.dunjon.category })
      this.nextRound({ dunjonId: this.dunjon.id, trivia: this.lastTrivia })
      this.gameReaload = false

      // Reset localy
      this.timer.length = this.dunjon.roundTime
      this.timer.begin = Date.now()
      this.timer.end = this.timer.begin + this.timer.length

      // Broadcast timer-start
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
      EventBus.$emit('timer-end', { timer: this.timer })

      setTimeout(this.resetTimer, this.endLength)
    },
    resetTimer () {
      this.timer.remaining = this.timer.length

      // Broadcast event timer-end
      EventBus.$emit('timer-reset', { timer: this.timer })

      setTimeout(this.startTimer, this.resetLength)
    },

    // Event handlers
    onTimer_stop () {
      this.endTimer()
    },
    onPlayer_death () {
      this.partyFinish({ partyId: this.partyId })
      this.dialogEnding = true
    },
    onEnemy_death () {
      this.chooseDungeon = true

      this.addPartyScore({ partyId: this.partyId, score: 500 })

      setTimeout(() => { this.dialogLoot = true }, this.resetLength)
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

    this.beginPlay()
  },
  watch: {
    partyId: function (newValue, oldValue) {
      this.beginPlay()
    },
    roundAnswer: function (newValue, oldValue) {
      if (oldValue === undefined) {
        if (newValue.value) {
          this.setRoundResult({ roundId: this.round.id, result: 'Succeeded' })
          this.setEnemyStatHP({ enemyStat: this.enemyStat, HP: parseInt(this.enemyStat_HP) - 1 })
          this.addPartyScore({ partyId: this.partyId, score: 100 })
        } else {
          this.setRoundResult({ roundId: this.round.id, result: 'Failed' })
          this.setPlayerStatHP({ playerStat: this.playerStat, HP: parseInt(this.playerStat_HP) - 1 })
        }
      }
    },
    playerStat_HP: function (newValue, oldValue) {
      if (!this.gameReaload) {
        if (newValue <= 0) {
          EventBus.$emit('player-death')
          return
        }
        if (newValue > oldValue) {
          EventBus.$emit('player-heal', { oldValue })
        } else {
          EventBus.$emit('player-damage', { oldValue })
        }
      }
    },
    enemyStat_HP: function (newValue, oldValue) {
      if (!this.gameReaload) {
        if (newValue <= 0) {
          EventBus.$emit('enemy-death')
          return
        }
        if (newValue > oldValue) {
          EventBus.$emit('enemy-heal', { oldValue })
        } else {
          EventBus.$emit('enemy-damage', { oldValue })
        }
      }
    }
  }
}

</script>
