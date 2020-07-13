<template>
  <v-app id="app">
    <v-bottom-navigation
      v-model="navL"
      dark
      shift
    >
      <v-btn style="height:100%;">
        <span>Video</span>
        <v-icon>mdi-television-play</v-icon>
      </v-btn>

      <v-btn>
        <span>Music</span>
        <v-icon>mdi-music-note</v-icon>
      </v-btn>

      <v-btn>
        <span>Book</span>
       <v-icon>mdi-book</v-icon>
     </v-btn>

     <v-btn>
       <span>Image</span>
      <v-icon>mdi-image</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <v-bottom-navigation
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
        <v-icon>mdi-map-marker</v-icon>
      </v-btn>
    </v-bottom-navigation>
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
    navL: 0,
    navS: 0
  })
}
</script>
