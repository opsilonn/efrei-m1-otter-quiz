<template>
    <v-list class="blue-grey darken-3">
        <v-list-item
            v-for="item in items"
            :key="item.title"
        >
            <v-list-item-avatar>
                <v-img :src="item.avatar"/>
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title v-html="item.title" class="grey--text text--lighten-2"/>
                <v-list-item-subtitle class="grey--text text--lighten-1">
                    <span class="font-italic"> {{ item.category }} </span> &mdash; {{ item.description }}
                </v-list-item-subtitle>
                <v-list-item-subtitle v-if="showRemaining" v-html="'remaining : ' + item.cpt" class="font-weight-black grey--text text--lighten-1"/>
            </v-list-item-content>

            <v-list-item-action align="center">
                <v-list-item-action-text v-if="!showRemaining" v-text="item.price" class="text-center"/>
                <v-hover v-slot:default="{ hover }">
                    <!-- Whether the item is active or not, the behaviour is different) -->
                    <v-icon
                        v-if="active"
                        :color="hover ? 'green' : 'grey'"
                        @click="onClick"
                    >
                        {{ icon }}
                    </v-icon>

                    <v-icon
                    v-else
                    color='blue-grey darken-1'
                    disabled>
                        {{ icon }}
                    </v-icon>
                </v-hover>
            </v-list-item-action>
        </v-list-item>
    </v-list>
</template>

<script>
export default {
  name: 'CustomList',
  props: ['items', 'active', 'showRemaining', 'icon', 'onClick']
  // Example of call :
  // <CustomList :items="itemsBuyable()" v-bind:active="true" v-bind:showRemaining="false" icon="mdi-cart-plus" :onClick="onClick"/>
}
</script>
