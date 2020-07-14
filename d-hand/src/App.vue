<template>
  <v-app id="app">
    <!-- 電腦尺寸 Nav -->
    <v-bottom-navigation
      id="top"
      class="elevation-0 py-2 yellow--text"
      background-color="transparent"
      height="calc(64px + 16px)"
      v-model="navL"
      dark
      shift
    >
      <!-- Logo -->
      <div class="col-2 pl-10 d-flex justify-start align-center">
        <router-link to="/" id="logo" class="white--text">LOGO</router-link>
      </div>
      <!-- Menu -->
      <div class="col-8 d-flex justify-center">
        <router-link to="/" >
          <v-btn>
            <span>猜拳</span>
            <v-icon>mdi-hand-peace</v-icon>
          </v-btn>
        </router-link>

        <router-link to="/wheel">
          <v-btn>
            <span>轉盤</span>
            <v-icon>mdi-radius-outline</v-icon>
          </v-btn>
        </router-link>

        <router-link to="/raffle">
          <v-btn>
            <span>抽獎</span>
            <v-icon>mdi-gift-outline</v-icon>
          </v-btn>
        </router-link>

        <router-link to="/group">
          <v-btn>
            <span>組合設定</span>
            <v-icon>mdi-text-box-multiple</v-icon>
          </v-btn>
        </router-link>
      </div>
      <!-- Reg / Login -->
      <div class="col-2 pr-10 d-flex justify-end align-center white--text">
        <span id="reg" class="mr-5">註冊</span>
        <span id="login">登入</span>
      </div>
    </v-bottom-navigation>

    <!-- 平板尺寸以下 Nav -->
    <v-bottom-navigation
      id="bottom"
      :value="navS"
      color="purple lighten-1"
      app
    >
      <v-btn>
        <span>Recents</span>
        <v-icon>mdi-history</v-icon>
     </v-btn>

      <v-btn>
        <span>Favorites</span>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn>
        <span>Nearby</span>
        <v-icon>mdi-bottle-wine</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <router-view/>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    navL: 0,
    navS: 0
  })
}
</script>
