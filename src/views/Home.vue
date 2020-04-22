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
            you are loged as {{account.username}}
          </v-card-text>
          <loginVue>
          </loginVue>
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
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import loginVue from '@/components/Login.vue'

export default {
  name: 'Home',
  components: {
    loginVue
  },
  data: () => ({
    data: null,
    username: ''
  }),
  computed: {
    // States
    ...mapState('parties', ['parties']),
    ...mapState('dunjons', ['dunjons']),
    ...mapState('rounds', ['rounds']),
    ...mapState('playerStats', ['playerStats']),
    ...mapState('enemyStats', ['enemyStats']),
    ...mapState('accounts', ['accounts']),

    // Getters
    ...mapGetters('dunjons', ['getDunjonsByPartyId', 'getLastDunjonByPartyId']),
    ...mapGetters('accounts', ['getConnectedAccount']),

    account () {
      return this.getConnectedAccount()
    }
  },
  methods: {
    // Mutations
    ...mapMutations('rounds', ['addRound']),
    ...mapMutations('playerStats', ['addPlayerStat']),
    ...mapMutations('enemyStats', ['addEnemyStat']),

    // Actions
    ...mapActions('parties', ['createParty']),
    ...mapActions('accounts', ['connection']),
    ...mapActions('accounts', ['register']),

    startGame () {
      this.createParty({ accountId: 1 })
        .then((partyId) => {
          const dunjonId = this.getLastDunjonByPartyId(partyId).id

          console.log(`[Home] partyId: ${partyId}`)
          console.log(`[Home] dunjonId: ${dunjonId}`)

          // Go to Game page
          this.$router.push({ name: 'Game', params: { partyId } })
        })
    }
  }
}
</script>
