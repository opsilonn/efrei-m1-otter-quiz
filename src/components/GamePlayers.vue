<template>
  <v-col
      class="d-flex justify-center align-end"
  >
    <div>
      <!-- The box is oriented differently, whether it's the player or the foe -->
      <div :class="isPlayer ? 'roundCornersPlayer' : 'roundCornersFoe'">
        <label>
          <!-- Name -->
          <h3 class="font-weight-black blue-grey--text text--lighten-5" style="text-shadow: 2px 2px 5px black; font-size: 2.5vh" align="center"> "name" </h3>

          <!-- Health bar -->
          <div style="background-color:#783D31" class="ma-2">
            <v-progress-linear
              :value="HP / maxHP * 100"
              buffer-value="0"
              color="green accent-3"
              rounded
              stream
              style="min-width: 50px"
            />
          </div>
        </label>

        <!-- Various counters (HP, money, mana...) -->
        <div>
          <label>
              <h4 style="font-size: 2vh">
                <!-- HP -->
                <span class="ma-2 green--text text--accent-3">
                  <v-icon size="4vh" class="green--text text--accent-3">mdi-hospital-box</v-icon>
                  {{ HP }}/{{ maxHP }}
                </span>

                <!-- Gold -->
                <span v-if='isPlayer' class="ma-2 amber--text text--lighten-2">
                  <v-icon size="4vh" class="amber--text text--lighten-2">mdi-currency-usd</v-icon>
                  {{gold}}
                </span>

                <!-- Mana -->
                <span v-if='isPlayer' class="ma-2 blue--text text--accent-3">
                  <v-icon size="4vh" class="blue--text text--accent-3">mdi-water</v-icon>
                  {{mana}}
                </span>
              </h4>
          </label>
        </div>
      </div>

      <div class="d-flex justify-center">
        <v-img
          class="shrink d-none d-xl-flex"
          :class="doAnim ? 'element-animation' : ''"
          :style="!isPlayer ? 'transform:scaleX(-1)' : ''"
          :src="imagePath"
          contain
          height="17rem"
          width="17rem"
        />
        <v-img
          class="shrink d-none d-lg-flex d-xl-none"
          :class="doAnim ? 'element-animation' : ''"
          :style="!isPlayer ? 'transform:scaleX(-1)' : ''"
          :src="imagePath"
          contain
          height="12rem"
          width="12rem"
        />
        <v-img
          class="shrink d-none d-md-flex d-lg-none"
          :class="doAnim ? 'element-animation' : ''"
          :style="!isPlayer ? 'transform:scaleX(-1)' : ''"
          :src="imagePath"
          contain
          height="8rem"
          width="8rem"
        />
        <v-img
          class="shrink d-none d-sm-flex d-md-none"
          :class="doAnim ? 'element-animation' : ''"
          :style="!isPlayer ? 'transform:scaleX(-1)' : ''"
          :src="imagePath"
          contain
          height="4rem"
          width="4rem"
        />
        <v-img
          class="shrink d-xs-flex d-sm-none"
          :class="doAnim ? 'element-animation' : ''"
          :style="!isPlayer ? 'transform:scaleX(-1)' : ''"
          :src="imagePath"
          contain
          height="2rem"
          width="2rem"
        />
      </div>
    </div>
  </v-col>
</template>

<script>

import { mapState, mapGetters } from 'vuex'

export default {
  name: 'GamePlayers',
  props: ['isPlayer', 'doAnim'],
  data: () => ({
  }),
  computed: {
    // States
    ...mapState('players', ['players']),
    ...mapState('dunjons', ['dunjons']),
    ...mapState('rounds', ['rounds']),
    ...mapState('playerStats', ['playerStats']),
    ...mapState('enemyStats', ['enemyStats']),

    // Getters
    ...mapGetters('players', ['getPlayerById']),
    ...mapGetters('dunjons', ['getLastDunjonByPlayerId']),
    ...mapGetters('rounds', ['getLastRoundByDunjonId']),
    ...mapGetters('playerStats', ['getPlayerStatByRoundId']),
    ...mapGetters('enemyStats', ['getEnemyStatByRoundId']),

    // Custom
    playerId () {
      return this.$route.params.playerId
    },
    dunjon () {
      return this.getLastDunjonByPlayerId(this.playerId) || { category: '9', difficulty: 'none', number: '0' }
    },
    round () {
      return this.getLastRoundByDunjonId(this.dunjon.id) || { roundTime: '0', result: 'none', number: '0' }
    },
    playerStat () {
      return this.getPlayerStatByRoundId(this.round.id) || { maxHP: '0', HP: '0', maxMana: '0', mana: '0', gold: '0' }
    },
    enemyStat () {
      return this.getEnemyStatByRoundId(this.round.id) || { maxHP: '0', HP: '0' }
    },
    maxHP () {
      return this.isPlayer ? this.playerStat.maxHP : this.enemyStat.maxHP
    },
    HP () {
      return this.isPlayer ? this.playerStat.HP : this.enemyStat.HP
    },
    maxMana () {
      return this.isPlayer ? this.playerStat.maxMana : 0
    },
    mana () {
      return this.isPlayer ? this.playerStat.mana : 0
    },
    gold () {
      return this.isPlayer ? this.playerStat.gold : 0
    },
    imagePath () {
      return this.isPlayer ? require('@/assets/sprite_player_1.png') : require('@/assets/sprite_player_3.png')
    }
  }
}
</script>

<style>
/* Sets up a picture background properly */
.prettyBackground {
  background-image: url('../assets/background_1.jpg');
  background-color: transparent;
  background-repeat: repeat;
  background-position: center;
  background-size: cover;
}

/* Nice box with corner for the player's UI */
.roundCornersPlayer {
  background: rgba(38, 50, 56, 0.6);
  border: 2px solid rgba(38, 50, 56, 0.75);
  border-radius: 1vh 6vh 2.5vh 6vh;
  padding: 2vh;
  margin-bottom: 1vh;
}

/* Nice box with corner for the foe's UI */
.roundCornersFoe {
  background: rgba(38, 50, 56, 0.6);
  border: 2px solid rgba(38, 50, 56, 0.75);
  border-radius: 6vh 1vh 6vh 2.5vh;
  padding: 2vh;
  margin-bottom: 1vh;
}

/*
.playerAnimation {
  width: 100px;
  height: 100px;
  position: relative;
  animation-name: playerMove;
  animation-duration: 3s;
  animation-iteration-count: 3;
  animation-direction: alternate-reverse;
}

@keyframes playerMove {
  0%   {left:0px}
  25%  {left:50px}
  50%  {left:0px}
  75% {right:50px}
  100% {right:0px}
}*/

/* A lot of stuff that I stole online */
.element-animation{
  animation: animationFrames linear 1s;
  animation-iteration-count: 1;
  transform-origin: 50% 50%;
  -webkit-animation: animationFrames linear 1s;
  -webkit-animation-iteration-count: 1;
  -webkit-transform-origin: 50% 50%;
  -moz-animation: animationFrames linear 1s;
  -moz-animation-iteration-count: 1;
  -moz-transform-origin: 50% 50%;
  -o-animation: animationFrames linear 1s;
  -o-animation-iteration-count: 1;
  -o-transform-origin: 50% 50%;
  -ms-animation: animationFrames linear 1s;
  -ms-animation-iteration-count: 1;
  -ms-transform-origin: 50% 50%;
}

/* Stuff that I also stole online */
@keyframes animationFrames{
  0% {
    transform:  translate(0px,0px)  rotate(0deg) ;
  }
  15% {
    transform:  translate(-25px,0px)  rotate(-5deg) ;
  }
  30% {
    transform:  translate(20px,0px)  rotate(3deg) ;
  }
  45% {
    transform:  translate(-15px,0px)  rotate(-3deg) ;
  }
  60% {
    transform:  translate(10px,0px)  rotate(2deg) ;
  }
  75% {
    transform:  translate(-5px,0px)  rotate(-1deg) ;
  }
  100% {
    transform:  translate(0px,0px)  rotate(0deg) ;
  }
}

/* Guess what ? I also stole that online ! */
@-moz-keyframes animationFrames{
  0% {
    -moz-transform:  translate(0px,0px)  rotate(0deg) ;
  }
  15% {
    -moz-transform:  translate(-25px,0px)  rotate(-5deg) ;
  }
  30% {
    -moz-transform:  translate(20px,0px)  rotate(3deg) ;
  }
  45% {
    -moz-transform:  translate(-15px,0px)  rotate(-3deg) ;
  }
  60% {
    -moz-transform:  translate(10px,0px)  rotate(2deg) ;
  }
  75% {
    -moz-transform:  translate(-5px,0px)  rotate(-1deg) ;
  }
  100% {
    -moz-transform:  translate(0px,0px)  rotate(0deg) ;
  }
}

@-webkit-keyframes animationFrames {
  0% {
    -webkit-transform:  translate(0px,0px)  rotate(0deg) ;
  }
  15% {
    -webkit-transform:  translate(-25px,0px)  rotate(-5deg) ;
  }
  30% {
    -webkit-transform:  translate(20px,0px)  rotate(3deg) ;
  }
  45% {
    -webkit-transform:  translate(-15px,0px)  rotate(-3deg) ;
  }
  60% {
    -webkit-transform:  translate(10px,0px)  rotate(2deg) ;
  }
  75% {
    -webkit-transform:  translate(-5px,0px)  rotate(-1deg) ;
  }
  100% {
    -webkit-transform:  translate(0px,0px)  rotate(0deg) ;
  }
}

@-o-keyframes animationFrames {
  0% {
    -o-transform:  translate(0px,0px)  rotate(0deg) ;
  }
  15% {
    -o-transform:  translate(-25px,0px)  rotate(-5deg) ;
  }
  30% {
    -o-transform:  translate(20px,0px)  rotate(3deg) ;
  }
  45% {
    -o-transform:  translate(-15px,0px)  rotate(-3deg) ;
  }
  60% {
    -o-transform:  translate(10px,0px)  rotate(2deg) ;
  }
  75% {
    -o-transform:  translate(-5px,0px)  rotate(-1deg) ;
  }
  100% {
    -o-transform:  translate(0px,0px)  rotate(0deg) ;
  }
}

@-ms-keyframes animationFrames {
  0% {
    -ms-transform:  translate(0px,0px)  rotate(0deg) ;
  }
  15% {
    -ms-transform:  translate(-25px,0px)  rotate(-5deg) ;
  }
  30% {
    -ms-transform:  translate(20px,0px)  rotate(3deg) ;
  }
  45% {
    -ms-transform:  translate(-15px,0px)  rotate(-3deg) ;
  }
  60% {
    -ms-transform:  translate(10px,0px)  rotate(2deg) ;
  }
  75% {
    -ms-transform:  translate(-5px,0px)  rotate(-1deg) ;
  }
  100% {
    -ms-transform:  translate(0px,0px)  rotate(0deg) ;
  }
}
</style>
