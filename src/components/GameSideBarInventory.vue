<template>
    <v-container class="blue-grey darken-3">
        <v-list class="blue-grey darken-3">
            <v-list-item
                v-for="item in inventoryItems"
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
                    <v-list-item-subtitle v-html="'remaining : ' + item.cpt" class="font-weight-black grey--text text--lighten-1"/>
                </v-list-item-content>

                <v-list-item-icon>
                    <v-hover v-slot:default="{ hover }">
                        <v-icon
                            :color="hover ? 'green' : 'grey'"
                            @click="onClick"
                        >
                            mdi-archive-arrow-up
                        </v-icon>
                    </v-hover>
                </v-list-item-icon>
            </v-list-item>
        </v-list>
    </v-container>
</template>

<script>
export default {
  name: 'GameSideBarInventory',
  data: () => ({
    myCoins: 400,
    inventoryItems: [
      {
        cpt: 3,
        title: 'Poussifeu',
        category: 'Poussin',
        description: 'Attaquez-le, et une nuée de poussin vous assaillera...',
        avatar: 'https://www.pokepedia.fr/images/thumb/5/5d/Poussifeu-ROSA.png/250px-Poussifeu-ROSA.png'
      },
      {
        cpt: 2,
        title: 'Vipélierre',
        category: 'Serpent',
        description: 'SSSssssSSSS',
        avatar: 'https://cdn.bulbagarden.net/upload/thumb/c/ca/Cheren_Snivy_Adventures.png/200px-Cheren_Snivy_Adventures.png'
      },
      {
        cpt: 1,
        title: 'Brindibou',
        category: 'Crocodile',
        description: 'Cui-c... pardon : Hou ! Hou !',
        avatar: 'https://vignette.wikia.nocookie.net/victoryroad/images/7/7f/USUMArt_Rowlet.png/revision/latest?cb=20170819020146'
      }
    ]
  }),
  methods: {
    onClick () {
      console.log('clicked from the inventory !')
    }
  }
}
</script>
