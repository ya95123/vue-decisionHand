<template>
  <div id="wheel" class="d-flex justify-center align-center">
    <div class="game d-flex justify-center align-center">
      <div class="gameSetFrame">
        <v-icon class="gameSet">mdi-cog-outline</v-icon>
        <v-icon class="gameSet mt-2">mdi-history</v-icon>
      </div>
      <!-- TODO 內容要轉成 data+methods 搭配使用者輸入內容 大圓 -->
      <div id="turnTable">
        <!-- 內容 -->
        <!-- <div
          class="part d-flex justify-center align-center"
          v-for="item in items"
          :key="item"
        >
          {{item}}
        </div> -->

        <div class="test1"></div>
        <div class="test2"></div>
        <!-- <div class="test3 fxcenter">3</div> -->
        <!-- 左半圓框：給最後一個內容放的 -->
        <div class="halfRound leftRound">
          <div class="test3"></div>
        </div>
        <!-- 文字區 -->
        <div class="wheelText1">1111111</div>
        <div class="wheelText2">2222222</div>
        <div class="wheelText3">3333333</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Wheel',
  data: () => ({
    items: [1]
  }),
  computed: {

  }
}
</script>
