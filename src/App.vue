<template>
  <v-app
    class="hideScrollBar"
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
.zoom-sm {
  transition: transform .2s;
}
.zoom-sm:hover {
  transform: scale(1.1);
}

/* Changes the Width or the Height to fill a given percentage */
.width100 { width:100% }
.height100 { height:100% }
.height60 { height:60% }
.height50 { height:50% }
.height40 { height:40% }

/* Sets up a picture background properly */
.prettyBackground {
  background-image: url('assets/background_1.jpg');
  background-color: transparent;
  background-repeat: repeat;
  background-position: center;
  background-size: cover;
}

/* Code to hide the Scroll Bar */
html {
    overflow: scroll;
    overflow-x: hidden;
}
::-webkit-scrollbar {
    width: 0px;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
}
/* Optional: show position indicator in red */
::-webkit-scrollbar-thumb {
    background: #FF0000;
}

</style>
