<template>
  <v-container
    class="height100 prettyBackground"
    fluid>

    <!-- Text to welcome the Player -->
    <v-container class="text-center">
      <h1>Welcome to the <b> Otter Quiz </b> !</h1>
      <h5 class="font-italic">(still searching for a better name)</h5>
    </v-container>

    <!-- Text to display the essential rules of the game -->
    <v-container class="text-justify">
      <h3>
        This Website is a cross between a trivia game and a Rogue-like.
        You'll enter a dungeon composed of different levels :
        on each level, you'll face an opponent which you can beat by answering trivia questions.
        Depending on your answer, wrong or correct, you or your opponent will lose Health Points accordingly.
        Additionally, some objects and spells may also help you in different ways.
      </h3>
      <br>
      <h3 class="text-center">
          Defeat him, take your reward and choose which lair to face next !
      </h3>
      <br>
    </v-container>

    <!-- Buttons -->
    <v-row
      no-gutters class="d-flex"
      align="center"
      justify="center">

     <!-- Button Logout -->
      <v-col v-if="isUserLoggedIn">
        <v-row align="center" justify="center">
          <v-btn color="secondary" rounded x-large>
              <v-icon left>mdi-logout</v-icon>
              Logout...
          </v-btn>
        </v-row>
      </v-col>

     <!-- Button Login -->
      <v-col v-else>
        <v-row align="center" justify="center">
          <!-- Login Form -->
          <v-dialog v-model="dialogLogin" persistent max-width="600px">
            <!-- Login Button -->
            <template v-slot:activator="{ on }">
              <v-btn color="secondary" dark v-on="on" rounded x-large>
                <v-icon left>mdi-login</v-icon>
                Login !
              </v-btn>
            </template>

            <!-- Login Dialog -->
            <v-card>
              <!-- Title -->
              <v-card-title>
                <span class="headline">Login</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                    <v-form>
                      <!-- Text -->
                      <h3 class="pa-4" align="center"> Login to keep track of your score...</h3>
                      <v-spacer/>

                      <!-- Field : Username -->
                      <v-text-field
                        class="pa-4"
                        v-model="username"
                        label="Username"
                        prepend-icon="mdi-face"
                        :rules="[rules.required]"
                        clearable
                        counter
                        maxlength="15"
                      />

                      <!-- Field : Password -->
                      <v-text-field
                        class="pa-4"
                        v-model="password"
                        label="Password"
                        type="password"
                        prepend-icon="mdi-lock"
                        :rules="[rules.required]"
                        required
                      />
                    </v-form>
                </v-container>
              </v-card-text>

              <!-- Buttons -->
              <v-card-actions>
                <v-spacer/>
                <v-btn color="secondary" text @click="dialogLogin = false">Close</v-btn>
                <v-btn color="success" text @click="dialogLogin = false; login()">Login !</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-col>

      <!-- Logo :) -->
      <v-col class="d-flex justify-center ">
        <v-img
          class="shrink d-none d-xl-flex"
          :src="require('@/assets/logo.png')"
          contain
          height="17rem"
          width="17rem"
        />
        <v-img
          class="shrink d-none d-lg-flex d-xl-none"
          :src="require('@/assets/logo.png')"
          contain
          height="12rem"
          width="12rem"
        />
        <v-img
          class="shrink d-none d-md-flex d-lg-none"
          :src="require('@/assets/logo.png')"
          contain
          height="8rem"
          width="8rem"
        />
        <v-img
          class="shrink d-none d-sm-flex d-md-none"
          :src="require('@/assets/logo.png')"
          contain
          height="4rem"
          width="4rem"
        />
        <v-img
          class="shrink d-xs-flex d-sm-none"
          :src="require('@/assets/logo.png')"
          contain
          height="2rem"
          width="2rem"
        />
      </v-col>

     <!-- Button Launch Game -->
      <v-col>
        <v-row align="center" justify="center">
          <v-btn color="success" rounded x-large @click="startGame()">
              <v-icon left>mdi-gamepad-variant</v-icon>
              Launch a Game !
          </v-btn>
        </v-row>
      </v-col>
    </v-row>

    <br>
    <br>

    <!-- ScoreBoard -->
    <v-container class="text-center">
      <h2>ScoreBoard</h2>
      <br>
      <v-data-table
        :headers="scoreboardHeaders"
        :items="scoreboardItems"
        :items-per-page="5"
      />
    </v-container>

    <br>
    <br>

    <!-- Text to display... stuff -->
    <v-container class="text-justify">
      <h3>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </h3>
    </v-container>

  </v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'Home',
  data: () => ({
    data: null,
    isUserLoggedIn: false,
    dialogLogin: false,
    username: '',
    password: '',
    rules: {
      required: value => !!value || 'Required.'
    },
    scoreboardHeaders: [
      {
        text: 'Players',
        align: 'center',
        sortable: true,
        value: 'name'
      },
      { text: 'Score', value: 'score' },
      { text: 'Dungeons crossed', value: 'dungeons' },
      { text: 'Rounds fought', value: 'roundsFought' },
      { text: 'Rounds Won', value: 'roundsWon' }
    ],
    scoreboardItems: [
      {
        name: 'James Hetfield',
        score: 14052,
        dungeons: 4,
        roundsFought: 38,
        roundsWon: 33
      },
      {
        name: 'Jim Root',
        score: 13848,
        dungeons: 3,
        roundsFought: 29,
        roundsWon: 22
      },
      {
        name: 'Kirk Hammett',
        score: 12745,
        dungeons: 3,
        roundsFought: 33,
        roundsWon: 27
      },
      {
        name: 'John Frusciante',
        score: 10843,
        dungeons: 2,
        roundsFought: 24,
        roundsWon: 12
      }
    ]
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

    // Method to Log in
    login () {
      console.log('the button is cliked', this.username, this.password)
      /*
      this.signIn({ username: this.username, password: this.password })
        .then((success) => {
          console.log(success)
        })
      */
    },
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
