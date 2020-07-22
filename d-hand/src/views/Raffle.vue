<template>
  <div id="raffle" class="d-flex justify-center align-center">
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
            抽獎設定
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
    dialogSet: false
  })
}
</script>
