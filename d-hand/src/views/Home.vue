<template>
  <div id="home" class="d-flex justify-center align-center">
    <div class="game d-flex justify-center">
      <div class="gameSetFrame">
        <v-icon class="gameSet">mdi-cog-outline</v-icon>
        <v-icon class="gameSet mt-2">mdi-history</v-icon>
      </div>
      <span id="topHand" class="hand align-self-start">✌</span>
      <span id="bottonHand" class="hand align-self-end">✊</span>
      <div id="homeResult">
        <p class="dhred--text">贏：吃雞排 🤗</p>
        <p class="success--text">輸：忍住不吃 😭</p>
      </div>
    </div>
  </div>
</template>

<script>
// const guesse = ['✌', '✊', '🖐']
export default {
  name: 'Home',
  data: () => ({

  })
}
</script>
