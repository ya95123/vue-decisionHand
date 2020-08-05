<template>
  <div id="raffle" class="d-flex justify-center align-center">
    <div class="game d-flex justify-center align-center">
      <!-- 右側欄 -->
      <div class="gameSetFrame">
        <v-icon id="setting" class="gameSet" @click.stop="dialogSet = true">mdi-cog-outline</v-icon>
        <v-icon id="history" class="gameSet mt-2" @click="history">mdi-history</v-icon>
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
            抽獎設定
          </v-card-title>
          <!-- 文字、選項 -->
          <vue-scroll>
            <v-card-text class="d-flex justify-center align-center flex-column pa-0">
              <!-- TODO (以後做)選擇方式 -->
              <!-- <v-radio-group v-model="radioSet">
                <v-radio
                  label="可重複抽中同一紙條"
                  value="w1"
                  color="dhblue"
                ></v-radio>
                <v-radio
                  label="不重複"
                  value="w2"
                  color="dhblue"
                ></v-radio>
              </v-radio-group> -->
              <!-- TODO 以後有機會再做分 獎品 和 名單 項目 -->
              <!--項目內容 -->
              <v-text-field
                v-for="(input,idx) in inputs"
                :key="idx"
                :label="input.num"
                v-model="input.item"
                color="success"
                style="width:60%;"
              >
                <!-- 紙條 > 3 會出現可刪除 icon -->
                <template
                  v-if="inputs.length >= 3"
                  v-slot:append-outer
                >
                  <v-icon
                    class="inputDel"
                    @click="deletInput(idx)"
                  >
                    mdi-delete-forever
                  </v-icon>
                </template>
              </v-text-field>
              <!-- 增加 -->
              <v-icon
                class="inputAdd"
                @click="addInput"
              >
                mdi-plus-circle-outline
              </v-icon>
            </v-card-text>
          </vue-scroll>
          <!-- 確定鈕 -->
          <v-card-actions class="d-flex justify-center pb-4">
            <v-btn
              color="green darken-1"
              style="height:30px;font-size:0.95rem;"
              text
              @click="submitInput"
            >
              確定
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- 箱子 class shake-constant shake-hard -->
      <div id="box" ref="box" class="d-flex justify-center">
        <!-- 盒子框 -->
        <div id="border">
        <div
          v-for="(input,idx) in inputs"
          :key="idx"
          class="paper"
          :style="input.position"
          @click="keep(idx)"
        >
          <span class="text">{{input.item}}</span>
        </div>
        </div>
      </div>
      <!-- 開始鍵 -->
      <div
        class="startBig d-flex justify-center align-center"
        ref="startBig"
        @click="start($event)"
      >
        GO
      </div>
      <!-- 獎項顯示 -->
      <span
        ref="award"
        id="award"
        class="text-center text"
      >
        獎項：{{award}}
      </span>
      <!-- 獎項輸入 -->
      <div v-if="inputText" class="awardInput">
        <v-text-field
          class="adwardInputSize"
          label="獎項名稱"
          v-model="award"
          color="success"
        >
      </v-text-field>
      </div>
      <!-- 遮手 -->
      <span ref="hand" class="maskHand" @click="open">🤚</span>
      <!-- 開啟提醒 -->
      <span v-if="openText" class="openText">點手揭曉</span>
      <span v-if="keepText" class="openText">點紙繼續</span>
      <!-- 抽完時文字 -->
      <div
        v-if="over"
        class="openText text-center"
      >
        <div style="color:#E12E4B;">已抽完</div>
        <v-btn
          large
          text
          color="dhblue"
          class="restart pa-2"
          @click="restart"
        >
          重新開始
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
// 正則表達式，只留數字
const number = (str) => {
  return str.replace(/\D/g, '')
}
// 區間隨機數
const rand = (min, max) => {
  return Math.round(Math.random() * (max - min) + min)
}

export default {
  name: 'Raffle',
  data: () => ({
    dialogSet: false,
    dialogResult: false,
    openText: false,
    keepText: false,
    inputText: true,
    over: false,
    award: 'Switch 藍紅主機',
    // 預設選擇方式
    radioSet: 'w2',
    inputs: [
      {
        num: '紙條1',
        item: '😊',
        position: {
          transform: 'skew(-20deg,-10deg) rotate(-270deg)',
          left: '15%',
          bottom: '2%',
          background: '#E12E4B'
        }
      },
      {
        num: '紙條2',
        item: '請點選',
        position: {
          transform: 'skew(-10deg,-10deg) rotate(-60deg)',
          left: '42%',
          bottom: '2%',
          background: '#F9e54E'
        }
      },
      {
        num: '紙條3',
        item: '右上角',
        position: {
          transform: 'skew(-5deg,-5deg) rotate(-280deg)',
          left: '65%',
          bottom: '2%',
          background: '#5BBDC8'
        }
      }
    ]
  }),
  methods: {
    addInput () {
      const n = this.$data.inputs.length
      this.$data.inputs.push({ num: `紙條${n + 1}`, item: '' })
    },
    deletInput (idx) {
      const inputs = this.$data.inputs
      let index = '各個 input 的索引直'
      // *console.log(`刪除第 ${idx} 個`)
      console.log(`純紙條數字：${number(inputs[idx].num)}`)
      console.log(`刪除 [${inputs[idx].num}]`)
      // idx 被刪除 1，後面全部往前 -1 索引
      for (const input in inputs) {
        if (input > idx) {
          // console.log(idx)
          // input 為索引值
          index = input
          // 因為索引值是從 0 開始，所以這樣設計剛剛好 字面上會是 -1 的狀況
          inputs[input].num = `紙條${index}`
        }
      }
      // *刪掉該 input (後刪：先後順序有差)
      inputs.splice(idx, 1)
    },
    submitInput () {
      this.$data.dialogSet = false
      const inputs = this.$data.inputs
      console.log(inputs)
      let i = 0
      let j = i
      let k = j
      let bgColor = ''
      for (const input of inputs) {
        // 重置 k
        j = i
        k = (j %= 3)
        // 判斷顏色
        k === 0 ? bgColor = '#E12E4B' : k === 1 ? bgColor = '#F9e54E' : bgColor = '#5BBDC8'
        // style 設定
        input.position = {
          transform: `skew(-${rand(5, 15)}deg,-${rand(0, 15)}deg) rotate(-${rand(45, 270)}deg)`,
          left: `${rand(3, 77)}%`,
          bottom: `${rand(0, 20)}%`,
          background: `${bgColor}`
        }
        i++
      }
    },
    // 開始按鈕
    start (e) {
      const papers = document.getElementsByClassName('paper')
      // 按鈕失效、設定鈕失效
      e.target.style.pointerEvents = 'none'
      document.getElementById('setting').style.pointerEvents = 'none'
      document.getElementById('setting').style.color = '#e3e3e3'
      // 按鈕、inputText隱藏
      e.target.style.opacity = '0'
      this.$data.inputText = false

      setTimeout(() => {
        // 晃動箱子
        this.$refs.box.classList.add('shake-constant', 'shake-hard')
        // 晃動獎項文字
        this.$refs.award.classList.add('shake-constant', 'shake-hard')
        // 晃動紙條、字轉白色
        for (const paper of papers) {
          paper.style.transform = `skew(-${rand(5, 15)}deg,-${rand(0, 15)}deg) rotate(-${rand(45, 270)}deg)`
          paper.style.left = `${rand(3, 77)}%`
          paper.style.bottom = `${rand(0, 20)}`
          // paper.style.transition = '1.8s'
        }
      }, 180)

      setTimeout(() => {
        // 隨機抽取紙條變數
        const one = rand(1, papers.length) - 1
        console.log(`抽到第 ${one} +1 張`)
        // 停止晃動箱子、獎項文字
        this.$refs.box.classList.remove('shake-constant', 'shake-hard')
        this.$refs.award.classList.remove('shake-constant', 'shake-hard')
        // 紙條上升
        papers[one].style.color = 'white'
        papers[one].style.left = '50%'
        papers[one].style.transform = 'translateX(-50%)'
        papers[one].firstChild.style.filter = 'blur(3px)'
        // 紙條標記 one
        papers[one].classList.add('one')
        // 以螢幕大小，判斷紙條位置
        window.innerWidth >= 1025 ? papers[one].style.bottom = '70%' : (window.innerWidth < 1025 && window.innerWidth) > 600 ? papers[one].style.bottom = '90%' : papers[one].style.bottom = '125%'

        // 遮手進場、提示文字
        this.$data.openText = true
        this.$refs.hand.classList.add('changeY')
      }, 2000)
    },
    open () {
      const one = document.getElementsByClassName('one')
      // 遮手退場、提示文字
      this.$data.openText = false
      this.$data.keepText = true
      this.$refs.hand.classList.remove('changeY')
      // 紙條放大、可點擊
      one[0].style.transform = 'translateX(-50%) scale(2)'
      one[0].style.color = 'black'
      one[0].firstChild.style.filter = 'blur(0px)'
      setTimeout(() => {
        one[0].style.pointerEvents = 'auto'
      }, 400)
    },
    // 點擊紙條繼續 function
    keep (idx) {
      const papers = document.getElementsByClassName('paper')
      const one = document.getElementsByClassName('one')
      // 移除紙條、提示文字
      this.$data.keepText = false
      one[0].style.pointerEvents = 'none'
      one[0].style.transition = '0.3s'
      one[0].style.opacity = '0'

      // 獎項文字淡出
      if (papers.length === 0) {
        this.$refs.award.style.opacity = '0'
      }

      setTimeout(() => {
        // 移除紙條
        one[0].remove()
        if (papers.length !== 0) {
        // 按鈕、inputText出現
          this.$refs.startBig.style.opacity = '1'
          this.$refs.startBig.style.pointerEvents = 'auto'
          this.$data.inputText = true
        }
      }, 300)
      setTimeout(() => {
        if (papers.length === 0) {
          // 移除獎項文字
          this.$refs.award.style.display = 'none'
          // 重新開始文字
          this.$data.over = true
          // 點擊歷史紀錄
          document.getElementById('history').click()
          console.log('點擊了')
        }
      }, 400)
    },
    restart () {
      location.reload()
    },
    history () {
      // 查看裡史紀錄
      console.log('成功點擊')
    }
    // TODO 歷史紀錄、獎項輸入綁定、註解掉選項
  }
}
</script>
