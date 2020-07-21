<template>
  <div id="wheel" class="d-flex justify-center align-center">
    <div class="game d-flex justify-center align-center">
      <v-icon id="wheelSet" class="gameSet">mdi-cog-outline</v-icon>
      <!-- 大圓 -->
      <div id="turnTable">
        <!-- 內容 -->
        <!-- <div
          class="part d-flex justify-center align-center"
          v-for="item in items"
          :key="item"
        >
          {{item}}
        </div> -->
        <!-- 右半圓 -->
        <!-- <div class="halfRound rightRound"></div> -->
        <!-- 左半圓 -->
        <div class="test1"></div>
        <div class="test2"></div>
        <div class="test3"></div>
        <div class="halfRound leftRound">
          <div class="test4"></div>
        </div>
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
