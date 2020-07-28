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
                    @click="deletInput(idx)"
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
                @click="addInput"
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
              @click="submitText();submitPart()"
            >
              確定
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- TODO 內容要轉成 data+methods 搭配使用者輸入內容 大圓
      submitInput之後改rotate屬性 把最後一個標籤刪掉，在左半圓增加最後一Part，也就是length長度去計算 -->
      <!-- 一樣要把class 分開 -->
      <div id="turnTable">
        <!-- 圓 -->
        <div v-if="!rotate" class="initPart part-1"></div>
        <div v-if="!rotate" class="initPart part-2"></div>
        <!-- submit 後 -->
        <div
          v-for="(input,idx) in inputs"
          :key="idx"
          class="test"
          :style="show"
        >
        </div>
        <!-- 左半圓框：給最後一個內容放的 -->
        <div class="halfRound leftRound">
          <!-- 初始 -->
          <div v-if="!rotate" class="initPart part-3"></div>
          <!-- submit後 -->
          <div id="lastPart" class="initPart part-3" :style="show"></div>
        </div>

        <!-- 文字區 -->
        <div v-if="!rotate" class="initText text-1">睡覺😴</div>
        <div v-if="!rotate" class="initText text-2">去游泳🏊‍♂</div>
        <div v-if="!rotate" class="initText text-3">看Netflex🎬</div>
        <!-- submit 後 -->
        <div
          v-for="input in inputs"
          :key="input.num"
          class="wheelText"
          :style="show"
        >
          <div class="text">{{input.item}}</div>
        </div>
      </div>
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
    show: 'display:none;',
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
      this.$data.rotate = true
      this.$data.show = 'display:flex;'
      // *rotate 部分
      // *文字區
      const textParts = document.getElementsByClassName('wheelText')
      const tLength = textParts.length
      let i = 1
      // console.log(tLength)
      for (const textPart of textParts) {
        // 文字大小
        tLength <= 4 ? textPart.style.fontSize = '2rem' : (tLength >= 5 && tLength <= 6) ? textPart.style.fontSize = '1.5rem' : textPart.style.fontSize = '1rem'
        // 寬度
        textPart.style.width = `calc(100% / ${tLength})`
        // 角度
        // console.log(i)
        textPart.style.transform = `translateX(-50%) rotate(${(360 / tLength / 2) * i}deg)`
        i += 2
      }
    },
    submitPart () {
      // *圖形區
      const parts = document.getElementsByClassName('test')
      // const lastPart = document.getElementById('lastPart')
      const pLength = parts.length
      // r = 各個 input 的要轉的角度，起始點為 90 度
      const r = 90
      const pie = pLength
      // (pie/2)後，小數點無條件進位，再加 1 => 為跨足左圓的第 n 個 part
      const dividePie = Math.ceil((pie / 2)) + 1
      console.log(dividePie)
      for (let k = 0; k < pLength; k++) {
        if (k < dividePie) {
          // 右半圓
          parts[k].style.transform = `rotate(${r + (360 / pLength) * k}deg)`
        } else {
          // 左半圓處理
          parts[k].style.opacity = '0'
          // parts[k].style.display = 'none'
        }
      }

      // let k = 0
      // for (const part of parts) {
      //   // 重置透明度
      //   part.style.opacity = '1'
      //   part.style.transform = `rotate(${r + (360 / pLength) * k}deg)`
      //   k++
      //   if (k === pLength) {
      //     k--
      //     lastPart.style.transform = `rotate(${r + (360 / pLength) * k}deg)`
      //     parts[k].style.opacity = '0'
      //   }
      // }
      // console.log(parts)
      // console.log('長度' + pLength)
      // // console.log(last)
    }
  }
}
</script>
