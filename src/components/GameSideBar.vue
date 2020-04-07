<template>
    <div class="blue-grey darken-3 fill100">
        <v-tabs
            background-color="blue-grey darken-4 red"
            center-active
            grow
            dark
            >

        <!-- All the menus-->
        <v-tab>
            <v-icon left>mdi-help</v-icon>
            Logs
        </v-tab>

        <v-tab>
            <v-icon left>mdi-currency-usd</v-icon>
            Shop
        </v-tab>

        <v-tab>
            <v-icon left>mdi-medical-bag</v-icon>
            Inventory
        </v-tab>

        <!-- All the menu's contents -->
        <!-- 1 - Logs -->
        <v-tab-item class="blue-grey darken-3">
            <GameSideBarLogs/>
        </v-tab-item>

        <!-- 2 - Shop -->
        <v-tab-item class="blue-grey darken-3">
            <GameSideBarShop/>
        </v-tab-item>

        <!-- 3 - Inventory -->
        <v-tab-item class="blue-grey darken-3">
            <GameSideBarInventory/>
        </v-tab-item>

        </v-tabs>
    </div>
</template>

<script>
import GameSideBarLogs from '@/components/GameSideBarLogs'
import GameSideBarShop from '@/components/GameSideBarShop'
import GameSideBarInventory from '@/components/GameSideBarInventory'

export default {
  name: 'GameSideBar',
  components: {
    GameSideBarLogs,
    GameSideBarShop,
    GameSideBarInventory
  }
}
</script>
