<template>
  <div id="bottle" class="d-flex justify-center align-center">
    <div class="game d-flex justify-center align-center">
      <!-- tips -->
      <span v-if="!start" id="tip">點擊酒瓶旋轉</span>
      <!-- bottle -->
      <img id="wine" @click="rotate" src="../assets/wine.svg" alt="酒瓶">
    </div>
  </div>
</template>

<script>
const rand = (min, max) => {
  return Math.round(Math.random() * (max - min) + min)
}
export default {
  name: 'Bottle',
  data: () => ({
    start: false,
    // 3240 9圈
    deg: 3240,
    // 第 n 圈
    n: 1
  }),
  methods: {
    rotate () {
      // 提示文字
      this.$data.start = true
      // 轉瓶子
      let turn = this.$data.deg * this.$data.n + rand(0, 360)
      document.getElementById('wine').style.transform = `rotate(${turn}deg)`
      console.log(turn)
      console.log(`轉 ${turn -= this.$data.deg * this.$data.n} 度`)
      this.$data.n++
    }
  }
}
</script>
