<template>
    <v-container class="blue-grey darken-3">
      <!-- Items in the inventory-->
      <CustomGrid :items="aLotOfItems()" v-bind:isInventory="true" v-bind:isActive="true" :onClick="onClick"/>

    </v-container>
</template>

<script>
import CustomGrid from '@/components/CustomGrid'

export default {
  name: 'GameSideBarInventory',
  components: {
    CustomGrid
  },
  data: () => ({
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
        category: 'Hibou',
        description: 'Cui-c... pardon : Hou ! Hou !',
        avatar: 'https://vignette.wikia.nocookie.net/victoryroad/images/7/7f/USUMArt_Rowlet.png/revision/latest?cb=20170819020146'
      }
    ]
  }),
  methods: {
    onClick () {
      console.log('clicked from the inventory !')
    },

    // Returns a list of items that is artificially inflated
    aLotOfItems () {
      // We initialize a List
      var list = []

      // We add all the items to our List several times
      var i
      for (i = 0; i < 5; i++) {
        list.push.apply(list, this.inventoryItems)
      }

      // We return the List
      return list
    }
  }
}
</script>
