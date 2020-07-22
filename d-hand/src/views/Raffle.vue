<template>
  <div id="raffle" class="d-flex justify-center align-center">
    <div class="game d-flex justify-center align-center">
      <div class="gameSetFrame">
        <v-icon class="gameSet">mdi-cog-outline</v-icon>
        <v-icon class="gameSet mt-2">mdi-history</v-icon>
      </div>
    <!-- 箱子 class shake-constant shake-hard -->
    <!-- TODO 抽出來時，做有手遮90%效果，製造刺激感(有時間就做) -->
    <div id="box" class="d-flex justify-center">
      <!-- TODO 紙條：開始後做翻面效果，好後做 shake + 紙條飄移 + (紙箱變色) -->
      <div class="paper">...</div>
      <div class="paper" style="left:30%;">321</div>
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
