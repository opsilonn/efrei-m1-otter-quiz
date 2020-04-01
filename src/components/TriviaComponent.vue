<template>
  <v-container>
    <v-btn
      @click="fetchTrivias({ amount: 2 })"
    >
      fetch trivia
    </v-btn>

    <v-card
      style="margin: 10px; padding: 10px"
      v-for="trivia in trivias" v-bind:key="trivia.id"
      dark
    >
      <v-card-title v-html="trivia.question"/>
      <v-row>
        <v-col cols="6"
          v-for="(answer, index) in trivia.answers" v-bind:key="index"
        >
          <v-hover v-slot:default="{ hover }">
            <v-card
              style="margin: 5px; padding: 5px"
              :style="'background-color: ' + (hover ? (answer.value ? themes.Success : themes.Failure) :themes.DarkLight)"
            >
              <v-card-text v-html="answer.answer"/>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'HelloWorld',

  data: () => ({
  }),
  computed: {
    // States
    ...mapState('themes', ['themes']),
    ...mapState('trivias', ['trivias']),

    // Getters
    ...mapGetters('trivias', ['getLastTrivia']),

    // Custom
    lastTrivia () {
      return this.trivias.getLastTrivia()
    }
  },
  async mounted () {
    this.fetchTrivias({ amount: 1 })
  },
  methods: {
    ...mapActions('trivias', ['fetchTrivias'])
  }
}
</script>
