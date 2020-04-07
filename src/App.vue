<template>
  <v-app
    :style="'background-color: ' + themes.Base"
    dark
  >
    <v-content
      dark
    >
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    // States
    ...mapState('themes', ['themes'])
  }
}
</script>

<style>
.fill100{
  height:100%
}
.fill60{
  height:60%
}
.fill50{
  height:50%
}
.fill40{
  height:40%
}
</style>
