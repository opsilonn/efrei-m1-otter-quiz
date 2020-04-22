<template>
  <v-col
      class="d-flex justify-center align-end"
  >
    <div>
      <!-- The box is oriented differently, whether it's the player or the foe -->
      <div :class="isPlayer ? 'roundCornersPlayer' : 'roundCornersFoe'">
        <label>
          <!-- Name -->
          <h3
            class="font-weight-black blue-grey--text text--lighten-5"
            style="text-shadow: 2px 2px 5px black; font-size: 2.5vh"
            align="center">
            "name"
          </h3>

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
                  {{ HP }} / {{ maxHP }}
                </span>

                <!-- Gold -->
                <span v-if='isPlayer' class="ma-2 amber--text text--lighten-2">
                  <v-icon size="4vh" class="amber--text text--lighten-2">mdi-currency-usd</v-icon>
                  {{ gold }}
                </span>

                <!-- Mana -->
                <span v-if='isPlayer' class="ma-2 blue--text text--accent-3">
                  <v-icon size="4vh" class="blue--text text--accent-3">mdi-water</v-icon>
                  {{mana}} / {{maxMana}}
                </span>
              </h4>
          </label>
        </div>
      </div>

      <div :class="'d-flex justify-center ' + (isPlayer ? animPlayer : animEnemy)">
        <v-img
          class="shrink d-none d-xl-flex"
          :style="!isPlayer ? 'transform:scaleX(-1)' : ''"
          :src="imagePath"
          contain
          height="17rem"
          width="17rem"
        />
        <v-img
          class="shrink d-none d-lg-flex d-xl-none"
          :style="!isPlayer ? 'transform:scaleX(-1)' : ''"
          :src="imagePath"
          contain
          height="12rem"
          width="12rem"
        />
        <v-img
          class="shrink d-none d-md-flex d-lg-none"
          :style="!isPlayer ? 'transform:scaleX(-1)' : ''"
          :src="imagePath"
          contain
          height="8rem"
          width="8rem"
        />
        <v-img
          class="shrink d-none d-sm-flex d-md-none"
          :style="!isPlayer ? 'transform:scaleX(-1)' : ''"
          :src="imagePath"
          contain
          height="4rem"
          width="4rem"
        />
        <v-img
          class="shrink d-xs-flex d-sm-none"
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
import EventBus from '@/EventBus.js'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'GameParties',
  props: ['isPlayer'],
  data: () => ({
    animPlayer: '',
    animEnemy: '',
    animationKey: {
      HAPPY: 'anim-happy',
      DAMAGE: 'anim-damage',
      DEATH: 'anim-death'
    }
  }),
  computed: {
    // States
    ...mapState('parties', ['parties']),
    ...mapState('dunjons', ['dunjons']),
    ...mapState('rounds', ['rounds']),
    ...mapState('playerStats', ['playerStats']),
    ...mapState('enemyStats', ['enemyStats']),

    // Getters
    ...mapGetters('parties', ['getPartyById']),
    ...mapGetters('dunjons', ['getLastDunjonByPartyId']),
    ...mapGetters('rounds', ['getLastRoundByDunjonId']),
    ...mapGetters('playerStats', ['getPlayerStatByRoundId']),
    ...mapGetters('enemyStats', ['getEnemyStatByRoundId']),

    // Custom
    partyId () {
      return this.$route.params.partyId
    },
    dunjon () {
      return this.getLastDunjonByPartyId(this.partyId) || { category: '9', difficulty: 'none', number: '0' }
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
      return this.isPlayer ? require('@/assets/sprite_player_' + this.getRandomInt(3) + '.png') : require('@/assets/sprite_player_' + this.getRandomInt(3) + '.png')
    }
  },
  methods: {
    // Returns a Random integer
    getRandomInt (max) {
      return Math.floor(Math.random() * Math.floor(max)) + 1
    },

    // Resets all the animations
    resetAnimations () {
      this.animPlayer = ''
      this.animEnemy = ''
    },

    // DAMAGE
    // When the player takes damage
    playerTakesDamage () {
      this.animPlayer = this.animationKey.DAMAGE
      this.animEnemy = this.animationKey.HAPPY
    },
    // When the enemy takes damage
    enemyTakesDamage () {
      this.animPlayer = this.animationKey.HAPPY
      this.animEnemy = this.animationKey.DAMAGE
    },

    // DEATH
    // When the player dies
    playerDeath () {
      this.animPlayer = this.animationKey.DEATH
      this.animEnemy = this.animationKey.HAPPY
    },
    // When the enemy dies
    enemyDeath () {
      this.animPlayer = this.animationKey.HAPPY
      this.animEnemy = this.animationKey.DEATH
    }
  },
  created () {
    // Main listener : whenever the timer resets, we withdraw the animations
    EventBus.$on('timer-end', () => this.resetAnimations())

    // Depending on the event, we call the corresponding animations
    EventBus.$on('player-damage', () => this.playerTakesDamage())
    EventBus.$on('enemy-damage', () => this.enemyTakesDamage())

    EventBus.$on('player-death', () => this.playerDeath())
    EventBus.$on('enemy-death', () => this.enemyDeath())
  }
}
</script>

<style>
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

/* Animation : happy */
.anim-happy{
  animation: animationHappy linear 0.8s;
  animation-iteration-count: 1;
  transform-origin: 50% 50%;
  -webkit-animation: animationHappy linear 0.8s;
  -webkit-animation-iteration-count: 1;
  -webkit-transform-origin: 50% 50%;
  -moz-animation: animationHappy linear 0.8s;
  -moz-animation-iteration-count: 1;
  -moz-transform-origin: 50% 50%;
  -o-animation: animationHappy linear 0.8s;
  -o-animation-iteration-count: 1;
  -o-transform-origin: 50% 50%;
  -ms-animation: animationHappy linear 0.8s;
  -ms-animation-iteration-count: 1;
  -ms-transform-origin: 50% 50%;
}
@keyframes animationHappy{
  0% {
    transform:  translate(0px,0px)  ;
  }
  15% {
    transform:  translate(0px,-25px)  ;
  }
  30% {
    transform:  translate(0px,0px)  ;
  }
  45% {
    transform:  translate(0px,-15px)  ;
  }
  60% {
    transform:  translate(0px,0px)  ;
  }
  75% {
    transform:  translate(0px,-5px)  ;
  }
  100% {
    transform:  translate(0px,0px)  ;
  }
}
@-moz-keyframes animationHappy{
  0% {
    -moz-transform:  translate(0px,0px)  ;
  }
  15% {
    -moz-transform:  translate(0px,-25px)  ;
  }
  30% {
    -moz-transform:  translate(0px,0px)  ;
  }
  45% {
    -moz-transform:  translate(0px,-15px)  ;
  }
  60% {
    -moz-transform:  translate(0px,0px)  ;
  }
  75% {
    -moz-transform:  translate(0px,-5px)  ;
  }
  100% {
    -moz-transform:  translate(0px,0px)  ;
  }
}
@-webkit-keyframes animationHappy {
  0% {
    -webkit-transform:  translate(0px,0px)  ;
  }
  15% {
    -webkit-transform:  translate(0px,-25px)  ;
  }
  30% {
    -webkit-transform:  translate(0px,0px)  ;
  }
  45% {
    -webkit-transform:  translate(0px,-15px)  ;
  }
  60% {
    -webkit-transform:  translate(0px,0px)  ;
  }
  75% {
    -webkit-transform:  translate(0px,-5px)  ;
  }
  100% {
    -webkit-transform:  translate(0px,0px)  ;
  }
}
@-o-keyframes animationHappy {
  0% {
    -o-transform:  translate(0px,0px)  ;
  }
  15% {
    -o-transform:  translate(0px,-25px)  ;
  }
  30% {
    -o-transform:  translate(0px,0px)  ;
  }
  45% {
    -o-transform:  translate(0px,-15px)  ;
  }
  60% {
    -o-transform:  translate(0px,0px)  ;
  }
  75% {
    -o-transform:  translate(0px,-5px)  ;
  }
  100% {
    -o-transform:  translate(0px,0px)  ;
  }
}
@-ms-keyframes animationHappy {
  0% {
    -ms-transform:  translate(0px,0px)  ;
  }
  15% {
    -ms-transform:  translate(0px,-25px)  ;
  }
  30% {
    -ms-transform:  translate(0px,0px)  ;
  }
  45% {
    -ms-transform:  translate(0px,-15px)  ;
  }
  60% {
    -ms-transform:  translate(0px,0px)  ;
  }
  75% {
    -ms-transform:  translate(0px,-5px)  ;
  }
  100% {
    -ms-transform:  translate(0px,0px)  ;
  }
}

/* Animation : taking damage(s) */
.anim-damage{
  animation: animationDamage linear 1s;
  animation-iteration-count: 1;
  transform-origin: 50% 50%;
  -webkit-animation: animationDamage linear 1s;
  -webkit-animation-iteration-count: 1;
  -webkit-transform-origin: 50% 50%;
  -moz-animation: animationDamage linear 1s;
  -moz-animation-iteration-count: 1;
  -moz-transform-origin: 50% 50%;
  -o-animation: animationDamage linear 1s;
  -o-animation-iteration-count: 1;
  -o-transform-origin: 50% 50%;
  -ms-animation: animationHappy linear 1s;
  -ms-animation-iteration-count: 1;
  -ms-transform-origin: 50% 50%;
}
@keyframes animationDamage{
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
@-moz-keyframes animationDamage{
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
@-webkit-keyframes animationDamage {
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
@-o-keyframes animationDamage {
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
@-ms-keyframes animationDamage {
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

/* Animation : Death */
.anim-death{
  animation: animationDeath linear 1s;
  animation-iteration-count: 1;
  transform-origin: 50% 50%;
  animation-fill-mode:forwards; /* when the spec is finished */
  -webkit-animation: animationDeath linear 1s;
  -webkit-animation-iteration-count: 1;
  -webkit-transform-origin: 50% 50%;
  -webkit-animation-fill-mode:forwards; /* Chrome 16+, Safari 4+ */
  -moz-animation: animationDeath linear 1s;
  -moz-animation-iteration-count: 1;
  -moz-transform-origin: 50% 50%;
  -moz-animation-fill-mode:forwards; /*FF 5+*/
  -o-animation: animationDeath linear 1s;
  -o-animation-iteration-count: 1;
  -o-transform-origin: 50% 50%;
  -o-animation-fill-mode:forwards; /*Not implemented yet*/
  -ms-animation: animationDeath linear 1s;
  -ms-animation-iteration-count: 1;
  -ms-transform-origin: 50% 50%;
  -ms-animation-fill-mode:forwards; /*IE 10+*/
}
@keyframes animationDeath{
  0% {
    opacity:1;
    transform:  scaleX(1.00) scaleY(1.00) ;
  }
  25% {
    opacity:1;
    transform:  scaleX(0.95) scaleY(0.95) ;
  }
  50% {
    opacity:1;
    transform:  scaleX(1.10) scaleY(1.10) ;
  }
  100% {
    opacity:0;
    transform:  scaleX(0.30) scaleY(0.30) ;
  }
}
@-moz-keyframes animationDeath{
  0% {
    opacity:1;
    -moz-transform:  scaleX(1.00) scaleY(1.00) ;
  }
  25% {
    opacity:1;
    -moz-transform:  scaleX(0.95) scaleY(0.95) ;
  }
  50% {
    opacity:1;
    -moz-transform:  scaleX(1.10) scaleY(1.10) ;
  }
  100% {
    opacity:0;
    -moz-transform:  scaleX(0.30) scaleY(0.30) ;
  }
}

@-webkit-keyframes animationDeath {
  0% {
    opacity:1;
    -webkit-transform:  scaleX(1.00) scaleY(1.00) ;
  }
  25% {
    opacity:1;
    -webkit-transform:  scaleX(0.95) scaleY(0.95) ;
  }
  50% {
    opacity:1;
    -webkit-transform:  scaleX(1.10) scaleY(1.10) ;
  }
  100% {
    opacity:0;
    -webkit-transform:  scaleX(0.30) scaleY(0.30) ;
  }
}
@-o-keyframes animationDeath {
  0% {
    opacity:1;
    -o-transform:  scaleX(1.00) scaleY(1.00) ;
  }
  25% {
    opacity:1;
    -o-transform:  scaleX(0.95) scaleY(0.95) ;
  }
  50% {
    opacity:1;
    -o-transform:  scaleX(1.10) scaleY(1.10) ;
  }
  100% {
    opacity:0;
    -o-transform:  scaleX(0.30) scaleY(0.30) ;
  }
}
@-ms-keyframes animationDeath {
  0% {
    opacity:1;
    -ms-transform:  scaleX(1.00) scaleY(1.00) ;
  }
  25% {
    opacity:1;
    -ms-transform:  scaleX(0.95) scaleY(0.95) ;
  }
  50% {
    opacity:1;
    -ms-transform:  scaleX(1.10) scaleY(1.10) ;
  }
  100% {
    opacity:0;
    -ms-transform:  scaleX(0.30) scaleY(0.30) ;
  }
}
</style>
