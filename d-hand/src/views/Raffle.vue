<template>
  <div id="raffle" class="d-flex justify-center align-center">
    <div class="game d-flex justify-center align-center">
      <div class="gameSetFrame">
        <v-icon class="gameSet">mdi-cog-outline</v-icon>
        <v-icon class="gameSet mt-2">mdi-history</v-icon>
      </div>
    <!-- 箱子 class shake-constant shake-hard -->
    <div id="box" class="d-flex justify-center">
      <!-- TODO 紙條 -->
      <div class="paper"></div>
      <div class="paper" style="left:10%;"></div>
    </div>

    </div>
  </div>
</template>

<script>

export default {
  name: 'Raffle',
  data: () => ({

  })
}
</script>
