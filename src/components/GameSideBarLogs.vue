<template>
  <v-list
    style="background-color: inherit"
    flat
    subheader
  >
    <v-subheader dark><label>History</label></v-subheader>
    <v-list-item
      v-for="(question, index) in questionItems" :key="question.id"
      :style="'background-color: ' + (isPlayerCorrect(question) ? '#56966D' : '#954542')"
      @click="expendId == index ? expendId = null : expendId = index"
    >
      <v-list-item-content>
        <v-list-item-title
          class="font-weight-black grey--text text--darken-4"
        >
          {{ question.title }}
        </v-list-item-title>
        <v-list
          v-if="expendId == index"
          style="background-color: inherit"
          dense
        >
          <v-list-item v-for="(answer) in question.answers" :key="answer.id">
            <v-list-item-icon>
              <v-icon
                :color="isTheAnswerCorrect(question, answer) ? 'green darken-4' : 'red darken-3'"
              >
                {{isThePlayersAnswer(question, answer) ? 'mdi-check-box-outline' : 'mdi-checkbox-blank-outline'}}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <div :class="
                (isThePlayersAnswer(question, answer) ? 'font-weight-black ' : 'font-weight-medium ') +
                (isTheAnswerCorrect(question, answer) ? 'green--text text--darken-4' : 'red--text text--darken-3')"
              >
                {{ question.answers[question.answers.indexOf(answer)] }}
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-list-item-content>
      <v-list-item-icon>
        <v-icon v-if="expendId == index">mdi-chevron-up</v-icon>
        <v-icon v-else>mdi-chevron-down</v-icon>
      </v-list-item-icon>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: 'GameSideBarLogs',
  data: () => ({
    expendId: {},
    questionItems: [
      {
        seeDetails: false,
        title: 'Is Piplup the best pokémon ?',
        answers: [
          'Yes',
          'No'
        ],
        correctAnswer: 0,
        playerAnswer: 1
      },
      {
        seeDetails: false,
        title: 'What is Metallica\'s third album ?',
        answers: [
          'Metallica',
          'Kill\'em all',
          'Ride the Lightning',
          'Master of Puppets'
        ],
        correctAnswer: 3,
        playerAnswer: 3
      },
      {
        seeDetails: false,
        title: 'Who let the dogs out ?',
        answers: [
          'HOU',
          'OU',
          'OUH',
          'HOUH'
        ],
        correctAnswer: 1,
        playerAnswer: 2
      },
      {
        seeDetails: false,
        title: 'Which one is the latest Half-Life game ?',
        answers: [
          '2',
          '3',
          'Alyx',
          '2 - part two'
        ],
        correctAnswer: 2,
        playerAnswer: 2
      }
    ]
  }),
  methods: {
    isPlayerCorrect (question) {
      return question.correctAnswer === question.playerAnswer
    },
    isTheAnswerCorrect (question, answer) {
      return question.correctAnswer === question.answers.indexOf(answer)
    },
    isThePlayersAnswer (question, answer) {
      return question.playerAnswer === question.answers.indexOf(answer)
    }
  }
}
</script>
