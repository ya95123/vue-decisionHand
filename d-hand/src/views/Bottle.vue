<template>
  <div id="bottle" class="d-flex justify-center align-center">
    <div class="game d-flex justify-center align-center">
      <!-- {{data.deg}} -->
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
    // 3240 9圈
    deg: 3240,
    n: 1
  }),
  methods: {
    rotate () {
      let turn = this.$data.deg * this.$data.n + rand(0, 360)
      document.getElementById('wine').style.transform = `rotate(${turn}deg)`
      console.log(turn)
      console.log(`轉 ${turn -= this.$data.deg * this.$data.n} 度`)
      this.$data.n++
    }
  }
}
</script>
