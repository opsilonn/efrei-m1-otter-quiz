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
/* Changes the mouse's cursor on Pointer */
.pointer {cursor: pointer;}

/* Zoom effect when overing */
.zoom {
  transition: transform .2s;
}
.zoom:hover {
  transform: scale(1.2);
}

/* Changes the Width or the Height to fill a given percentage */
.width100 { width:100% }
.height100 { height:100% }
.height60 { height:60% }
.height50 { height:50% }
.height40 { height:40% }
</style>
