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

    startGame () {
      const newPlayer = {
        accountId: 1,
        seed: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
        isFinished: 0
      }

      this.addPlayer({ player: newPlayer })

      const newDunjon = {
        playerId: newPlayer.id,
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

      this.$router.push({ name: 'Game', params: { playerId: newPlayer.id } })
    }
  }
}
</script>
