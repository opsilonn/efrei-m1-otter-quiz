<template>
    <v-navigation-drawer
        app
        right
        permanent
        hide-overlay
        dark
        :width="500"
        color="blue-grey darken-3"
    >
        <v-tabs
            v-model="test"
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
                <v-icon left>mdi-history</v-icon>
                <div class="shrink mt-1 d-none d-lg-flex">
                    Logs
                </div>
            </v-tab>
        </v-tabs>
        <v-tabs-items v-model="test" class="blue-grey darken-3">
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
        </v-tabs-items>
    </v-navigation-drawer>
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
  },
  data: () => ({
    test: null
  })
}
</script>
