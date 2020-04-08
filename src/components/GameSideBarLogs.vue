<template>
    <v-container>
        <v-col v-for="(question) in questionItems" :key="question.id" cols="12" align="center" class="blue-grey darken-3">
            <v-dialog
                v-model="question.seeDetails"
                width="500"
                >
                <template v-slot:activator="{ on }">
                    <v-btn
                        align="center"
                        :color="isPlayerCorrect(question) ? 'green' : 'red'"
                        v-on="on"
                        large
                        >
                        {{ question.title }}
                    </v-btn>
                </template>

                <v-card>
                    <v-card-title
                    :class="isPlayerCorrect(question) ? 'headline grey lighten-2 green--text' : 'headline grey lighten-2 red--text'"
                    primary-title
                    v-text="isPlayerCorrect(question) ? 'Right answer !' : 'Wrong answer...'"
                    >
                    </v-card-title>

                    <v-card-text>
                        <h2 class="ma-10" align="center"> {{ question.title }} </h2>

                        <v-divider></v-divider>

                        <v-layout column justify-center align-center>
                            <v-row>
                                <v-col v-for="(answer) in question.answers" :key="answer.id" cols="12">

                                <h3 :class="
                                (isThePlayersAnswer(question, answer) && isTheAnswerCorrect(question, answer)) ? 'ma-5 green--text font-weight-black' :
                                (isThePlayersAnswer(question, answer) && !isTheAnswerCorrect(question, answer)) ? 'ma-5 red--text font-weight-black' :
                                (!isThePlayersAnswer(question, answer) && isTheAnswerCorrect(question, answer)) ? 'ma-5 green--text font-weight-light' :
                                'ma-5 red--text font-weight-light'">
                                    {{ question.answers[question.answers.indexOf(answer)] }}
                                </h3>

                                </v-col>
                            </v-row>
                        </v-layout>

                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-col>
    </v-container>
</template>

<script>
export default {
  name: 'GameSideBarLogs',
  data: () => ({
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
