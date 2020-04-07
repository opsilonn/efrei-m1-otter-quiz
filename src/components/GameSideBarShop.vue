<template>
    <v-container class="blue-grey darken-3">
        <v-list class="blue-grey darken-3">
            <v-list-item
                v-for="item in shopItems"
                :key="item.title"
            >
                <v-list-item-avatar>
                    <v-img :src="item.avatar"/>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title v-html="item.title"/>
                    <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action align="center">
                    <v-list-item-action-text v-text="item.price" class="text-center"/>
                    <v-hover v-slot:default="{ hover }">
                        <v-icon
                            :color="(hasEnoughCoins(item.price) && hover) ? 'green' : hasEnoughCoins(item.price) ? 'grey' : 'blue-grey darken-1'"
                            :disabled="!hasEnoughCoins(item.price)"
                            @click="onClick"
                        >
                            mdi-cart-plus
                        </v-icon>
                    </v-hover>
                </v-list-item-action>
            </v-list-item>
        </v-list>
    </v-container>
</template>

<script>
export default {
  name: 'GameSideBarShop',
  data: () => ({
    myCoins: 400,
    shopItems: [
      {
        price: 350,
        title: 'Kaiminus',
        subtitle: "<span class='text--primary'>Crocodile</span> &mdash; Je vais te briser les os :)",
        avatar: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/c53a8986-a089-4470-b56a-cf853931868d/dagffo6-86a60610-e84f-45bb-875e-76127034115d.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTpmaWxlLmRvd25sb2FkIl0sIm9iaiI6W1t7InBhdGgiOiIvaS9jNTNhODk4Ni1hMDg5LTQ0NzAtYjU2YS1jZjg1MzkzMTg2OGQvZGFnZmZvNi04NmE2MDYxMC1lODRmLTQ1YmItODc1ZS03NjEyNzAzNDExNWQucG5nIn1dXX0.F5-SGIP9sGOxv6i6FcGrO5M-JMhab4dD1XgPE--yMEA'
      },
      {
        price: 500,
        title: 'Tiplouf',
        subtitle: "<span class='text--primary'>Pingouin</span> &mdash; Non, il ne peut pas voler.",
        avatar: 'https://cdn.bulbagarden.net/upload/thumb/b/b1/393Piplup.png/1200px-393Piplup.png'
      },
      {
        price: 400,
        title: 'Moustillon',
        subtitle: "<span class='text--primary'>Loutre</span> &mdash; Je suis une loutre !",
        avatar: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d42ea46a-328e-41a7-a1f2-0ef4c7c9c02e/d5k3wf7-69e86e0c-cede-4f65-8b9c-097888aee5dd.png/v1/fill/w_894,h_894,q_75,strp/oshawott_is_good_by_kol98-d5k3wf7.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl0sIm9iaiI6W1t7InBhdGgiOiIvZi9kNDJlYTQ2YS0zMjhlLTQxYTctYTFmMi0wZWY0YzdjOWMwMmUvZDVrM3dmNy02OWU4NmUwYy1jZWRlLTRmNjUtOGI5Yy0wOTc4ODhhZWU1ZGQucG5nIiwid2lkdGgiOiI8PTg5NCIsImhlaWdodCI6Ijw9ODk0In1dXX0.vfQhQxlejx4p9GPv30HZCtM5esB4O_J1A0RaRglTHkI'
      },
      {
        price: 500,
        title: 'Otaquin',
        subtitle: "<span class='text--primary'>Loutre</span> &mdash; Je suis aussi une loutre !",
        avatar: 'https://vignette2.wikia.nocookie.net/pokemon/images/4/43/728Popplio_SM_anime.png/revision/latest?cb=20170118071319'
      },
      {
        price: 250,
        title: 'Larméléon',
        subtitle: "<span class='text--primary'>Amphibien</span> &mdash; ouuuuiiiiin",
        avatar: 'https://www.gamosaurus.com/wp-content/uploads/Pokemon/Images/Sprites/g8/816.png'
      }
    ]
  }),
  methods: {
    hasEnoughCoins (price) {
      return this.myCoins >= price
    },
    onClick () {
      console.log('clicked from the shop !')
    }
  }
}
</script>
