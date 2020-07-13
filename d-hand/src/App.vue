<template>
  <v-app id="app">
    <router-link to="/">猜拳</router-link>
    <router-link to="/wheel">轉盤</router-link>
    <router-link to="/raffle">抽獎</router-link>

    <router-view/>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({

  })
}
</script>
