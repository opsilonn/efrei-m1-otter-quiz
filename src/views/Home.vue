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
    ...mapState('accounts', ['accounts', 'connectedAccount']),

    // Getters
    ...mapGetters('dunjons', ['getDunjonsByPartyId', 'getLastDunjonByPartyId']),

    account () {
      return this.connectedAccount
    }
  },
  methods: {
    // Mutations
    ...mapMutations('rounds', ['addRound']),
    ...mapMutations('playerStats', ['addPlayerStat']),
    ...mapMutations('enemyStats', ['addEnemyStat']),

    // Actions
    ...mapActions('parties', ['createParty']),
    ...mapActions('accounts', ['signIn', 'signUp']),

    startGame () {
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

      const accountId = this.connectedAccount ? this.connectedAccount.id : -1
      this.createParty({ accountId, defaultPlayerStat, defaultEnemyStat })
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
