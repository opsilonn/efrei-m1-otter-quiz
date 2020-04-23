<template>
  <div
    class="height100 prettyBackground"
  >

    <!-- Login Form -->
    <v-dialog v-model="dialogLogin" max-width="600px">

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

    <v-parallax
      style="width: 100%; height: 800px"
      :src="require('@/assets/parallax_1_sm.png')"
      class="pa-0 mx-0"
    >
      <v-row justify="center" class="pa-0 mx-0">
        <v-col class="pa-0 mx-0" :sm="12" :md="8">
          <v-card tile elevation="4" style="background: rgba(220, 150, 150, 0.98)">
            <!-- Text to welcome the Player -->
            <v-container class="text-center">
              <h1>Welcome to the <b> Otter Quiz </b> !</h1>
            </v-container>
          </v-card>
          <!-- Text to display the essential rules of the game -->
          <v-card tile elevation="0" style="background: rgba(255, 220, 220, 0.7)" class="pa-5 pl-12 pr-12">
            <v-container class="text-justify">
              <h3>
                This Website is a cross between a trivia game and a Rogue-like.<br/>
                You'll enter a dungeon composed of different levels :
                on each level, you'll face an opponent which you can beat by answering trivia questions.<br/>
                Depending on your answer, wrong or correct, you or your opponent will lose Health Points accordingly.<br/>
                Additionally, some objects and spells may also help you in different ways.
              </h3>
              <br>
              <h3 class="text-center">
                  Defeat him, take your reward and choose which lair to face next !
              </h3>
            </v-container>
            <!-- Buttons -->
            <v-row
              align="center"
              justify="center"
            >
              <!-- Button Logout -->
              <v-col v-if="isUserLoggedIn">
                <v-row align="center" justify="center">
                  <v-btn color="secondary" rounded x-large>
                      <v-icon left>mdi-logout</v-icon>
                      LogOut
                  </v-btn>
                </v-row>
              </v-col>
              <v-col v-else>
                <v-row
                  align="center"
                  justify="center"
                  @click="dialogLogin = true"
                >
                  <v-card elevation="10">
                    <v-card-actions class="mx-0 pa-0">
                      <label class="blue pa-3">
                        <v-icon class="pb-1" left small>mdi-login</v-icon>
                        LogIn
                      </label>
                      <label class="orange pa-3">
                        SignUp
                      </label>
                    </v-card-actions>
                  </v-card>
                </v-row>
              </v-col>

              <!-- Button Launch Game -->
              <v-col>
                <v-row align="center" justify="center">
                  <v-btn color="success" tile rounded x-large @click="startGame()">
                      <v-icon left>mdi-gamepad-variant</v-icon>
                      Launch a Game !
                  </v-btn>
                </v-row>
              </v-col>
            </v-row>
          </v-card>

          <v-card height="100%" tile elevation="4" style="background: rgba(220, 150, 150, 0.7)">
            <!-- ScoreBoard -->
            <v-container class="text-center">
              <h2>Best players</h2>
              <br>
              <v-data-table
                :headers="scoreboardHeaders"
                :items="scoreboardItems"
                :items-per-page="5"
              />
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-parallax>

    <v-parallax
      style="width: 100%; height: 730px"
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
      class="pa-0 mx-0"
    >
      <v-row justify="center" class="pa-0 mx-0">
        <v-col class="pa-0 mx-0" :sm="12" :md="8">
          <v-card tile elevation="4" style="background: rgba(150, 150, 220, 0.98)">
            <!-- Text to welcome the Player -->
            <v-container class="text-center">
              <h1>How to play ?</h1>
            </v-container>
          </v-card>
          <v-card height="100%" tile elevation="4" style="background: rgba(150, 150, 255, 0.7)" class="pa-5 pl-12 pr-12">
            <!-- Text to display... stuff -->
            <v-container class="text-justify">
              <h3>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                <br/>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </h3>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-parallax>

  </div>
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
