<template>
  <div id="wheel" class="d-flex justify-center align-center">
    <div class="game d-flex justify-center align-center">
      <!-- 右側欄 -->
      <div class="gameSetFrame">
        <v-icon class="gameSet" @click.stop="dialogSet = true">mdi-cog-outline</v-icon>
        <v-icon class="gameSet mt-2">mdi-history</v-icon>
      </div>
      <!-- 設定對話框 -->
      <v-dialog
        v-model="dialogSet"
        max-width="400"
        persistent
        scrollable
      >
        <v-card style="max-height:500px;">
          <!-- 標題 -->
          <v-card-title class="d-flex justify-center font-weight-bold orange--text">
            轉盤設定
          </v-card-title>
          <!-- 文字、選項 -->
          <v-card-text class="d-flex justify-center align-center flex-column pa-0">
            <!-- 選擇方式 -->
            <v-radio-group v-model="radioSet" row>
              <v-radio
                label="一拳決勝"
                value="w1"
                color="dhblue"
              ></v-radio>
              <v-radio
                label="三戰兩勝"
                value="w2"
                color="dhblue"
              ></v-radio>
            </v-radio-group>
            <!-- 贏 / 輸 內容 -->
            <v-text-field
              v-model="win"
              label="贏"
              placeholder="吃雞排 🤗"
              color="dhred"
            >
            </v-text-field>
            <v-text-field
              v-model="lose"
              label="輸"
              placeholder="忍住不吃 😭"
              color="success"
            >
            </v-text-field>
          </v-card-text>
          <!-- button -->
          <v-card-actions class="d-flex justify-center pb-4">
            <v-btn
              color="green darken-1"
              style="height:30px;font-size:0.95rem;"
              text
              @click="dialogSet = false"
            >
              確定
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

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
    dialogSet: false,
    items: [1]
  }),
  computed: {

  }
}
</script>
