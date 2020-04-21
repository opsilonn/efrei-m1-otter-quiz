<template>
    <div>
      <v-container class="text-center">
        <v-card class="elevation-12">

          <!-- Tool Bar-->
          <v-toolbar
            dark
            flat>
            <v-toolbar-title>Home</v-toolbar-title>
          </v-toolbar>

          <!-- Form -->
          <v-card-text>
            I display general stuff about the website :)
          </v-card-text>
          <v-card-actions>
            <v-btn
              @click="startGame()"
            >
              Start a new run
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Home',
  data: () => ({
    data: null
  }),
  computed: {
    // States
    ...mapState('players', ['players']),
    ...mapState('dunjons', ['dunjons']),
    ...mapState('rounds', ['rounds']),

    // Getters
    ...mapGetters('dunjons', ['getDunjonsByPlayerId', 'getLastDunjonByPlayerId'])
  },
  methods: {
    // Mutations
    ...mapMutations('players', ['addPlayer']),
    ...mapMutations('dunjons', ['addDunjon']),
    ...mapMutations('rounds', ['addRound']),
    ...mapMutations('playerStats', ['addPlayerStat']),
    ...mapMutations('enemyStats', ['addEnemyStat']),

    startGame () {
      // Player
      const newPlayer = {
        accountId: 1,
        seed: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
        isFinished: 0
      }

      this.addPlayer({ player: newPlayer })

      // Dunjon
      const newDunjon = {
        playerId: newPlayer.id,
        category: 9,
        difficulty: 'easy',
        number: 1
      }

      this.addDunjon({ dunjon: newDunjon })

      // Round
      const newRound = {
        dunjonId: newDunjon.id,
        roundTime: 20000,
        number: 1
      }

      this.addRound({ round: newRound })

      // Enemy Stat
      const newEnemyStat = {
        roundId: newRound.id,
        maxHP: 5,
        HP: 3
      }

      this.addEnemyStat({ enemyStat: newEnemyStat })

      // Player Stat
      const newPlayerStat = {
        roundId: newRound.id,
        maxHP: 10,
        HP: 8,
        maxMana: 5,
        mana: 5,
        gold: 1
      }

      this.addPlayerStat({ playerStat: newPlayerStat })

      // Go to Game page
      this.$router.push({ name: 'Game', params: { playerId: newPlayer.id } })
    }
  }
}
</script>
