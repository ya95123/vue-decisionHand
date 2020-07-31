<template>
  <div id="home" class="d-flex justify-center align-center">
    <div class="game d-flex justify-center">
      <!-- 右側欄 -->
      <div class="gameSetFrame">
        <v-icon class="gameSet" @click.stop="dialogSet = true">mdi-cog-outline</v-icon>
        <v-icon class="gameSet mt-2">mdi-history</v-icon>
        <v-icon class="startSmall gameSet mt-2">mdi-alpha-s-circle</v-icon>
      </div>
      <!-- 設定對話框 -->
      <v-dialog
        v-model="dialogSet"
        max-width="400"
        persistent
        scrollable
      >
        <v-card>
          <!-- 標題 -->
          <v-card-title class="d-flex justify-center font-weight-bold orange--text">
            猜拳設定
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
              style="width:60%;"
            >
            </v-text-field>
            <v-text-field
              v-model="lose"
              label="輸"
              placeholder="忍住不吃 😭"
              color="success"
              style="width:60%;"
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

      <!-- 猜拳 -->
      <span id="topHand" class="hand align-self-start">✌</span>
      <span id="bottonHand" class="hand align-self-end">✊</span>
      <div id="homeResult">
        <p class="dhred--text">贏：{{win}}</p>
        <p class="success--text">輸：{{lose}}</p>
      </div>
      <!-- 開始鍵 -->
      <div class="startBig d-flex justify-center align-center">GO</div>
    </div>
  </div>
</template>

<script>
// const guesse = ['✌', '✊', '🖐']
export default {
  name: 'Home',
  data: () => ({
    dialogSet: false,
    // 預設選擇方式
    radioSet: 'w1',
    win: '吃雞排 🤗',
    lose: '忍住不吃 😭'
  })
}
</script>
