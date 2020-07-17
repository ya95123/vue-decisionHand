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
// const wineRotate = rand(3240, 3600)
export default {
  name: 'Bottle',
  data: () => ({
    deg: 0
  }),
  methods: {
    rotate () {
      this.style.transform = `rotate(${rand(3240, 3600)}deg)`

      // document.getElementById('wine').style.transform = `rotate(${rand(3240, 3600)}deg)`
      // document.getElementById('wine').style.transform = 'rotate(this.$data.deg)'
      console.log(rand(0, 360))
    }
  }
}
</script>
