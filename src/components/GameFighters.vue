<template>
  <div class="prettyBackground" style="height: 100%">
    <!-- Turn and category -->
    <v-container>
      <label>
        <h2 align="center">
            Turn n° {{ turn }}
            <br>
            {{ categories[Math.floor(Math.random() * categories.length)] }}
        </h2>
      </label>
    </v-container>

    <!-- Display the players -->
    <div class="d-flex align-end" style="height: 100%; padding-bottom: 100px">
      <v-row no-gutters>
        <v-col
          class="d-flex justify-center align-end"
          v-for="(player, index) in players"
          :key="index">
          <div>
            <div :class="player.isPlayer ? 'roundCornersPlayer' : 'roundCornersFoe'">
              <label>
                <h3 class="font-weight-black blue-grey--text text--lighten-5" style="text-shadow: 2px 2px 5px black" align="center"> {{player.name}} </h3>
                <h4 class="green--text text--accent-3"> HP : {{ player.hp }} / {{ player.hpMax }}
                  <div style="background-color:#783D31">
                    <v-progress-linear
                      :value="player.hp / player.hpMax * 100"
                      buffer-value="0"
                      color="green accent-3"
                      rounded
                      stream
                      >
                    </v-progress-linear>
                  </div>
                </h4>
              </label>
              <div v-if='player.isPlayer' class="d-flex align-center">
                <label><h4 class="amber--text text--lighten-2"> $ {{player.money}} </h4></label>
              </div>
            </div>

            <v-img
              :class="doAnim ? 'element-animation' : ''"
              :style="!player.isPlayer ? 'transform:scaleX(-1)' : ''"
              v-bind:src="player.imagePath"
              contain
              height="200px"
              width="200px"/>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameFighters',
  data: () => {
    return {
      doAnim: false,
      turn: Math.floor(Math.random() * 10) + 1,
      categories: ['History / Geography', 'Movies / Series', 'Poetry', 'Pocket Monsters', 'Magic the Gathering', 'Warcraft III, (Original Edition)'],
      players: [
        {
          name: 'I\'m the player !',
          imagePath: require('@/assets/sprite_player_1.png'),
          hp: 3,
          hpMax: 5,
          money: 45,
          isPlayer: true
        },
        {
          name: 'I\'m the foe !',
          imagePath: require('@/assets/sprite_player_3.png'),
          hp: 2,
          hpMax: 7,
          money: 15
        }]
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
  border-radius: 5px 30px 12px 30px;
  padding: 15px;
  margin: 15px;
}

/* Nice box with corner for the foe's UI */
.roundCornersFoe {
  background: rgba(38, 50, 56, 0.6);
  border: 2px solid rgba(38, 50, 56, 0.75);
  border-radius: 30px 5px 30px 12px;
  padding: 15px;
  margin: 15px;
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
