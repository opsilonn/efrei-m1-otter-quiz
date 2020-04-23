<template>
  <v-container>
    <v-card>
      <v-form v-model="valid">
        <v-row>
          <v-col
            cols="12"
            md="12"
          >
            <v-text-field
              v-model="username"
              label="Username"
              required
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="12"
          >
            <v-text-field
              v-model="password"
              label="Password"
              :rules="PasswordRules"
              required
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="12"
          >
          <div class='d-flex'>
            <v-btn small @click="log" :disabled=!valid>Sign In</v-btn>
            <v-spacer></v-spacer>
            <v-btn small @click="reg" :disabled=!valid>Sign Up</v-btn>
          </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex'

export default {
  name: 'loginVue',
  data: () => ({
    state: false,
    valid: false,
    title: '',
    password: '',
    todos: [],
    titleRules: [
      v => !!v || 'title is required', /* ! => oposite !!=> oposite oposite !![anyVar] true if the var is not empty false if the var is empty */
      v => v.length <= 10 || 'Name must be less than 10 characters',
      v => v !== 'francois' || 'francois est pas pd'
    ],
    PasswordRules: [
      v => !!v || 'content is required'
    ],
    username: ''
  }),
  computed: {
    // States
    ...mapState('accounts', ['connectedAccount'])
  },
  methods: {
    ...mapActions('accounts', ['signIn', 'signUp']),
    log () {
      console.log('the button is cliked', this.username, this.password)
      this.signIn({ username: this.username, password: this.password })
        .then((success) => {
          console.log(success)
        })
    },
    reg () {
      this.signUp({ username: this.username, password: this.password })
    }
  }
}
</script>
