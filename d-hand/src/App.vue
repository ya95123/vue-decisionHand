<template>
  <v-app id="app">
    <!-- 電腦尺寸 NavT -->
    <v-bottom-navigation
      id="top"
      class="elevation-0 py-2"
      background-color="transparent"
      height="calc(64px + 16px)"
      v-model="navT"
      dark
      shift
    >
      <!-- Logo -->
      <div class="col-2 pl-10 d-flex justify-start align-center">
        <router-link to="/" id="logo" class="white--text">LOGO</router-link>
      </div>

      <!-- Menu 選單 -->
      <div class="col-8 d-flex justify-center">
        <router-link
          v-for="navLitem in navLitems"
          :key="navLitem.name"
          :to="navLitem.router"
        >
          <v-btn>
            <span>{{navLitem.name}}</span>
            <v-icon>{{navLitem.icon}}</v-icon>
          </v-btn>
        </router-link>

        <!-- 組合設定：登入後才有的功能 -->
        <router-link v-if="login" to="/group">
          <v-btn>
            <span>組合</span>
            <v-icon>mdi-text-box-multiple</v-icon>
          </v-btn>
        </router-link>
      </div>

      <!-- TODO Reg / Login /Logout 功能 -->
      <div class="col-2 pr-10 d-flex justify-end align-center white--text">
        <span v-if="!login" class="login mr-">註冊</span>
        <span v-if="!login" class="login">登入</span>
        <span v-else class="login">
          <v-icon class="pr-2">mdi-emoticon-happy-outline</v-icon>
          <span>暱稱</span>
        </span>
      </div>
    </v-bottom-navigation>

    <!-- 平板尺寸以下 NavB -->
    <v-bottom-navigation
      id="bottom"
      :value="navB"
      color="dhred"
      background-color="dhyellow"
      app
    >
      <router-link
        v-for="navBitem in navBitems"
        :key="navBitem.name"
        :to="navBitem.router"
      >
        <v-btn>
          <span>{{navBitem.name}}</span>
          <v-icon>{{navBitem.icon}}</v-icon>
        </v-btn>
      </router-link>

      <!-- 組合設定：登入後才有的功能 -->
      <router-link v-if="login" to="/group">
        <v-btn>
          <span>組合</span>
          <v-icon>mdi-text-box-multiple</v-icon>
        </v-btn>
      </router-link>

      <!-- TODO Reg / Login/ Logout 功能 -->
      <v-btn v-if="!login">
        <span>登入</span>
        <v-icon>mdi-emoticon-cool-outline</v-icon>
      </v-btn>

      <v-btn v-else>
        <span>登出</span>
        <v-icon>mdi-emoticon-happy-outline</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <!-- footer -->
    <div id="footer"
      class="text-center white--text overline py-2"
    >
      Decision Hand &copy; {{ new Date().getFullYear() }}
      <v-btn
        class="white--text"
        style="height:36px;"
        icon
      >
        <v-icon size="28px">mdi-github</v-icon>
      </v-btn>
    </div>
    <router-view/>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    login: true,
    navT: 0,
    navB: 0,
    navLitems: [
      { name: '猜拳', router: '/', icon: 'mdi-hand-peace' },
      { name: '轉盤', router: '/wheel', icon: 'mdi-radius-outline' },
      { name: '抽獎', router: '/raffle', icon: 'mdi-gift-outline' }
    ],
    navBitems: [
      { name: '猜拳', router: '/', icon: 'mdi-hand-peace' },
      { name: '酒瓶', router: '/bottle', icon: 'mdi-bottle-wine' },
      { name: '轉盤', router: '/wheel', icon: 'mdi-radius-outline' },
      { name: '抽獎', router: '/raffle', icon: 'mdi-gift-outline' }
    ]
  })
}
</script>
