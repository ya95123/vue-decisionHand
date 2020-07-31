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
      <span
        id="topHand"
        ref="topHand"
        class="hand align-self-start"
      >
        <!-- 狄斯俊 -->
        {{player[0]}}
      </span>
      <span
        id="bottomHand"
        ref="bottomHand"
        class="hand align-self-end"
      >
        <!-- 玩家 -->
        {{player[1]}}
      </span>
      <div id="homeResult">
        <p class="dhred--text">贏：{{win}}</p>
        <p class="success--text">輸：{{lose}}</p>
      </div>
      <!-- 開始鍵 -->
      <div
        class="startBig d-flex justify-center align-center"
        @click="start($event)"
      >
        GO
      </div>
      <!-- 選項鍵 -->
      <div ref="choose" class="chooseFrame row justify-space-around">
        <v-btn
          v-for="(c,idx) in choose"
          :key="idx"
          dark
          @click="determine(idx)"
          class="choose d-flex justify-center align-center"
        >
          {{c}}
        </v-btn>
      </div>
    </div>
    <!-- 遮罩 Mask -->
    <div ref="mask" class="mask"></div>
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
    lose: '忍住不吃 😭',
    choose: ['✌', '✊', '🖐'],
    player: ['✌', '✊']
  }),
  methods: {
    // e.target 當前點擊的元素
    // e.currentTarget 綁定事件的元素
    start (e) {
      e.target.style.pointerEvents = 'none'
      // 先讓遮罩存在
      this.$refs.mask.style.display = 'block'
      setTimeout(() => {
        // 按鈕隱藏
        e.target.style.opacity = '0'
        // 遮障出現
        this.$refs.mask.style.opacity = '1'
        // 選項出現
        this.$refs.choose.style.display = 'flex'
      }, 180)
    },
    determine (idx) {
      // TODO 進入猜拳動畫 (取值，進入剪刀時頭布，判斷輸贏) 調整揮手動畫
      this.$refs.choose.style.display = 'none'
      this.$refs.mask.style.opacity = '0'
      // 手退出畫面 退場1s
      this.$refs.topHand.style.top = '-35%'
      this.$refs.bottomHand.style.bottom = '-35%'

      setTimeout(() => {
        // 遮罩消失
        this.$refs.mask.style.display = 'none'
      }, 180)

      // 第1秒後進入 猜拳中
      setTimeout(() => {
        // 先變成拳頭前面預備姿勢
        this.$data.player = ['✊', '✊']
        // 手回來畫面 進場1s
        this.$refs.topHand.style.cssText = 'top:0;transform:rotate(190deg)'
        this.$refs.bottomHand.style.cssText = 'bottom:0;transform:rotate(10deg)'
        // 已花 2s
      }, 1000)

      // 第二秒 搖手 + 猜拳
      setTimeout(() => {
        // 先變成拳頭前面預備姿勢
        // this.$data.player = ['✊', '✊']
        // 搖手
        this.$refs.topHand.classList.add('a-Top')
        this.$refs.bottomHand.classList.add('a-Bottom')
        // 已花 2s
      }, 2000)
    }
  }
}
</script>
