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
        ref="startBig"
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
      <!-- 返回鍵 -->
      <div
        ref="back"
        class="backFrame"
        @click="back"
      >
        <v-icon ref="back" class="gameSet">mdi-chevron-double-left</v-icon>
      </div>
      <!-- 結果 -->
      <v-dialog
        v-model="dialogResult"
        persistent
        max-width="450px"
        color="dhblue"
      >
        <v-card>
          <v-card-text
            class="text-center pa-5 text--dhb-lue"
            style="font-size:1.5rem;color:#5BBDC8;"
          >
            要選擇的是
          </v-card-text>
          <v-card-title
            class="d-flex justify-center font-weight-bold pa-2 text--dhred"
            style="font-size:2.5rem;line-height:100%"
          >
            <div
              v-if="result === win"
              class="text-center"
              style="color:#E12E4B;"
            >
              {{result}}
              </div>
            <div
              v-else-if="result === lose"
              class="text-center"
              style="color:#4CAF50;"
            >
              {{result}}
            </div>
            <div
              v-else
              class="text-center"
              style="color:#F8981D;"
            >
              {{result}}
            </div>
          </v-card-title>
          <div class="text-center pa-5">
            <v-btn
            color="dhblue"
            style="height:30px"
            text
            @click="dialogResult = false"
            >
              確定
            </v-btn>
          </div>
        </v-card>
      </v-dialog>
    </div>
    <!-- 遮罩 Mask -->
    <div ref="mask" class="mask"></div>
  </div>
</template>

<script>
// 區間隨機數
const rand = (min, max) => {
  return Math.round(Math.random() * (max - min) + min)
}
export default {
  name: 'Home',
  data: () => ({
    dialogSet: false,
    dialogResult: false,
    // 預設選擇方式
    radioSet: 'w1',
    win: '吃雞排 🤗',
    lose: '忍住不吃 😭',
    result: '',
    choose: ['✌', '✊', '🖐'],
    player: ['✌', '✊']
  }),
  methods: {
    // e.target 當前點擊的元素
    // e.currentTarget 綁定事件的元素
    start (e) {
      // 按鈕失效
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
        // 返回鍵出現
        this.$refs.back.style.display = 'block'
      }, 180)
    },
    // 返回鍵
    back () {
      // 返回鍵消失
      this.$refs.back.style.display = 'none'
      // 選項消失
      this.$refs.choose.style.display = 'none'
      // 遮罩淡去
      this.$refs.mask.style.opacity = '0'
      setTimeout(() => {
        // 遮罩消失
        this.$refs.mask.style.display = 'none'
        // 按鈕出現
        this.$refs.startBig.style.opacity = '1'
        this.$refs.startBig.style.pointerEvents = 'auto'
      }, 180)
    },
    // 選項決定，進入動畫
    determine (idx) {
      const player1 = this.$refs.topHand
      const player2 = this.$refs.bottomHand
      // TODO 進入猜拳動畫 (取值，進入剪刀時頭布，判斷輸贏) 調整揮手動畫
      // 重置 style text-shadow
      player1.style.cssText = 'text-shadow:0 0 0 #fffff;'
      player2.style.cssText = 'text-shadow:0 0 0 #fffff;'

      // 關閉選項、遮罩關閉、返回鍵關閉
      this.$refs.choose.style.display = 'none'
      this.$refs.mask.style.opacity = '0'
      this.$refs.back.style.display = 'none'

      // 手退出畫面 退場1s
      player1.style.top = '-35%'
      player2.style.bottom = '-35%'

      setTimeout(() => {
        // 遮罩消失
        this.$refs.mask.style.display = 'none'
      }, 180)

      // 第1秒後進入 猜拳中
      setTimeout(() => {
        // 先變成拳頭前面預備姿勢
        this.$data.player = ['✊', '✊']
        // 手回來畫面 進場1s
        player1.style.cssText = 'top:0;transform:rotate(190deg)'
        player2.style.cssText = 'bottom:0;transform:rotate(10deg)'
        // 已花 2s
      }, 1000)

      // 第2秒 搖手 + 猜拳
      setTimeout(() => {
        // 先變成拳頭前面預備姿勢
        // this.$data.player = ['✊', '✊']
        // 搖手
        player1.classList.add('a-Top')
        player2.classList.add('a-Bottom')
        // 已花 2s
      }, 2000)

      // 第4.8秒 猜拳
      setTimeout(() => {
        // const resultText = this.$data.result
        const player1Hand = this.$data.choose[rand(0, 2)]
        const player2Hand = this.$data.choose[idx]
        // 停止搖手
        player1.classList.remove('a-Top')
        player2.classList.remove('a-Bottom')
        // 回歸初始角度
        player1.style.cssText = 'top:0;transform:rotate(180deg);text-shadow:2vmin 0 0 #F8981D;'
        player2.style.cssText = 'bottom:0;transform:rotate(0deg);text-shadow:2vmin 0 0 #F8981D;'
        this.$data.player = [`${player1Hand}`, `${player2Hand}`]
        console.log(`狄斯俊之手 ${player1Hand}`)

        // 判斷結果 平手/贏/輸
        player1Hand === player2Hand ? this.$data.result = '平手再來一次！' : ((player2Hand === '✌' && player1Hand === '🖐') || (player2Hand === '✊' && player1Hand === '✌') || (player2Hand === '🖐' && player1Hand === '✊')) ? this.$data.result = `${this.$data.win}` : this.$data.result = `${this.$data.lose}`
      }, 4800)

      // 第5.5秒 結果
      setTimeout(() => {
        // 結果對話框出現
        this.$data.dialogResult = true
        // start 按鈕出現、可使用
        this.$refs.startBig.style.pointerEvents = 'auto'
        this.$refs.startBig.style.opacity = '1'
      }, 5500)
    }
  }
}
</script>
