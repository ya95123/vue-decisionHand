<template>
  <div id="wheel" class="d-flex justify-center align-center">
    <div class="game d-flex justify-center align-center">
      <!-- 右側欄 -->
      <div class="gameSetFrame">
        <v-icon class="gameSet"
          @click.stop="dialogSet = true"
        >
          mdi-cog-outline
        </v-icon>
        <v-icon class="gameSet mt-2">mdi-history</v-icon>
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
            轉盤設定
          </v-card-title>
          <!-- 文字、選項 -->
          <vue-scroll>
            <v-card-text class="d-flex justify-center align-center flex-column pa-0">
              <!-- 選擇方式 -->
              <v-radio-group v-model="radioSet">
                <v-radio
                  label="可重複轉到同一項目"
                  value="w1"
                  color="dhblue"
                ></v-radio>
                <v-radio
                  label="不重複"
                  value="w2"
                  color="dhblue"
                ></v-radio>
              </v-radio-group>
              <!--項目內容 -->
              <v-text-field
                v-for="(input,idx) in inputs"
                :key="input.num"
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
                    @click="deletInput(idx);submitInput()"
                  >
                    mdi-delete-forever
                  </v-icon>
                </template>
              </v-text-field>
              <!-- 增加 -->
              <div
                v-if="inputs.length === 12"
                class="mb-2"
              >
                轉盤項目最多至 12 項
              </div>
              <v-icon
                class="inputAdd"
                @click="addInput();submitInput()"
              >
                mdi-plus-circle-outline
              </v-icon>
            </v-card-text>
          </vue-scroll>
          <!-- button -->
          <v-card-actions class="d-flex justify-center pb-4">
            <v-btn
              color="green darken-1"
              style="height:30px;font-size:0.95rem;"
              text
              @click="submitInput();submitText()"
            >
              確定
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- 一樣要把class 分開 **v-for 優先於 v-if -->
      <div id="turnTable">
        <!-- 圓 -->
        <!-- submit 後 -->
        <div
          v-for="(input,idx) in inputs"
          :key="idx"
          class="part"
          :style="showTable"
        >
        </div>
        <!-- 初始 -->
        <div class="initPart part-1" :style="show"></div>
        <div class="initPart part-2" :style="show"></div>
        <!-- 左半圓框：給最後一個內容放的 -->

        <div class="halfRound leftRound">
          <!-- submit後 -->
          <div
            v-for="(input,idx) in inputs"
            :key="idx"
            class="leftPart initPart part-3"
            :style="showTable"
          >
          </div>
          <!-- 初始 -->
          <div class="initPart part-3" :style="show"></div>
        </div>

        <!-- 文字區 -->
        <div class="initText text-1" :style="show">睡覺😴</div>
        <div class="initText text-2" :style="show">去游泳🏊‍♂</div>
        <div class="initText text-3" :style="show">看Netflex🎬</div>
        <!-- submit 後 -->
        <div
          v-for="input in inputs"
          :key="input.num"
          class="wheelText"
          :style="showTable"
        >
          <div class="text">{{input.item}}</div>
        </div>
      </div>
      <!-- 開始鍵 -->
      <div class="startBig d-flex justify-center align-center">GO</div>
    </div>
  </div>
</template>

<script>
// 正則表達式，只留數字
const number = (str) => {
  return str.replace(/\D/g, '')
}
export default {
  name: 'Wheel',
  data: () => ({
    dialogSet: false,
    // 預設選擇方式
    radioSet: 'w1',
    rotate: false,
    show: 'display:flex;',
    showTable: 'display:none;',
    inputs: [
      { num: '項目1', item: '睡覺😴' },
      { num: '項目2', item: '去游泳🏊‍♂' },
      { num: '項目3', item: '看Netflex🎬' }
    ]
  }),
  methods: {
    addInput () {
      const n = this.$data.inputs.length
      if (n < 12) {
        this.$data.inputs.push({ num: `項目${n + 1}`, item: '' })
      }
    },
    deletInput (idx) {
      const inputs = this.$data.inputs
      let index = '各個 input 的索引直'
      // *console.log(`刪除第 ${idx} 個`)
      console.log(`純項目數字：${number(inputs[idx].num)}`)
      console.log(`刪除 [${inputs[idx].num}]`)
      // idx 被刪除 1，後面全部往前 -1 索引
      for (const input in inputs) {
        if (input > idx) {
          // console.log(idx)
          // input 為索引值
          index = input
          // 因為索引值是從 0 開始，所以這樣設計剛剛好 字面上會是 -1 的狀況
          inputs[input].num = `項目${index}`
        }
      }
      // *刪掉該 input (後刪：先後順序有差)
      inputs.splice(idx, 1)
    },
    submitText () {
      // 關掉對話框
      this.$data.dialogSet = false
      this.$data.show = 'display:none;'
      this.$data.showTable = 'display:flex;'
      // *rotate 部分
      // *文字區
      const textParts = document.getElementsByClassName('wheelText')
      const tLength = textParts.length
      let i = 1
      // console.log(tLength)
      for (const textPart of textParts) {
        // 文字大小
        tLength <= 4 ? textPart.style.fontSize = '2rem' : (tLength >= 5 && tLength <= 8) ? textPart.style.fontSize = '1.5rem' : textPart.style.fontSize = '1.25rem'
        // 寬度
        textPart.style.width = `calc(100% / ${tLength} * 1.17)`
        // 角度
        // console.log(i)
        textPart.style.transform = `translateX(-50%) rotate(${(360 / tLength / 2) * i}deg)`
        i += 2
      }
    },
    submitInput () {
      // *圖形區
      const rightParts = document.getElementsByClassName('part')
      const leftParts = document.getElementsByClassName('leftPart')
      const pLength = rightParts.length
      // r = 各個 input 的要轉的角度，起始點為 90 度
      const r = 90
      const pie = pLength
      let blue = pLength
      // (pie/2)後，小數點無條件進位，再加 1 => 為跨足左圓的第 n 個 part (因為 k 從 0 開始，所以不用 +1 了)
      const dividePie = Math.ceil((pie / 2))
      console.log('第 ' + dividePie + '+1 個分到左半圓')
      console.log(rightParts)
      // console.log(leftParts)
      for (let k = 0; k < pLength; k++) {
        if (k < dividePie) {
          // 右半圓 (重新調整 opacity，多次使用會被蓋掉)
          leftParts[k].style.opacity = '0'
          rightParts[k].style.opacity = '1'
          rightParts[k].style.transform = `rotate(${r + (360 / pLength) * k}deg)`
          // console.log(k)
        } else if (k >= dividePie) {
          // 左半圓處理
          rightParts[k].style.opacity = '0'
          leftParts[k].style.opacity = '1'
          leftParts[k].style.transform = `rotate(${r + (360 / pLength) * k}deg)`
        }
      }
      // 顏色變換，使之不連續
      if ((blue %= 2) !== 0) {
        blue = pLength
        console.log(blue)
        blue--
        leftParts[blue].style.background = '#5BBDC8'
      }
      console.log(blue)
    }
  }
}
</script>
