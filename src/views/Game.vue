<template>
  <div class="height100">

    <GameMaster
      :playerId="playerId"
    />
    <GameSideBar
      :playerId="playerId"
    />
    <!-- We divide this row in 2 verticals boxes -->
    <v-row class="height100">

      <!-- Column 1-A : Fighters -->
      <v-col
        class="ma-0 pa-0 height60"
        cols="12"
      >
        <GameFighters
          :playerId="playerId"
        />
      </v-col>

      <!-- Column 1-B : Question Choices -->
      <v-col
      class="ma-0 pa-0 height40"
      cols="12"
      >
        <GameQuestions
          :playerId="playerId"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import GameMaster from '@/components/GameMaster'
import GameFighters from '@/components/GameFighters'
import GameQuestions from '@/components/GameQuestions'
import GameSideBar from '@/components/GameSideBar'

export default {
  name: 'Game',
  components: {
    GameMaster,
    GameFighters,
    GameQuestions,
    GameSideBar
  },
  data: () => ({
    data: null
  }),
  computed: {
    // Customs
    playerId () {
      return parseInt(this.$route.params.playerId)
    }
  }
}
</script>
