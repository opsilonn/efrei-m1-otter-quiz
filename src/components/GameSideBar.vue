<template>
    <div class="blue-grey darken-3 height100">
        <v-tabs
            background-color="blue-grey darken-4"
            grow
            dark
            >

        <!-- All the menus-->
        <v-tab>
            <v-icon left>mdi-medical-bag</v-icon>
            <div class="shrink mt-1 d-none d-lg-flex">
                Inventory
            </div>
        </v-tab>

        <v-tab>
            <v-icon left>mdi-currency-usd</v-icon>
            <div class="shrink mt-1 d-none d-lg-flex">
                Shop
            </div>
        </v-tab>

        <v-tab>
            <v-icon left>mdi-help</v-icon>
            <div class="shrink mt-1 d-none d-lg-flex">
                Logs
            </div>
        </v-tab>

        <!-- All the menu's contents -->

        <!-- 1 - Inventory -->
        <v-tab-item class="blue-grey darken-3">
            <GameSideBarInventory/>
        </v-tab-item>

        <!-- 2 - Shop -->
        <v-tab-item class="blue-grey darken-3">
            <GameSideBarShop/>
        </v-tab-item>

        <!-- 3 - Logs -->
        <v-tab-item class="blue-grey darken-3">
            <GameSideBarLogs/>
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
