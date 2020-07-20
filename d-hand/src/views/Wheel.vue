<template>
  <div id="wheel" class="d-flex justify-center align-center">
    <div class="game d-flex justify-center align-center">
      <v-icon id="wheelSet" class="gameSet">mdi-cog-outline</v-icon>
      <div id="table">
        <!-- 內容 -->
        <div
          class="part d-flex justify-center align-center"
          v-for="item in items"
          :key="item"
        >
          {{item}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Wheel',
  data: () => ({
    items: [1, 2, 3]
  }),
  computed: {

  }
}
</script>
