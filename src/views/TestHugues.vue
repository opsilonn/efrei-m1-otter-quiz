<template>
  <div class="height100" style="overflow: hidden">

    <GameSideBar style="overflow: hidden"/>

    <!-- We divide this row in 2 verticals boxes -->
    <div class="height60">
        <GameFighters style="overflow: hidden"/>
    </div>
    <div class="height40">
        <GameQuestions style="overflow: hidden"/>
    </div>
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
