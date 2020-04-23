<template>
  <div
    class="height100 prettyBackground"
  >

    <!-- Login Form -->
    <v-dialog v-model="isDialogActive" max-width="750px">

      <!-- Login Dialog -->
      <v-card>
        <v-tabs
          background-color="blue-grey darken-4"
          v-model="tabModel"
          grow
          dark
        >
        <!-- All the menus Tabs-->
        <!-- 1 - Login -->
        <v-tab>
          <v-icon left>mdi-login</v-icon>
          <div class="shrink mt-1 d-none d-lg-flex">
            Login
          </div>
        </v-tab>

        <!-- 2 - Sign in -->
        <v-tab>
          <v-icon left>mdi-account-plus</v-icon>
          <div class="shrink mt-1 d-none d-lg-flex">
            Sign in
          </div>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tabModel">
        <!-- All the menu's contents -->
        <!-- 1 - Login -->
        <v-tab-item>
          <v-card-text>
            <v-container>
              <v-form>
                <!-- Text -->
                <h3 class="pa-4" align="center"> Have you tried "user1" and "test" ?</h3>
                <v-spacer/>

                <!-- Field : Username -->
                <v-text-field
                  class="pa-4"
                  v-model="loginUsername"
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
                  v-model="loginPassword"
                  label="Password"
                  type="password"
                  prepend-icon="mdi-lock"
                  :rules="[rules.required]"
                  required
                />
              </v-form>

              <br><br><br>

              <!-- ALERT - displayed if the credentials are incorrect -->
              <v-alert
                :value="loginFailed"
                dense
                outlined
                dismissible
                prominent
                type="error"
                transition="scale-transition"
              >
                Please fill the form accordingly
              </v-alert>
            </v-container>
          </v-card-text>
        </v-tab-item>

        <!-- 2 - Sign up -->
        <v-tab-item>
          <v-card-text>
            <v-container>
              <v-form>
                <!-- Text -->
                <h3 class="pa-4" align="center"> Having an account allows you to keep track of your scores</h3>
                <v-spacer/>

                <!-- Field : Username -->
                <v-text-field
                  class="pa-4"
                  v-model="signUpUsername"
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
                  v-model="signUpPassword"
                  label="Password"
                  type="password"
                  prepend-icon="mdi-lock"
                  :rules="[rules.required]"
                  required
                />

                <!-- Field : E-mail -->
                <v-text-field
                  class="pa-4"
                  v-model="signUpEmail"
                  label="E-mail"
                  prepend-icon="mdi-at"
                  :rules="[rules.required, rules.email]"
                  required
                  clearable
                />
              </v-form>
              <br><br><br>

              <!-- ALERT - displayed if the credentials are incorrect -->
              <v-alert
                :value="signUpFailed"
                dense
                outlined
                dismissible
                prominent
                type="error"
                transition="scale-transition"
              >
                Please fill the form accordingly
              </v-alert>
            </v-container>
          </v-card-text>
        </v-tab-item>
      </v-tabs-items>

        <!-- Buttons -->
        <v-card-actions>
          <v-spacer/>
          <v-btn color="secondary" text @click="isDialogActive = false">Close</v-btn>
          <v-btn color="success" text @click="tabModel == 0 ? logIn() : signUp()"> {{ tabModel == 0 ? 'Login !' : 'Sign up !'}} </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-parallax
      style="width: 100%; height: 1000px"
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
                This Website is a cross between a trivia game and a Rogue-like.
                <br>
                You'll enter a dungeon composed of different levels :
                on each level, you'll face an opponent which you can beat by answering trivia questions.
                Depending on your answer, wrong or correct, you or your opponent will lose Health Points accordingly.
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
              <!-- Button Login -->
              <v-col v-if="account.id == '-1'">
                <v-row align="center" justify="center">
                  <!-- Login Button -->
                  <v-btn dark color="secondary" rounded x-large @click="isDialogActive = true; tabModel = 0">
                    <v-icon left>mdi-login</v-icon>
                    LogIn
                  </v-btn>
                </v-row>

                <br>
                <br>

                <v-row align="center" justify="center">
                  <!-- Login Button -->
                  <v-btn dark color="secondary" rounded x-large @click="isDialogActive = true; tabModel = 1">
                    <v-icon left>mdi-account-plus</v-icon>
                    SignUp
                  </v-btn>
                </v-row>
              </v-col>

              <!-- Button Logout -->
              <v-col v-else>
                <v-row align="center" justify="center">
                  <v-btn color="secondary" rounded x-large @click="logOut()">
                      <v-icon left>mdi-logout</v-icon>
                      LogOut
                  </v-btn>
                </v-row>
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
          </v-card>

          <v-card height="100%" tile elevation="4" style="background: rgba(220, 150, 150, 0.7)">
            <!-- ScoreBoard -->
            <v-container class="text-center">
              <h2>Best players</h2>
              <br>
              <v-data-table
                :headers="scoreboardHeaders"
                :items="populateScoreBoard()"
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
    isDialogActive: false,
    tabModel: null,
    loginUsername: '',
    loginPassword: '',
    signUpUsername: '',
    signUpPassword: '',
    signUpEmail: '',
    loginFailed: false,
    signUpFailed: false,
    rules: {
      required: value => !!value || 'Required.',
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      }
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
    names: [
      'John Frusciante',
      'James Hetlfield',
      'Kirk Hammett',
      'Cliff Burton',
      'Tobias Forge',
      'Synister Gate',
      'Corey Taylor',
      'Jim Root',
      'Louka Diamond',
      'Dawn Pearl',
      'Luke Skywalker',
      'Darth Maul',
      'Darth Tyrannus',
      'Darth Sidious',
      'Darth Vader',
      'Darth Nihilus',
      'Kylo Ren',
      'General Grievous',
      'Karl Franz',
      'Krog-Gar',
      'Ulthuan',
      'Archaon',
      'Tobby-One-Eye'
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
    ...mapMutations('accounts', ['logOut']),

    // Actions
    ...mapActions('parties', ['createParty']),
    ...mapActions('accounts', ['signIn', 'signUp']),

    // Method to Log in (connect to account)
    logIn () {
      // We ask the login method
      console.log(`[Home] partyId: ${this.account.id}`)
      console.log(`[BEFORE] ${this.account.id === '-1'}`)
      this.signIn({ username: this.loginUsername, password: this.loginPassword })
        .then((success) => {
          console.log('LOG IN - success')
          console.log(success)
          console.log(this.account.id)
          this.isDialogActive = false
          console.log(`[AFTER] ${this.account.id === '-1'}`)
        })
        .catch((err) => {
          console.log('LOGIN - error')
          console.log(err)
          this.loginFailed = true
        })
    },

    // Method to Sign in (create new account)
    signUp () {
      // We ask the login method
      this.signUp({ username: this.signUpUsername, password: this.signUpPassword })
        .then((success) => {
          console.log('SIGN UP - success')
          console.log(success)
          this.isDialogActive = false
          // this.$router.push({ name: 'Home' })
        })
        .catch((err) => {
          console.log('SIGN UP - error')
          console.log(err)
          this.signUpFailed = true
        })
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
    },

    // Returns a random int
    getRandomInt (max) {
      return Math.floor(Math.random() * Math.floor(max)) + 1
    },

    // Populates the ScoreBoard
    populateScoreBoard () {
      // We initialize a List
      var list = []

      // We add all the questions to our List several times
      for (var i = 0; i < 25; i++) {
        var _dungeons = this.getRandomInt(5)
        var _roundsFought = this.getRandomInt(_dungeons * 5)
        var _roundsWon = this.getRandomInt(_roundsFought - 1)

        list.push(
          {
            name: this.names[this.getRandomInt(this.names.length - 1)],
            score: this.getRandomInt(_dungeons * 1000),
            dungeons: _dungeons,
            roundsFought: _roundsFought,
            roundsWon: _roundsWon
          })
      }

      // We return the List
      return list
    }
  }
}
</script>
