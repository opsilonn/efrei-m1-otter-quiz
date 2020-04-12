<template>
  <v-list
    style="background-color: inherit"
    flat
    subheader
  >
    <!-- The next line adds a Label, but I'm not sure we really need it -->
    <!-- <v-subheader dark><label>History</label></v-subheader> -->

    <!-- We iterate through the questions -->
    <div
      v-for="(question, index) in questionItems" :key="question.id"
    >
      <!-- A divider between each question -->
      <v-divider/>

      <!-- We create a dropdown for the current question -->
      <v-list-item
        :style="'background-color: ' + (isPlayerCorrect(question) ? '#56966D' : '#954542')"
        @click="expendId == index ? expendId = null : expendId = index"
      >
        <!-- We create a dropdown for the current question -->
        <v-list-item-content>

          <!-- Title -->
          <v-list-item-title
            class="font-weight-black grey--text text--darken-4"
          >
            {{ question.title }}
          </v-list-item-title>

          <!-- If the current question is selected -->
          <v-list
            v-if="expendId == index"
            dense
          >
            <!-- We display all the answers -->
            <v-list-item v-for="(answer) in question.answers" :key="answer.id">
              <v-list-item-icon>
                <v-icon
                  :color="
                  (isPlayerCorrect(question) && isTheAnswerCorrect(question, answer)) ? 'green darken-4' :
                  (isPlayerCorrect(question) && !isTheAnswerCorrect(question, answer)) ? 'red darken-3' :
                  (!isPlayerCorrect(question) && isTheAnswerCorrect(question, answer)) ? 'green darken-2' : 'red darken-5'"
                >
                  {{isThePlayersAnswer(question, answer) ? 'mdi-check-box-outline' : 'mdi-checkbox-blank-outline'}}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <div
                  :style="(isThePlayersAnswer(question, answer) ? 'font-weight: bolder' : 'font-weight: normal')"
                  :class="
                  (isPlayerCorrect(question) && isTheAnswerCorrect(question, answer)) ? 'green--text text--darken-4' :
                  (isPlayerCorrect(question) && !isTheAnswerCorrect(question, answer)) ? 'red--text text--darken-3' :
                  (!isPlayerCorrect(question) && isTheAnswerCorrect(question, answer)) ? 'green--text text--darken-2' : 'red--text text--darken-5'"
                >
                  {{ question.answers[question.answers.indexOf(answer)] }}
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-list-item-content>

        <!-- Icon to expand the dropdown -->
        <v-list-item-icon>
          <v-icon :style="(expendId == index) ? 'opacity: 80%' : 'opacity: 30%'">{{(expendId == index) ? "mdi-chevron-up" : "mdi-chevron-down"}}</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </div>
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
        title: 'Is Piplup the best pokémon ?',
        answers: [
          'Yes',
          'No'
        ],
        correctAnswer: 0,
        playerAnswer: 1
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
