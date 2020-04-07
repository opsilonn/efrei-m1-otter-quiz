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
                    <v-list-item-title v-html="item.title"/>
                    <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                    <v-list-item-subtitle v-html="'remaining : ' + item.cpt"></v-list-item-subtitle>
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
        subtitle: "<span class='text--primary'>Poussin</span> &mdash; attaquez-le, et une nuée de poussin vous assaillera...",
        avatar: 'https://www.pokepedia.fr/images/thumb/5/5d/Poussifeu-ROSA.png/250px-Poussifeu-ROSA.png'
      },
      {
        cpt: 2,
        title: 'Vipélierre',
        subtitle: "<span class='text--primary'>Serpent</span> &mdash; SSSssssSSSS",
        avatar: 'https://cdn.bulbagarden.net/upload/thumb/c/ca/Cheren_Snivy_Adventures.png/200px-Cheren_Snivy_Adventures.png'
      },
      {
        cpt: 1,
        title: 'Brindibou',
        subtitle: "<span class='text--primary'>Hibou</span> &mdash; Cui-c... pardon : Hou ! Hou !",
        avatar: 'https://vignette.wikia.nocookie.net/victoryroad/images/7/7f/USUMArt_Rowlet.png/revision/latest?cb=20170819020146'
      }
    ]
  }),
  methods: {
    hasEnoughCoins (price) {
      return this.myCoins >= price
    },
    onClick () {
      console.log('clicked from the inventory !')
    }
  }
}
</script>
