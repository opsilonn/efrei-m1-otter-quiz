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
                v-model="login"
                label="login"
                required
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="12"
            >
              <v-text-field
                v-model="password"
                label="password"
                :rules="PasswordRules"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="12"
            >
            <div class='d-flex'>
              <v-btn small @click="log" :disabled=!valid>login</v-btn>
              <v-spacer></v-spacer>
              <v-btn small @click="reg" :disabled=!valid>register</v-btn>
            </div>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-container>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters } from 'vuex'

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
    login: ''
  }),
  computed: {
    // getters
    ...mapGetters('accounts', ['getConnectedAccount'])
  },
  methods: {
    ...mapActions('accounts', ['connection', 'register']),
    async log () {
      console.log('the button is cliked', this.login, this.password)
      await this.connection({ login: this.login, password: this.password }).then((success) => { console.log(success) })
    },
    async reg () {
      await this.register({ login: this.login, password: this.password })
    }
  }
}
</script>
