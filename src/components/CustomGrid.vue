<template>
  <v-row>
    <v-col
      v-for="item in items"
      :key="item.id"
      cols="12"
      :sm="6"
      :lg="4"
      align="center"
      :class="(isActive) ? 'pointer zoom' : ''"
      @click="onClick"
    >
      <!-- Badge with the item's picture -->
      <v-badge
        avatar
        overlap
      >
      <!-- Sort of notification -->
      <template v-slot:badge>
        <v-avatar :color="(isActive) ? '#FFCA28' : '#CC4F00'">
          <h5 style="color: #AA3300"> {{ (isInventory) ? item.cpt : item.price }}</h5>
        </v-avatar>
      </template>

      <!-- Item's picture (displays the description if hovering) -->
      <v-tooltip left>
          <!-- Item's picture -->
          <template v-slot:activator="{ on }">
          <v-avatar
            color="#FFCA28"
            size="50"
            v-on="on"
          >
            <v-avatar
              size="46"
              color="#CCA000">
              <v-img contain :src="item.avatar"></v-img>
            </v-avatar>
          </v-avatar>
          </template>

          <!-- Description when hovering -->
          <span class="font-italic"> {{ item.category }} </span> &mdash; {{ item.description }}
        </v-tooltip>
      </v-badge>

      <!-- Some text -->
      <h4 class="grey--text text--lighten-2"> {{ item.title }} </h4>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'CustomGrid',
  props: ['items', 'isInventory', 'isActive', 'onClick']
}
</script>
