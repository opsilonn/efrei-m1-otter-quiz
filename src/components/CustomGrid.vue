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
        <v-avatar :class="(isActive) ? 'green accent-3' : 'red darken-2'">
          <h5 class="black--text"> {{ (isInventory) ? item.cpt : item.price }}</h5>
        </v-avatar>
      </template>

      <!-- Item's picture (displays the description if hovering) -->
      <v-tooltip left>
          <!-- Item's picture -->
          <template v-slot:activator="{ on }">
          <v-avatar
              class="blue-grey darken-4"
            size="50"
            v-on="on"
          >
            <v-avatar
              class="blue-grey darken-3"
              size="46">
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
