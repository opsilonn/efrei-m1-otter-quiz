<template>
    <div class="height100">
        <!-- We divide the space in 2 columns-->
        <v-row class="height100">
            <!-- Column 1 : Game footage -->
            <v-col
                class="ma-0 pa-0 height100"
                cols="8"
                >

                <!-- We divide this row in 2 verticals boxes -->
                <v-row class="height100">

                    <!-- Column 1-A : Fighters -->
                    <v-col
                    class="ma-0 pa-0 height60"
                    cols="12"
                    >
                        <GameFighters/>
                    </v-col>

                    <!-- Column 1-B : Question Choices -->
                    <v-col
                    class="ma-0 pa-0 height40"
                    cols="12"
                    >
                        <GameQuestions/>
                    </v-col>
                </v-row>
            </v-col>

            <!-- Column 2 : Side Navbar -->
            <v-col
                class="ma-0 pa-0 height100"
                cols="4"
                >
                    <GameSideBar/>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import GameFighters from '@/components/GameFighters'
import GameQuestions from '@/components/GameQuestions'
import GameSideBar from '@/components/GameSideBar'

export default {
  name: 'Hugues',
  components: {
    GameFighters,
    GameQuestions,
    GameSideBar
  }
}
</script>
