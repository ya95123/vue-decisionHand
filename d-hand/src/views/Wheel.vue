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
                v-for="input in inputs"
                :key="input.num"
                :label="input.num"
                v-model="input.item"
                color="success"
              >
              </v-text-field>
            </v-card-text>
          </vue-scroll>
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

        <div
          v-for="input in inputs"
          :key="input.num"
          class="test1"
        >
        </div>
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
    // 預設選擇方式
    radioSet: 'w1',
    inputs: [
      { num: '項目1', item: '睡覺😴', style: 'transform:rotate(90deg);' },
      { num: '項目2', item: '去游泳🏊‍♂', style: 'transform:rotate(210deg);' },
      { num: '項目3', item: '看Netflex🎬', style: 'transform:rotate(330deg);' }
    ]
    // items: [1]
  }),
  methods: {

  },
  computed: {
  //   rotatePart () {
  //     let d = 90
  //     let part = document.getElementsByClassName('test1')
  //   }
  }
}

// const d = 90
// const part = document.getElementsByClassName('test1')
// for (let i = 0; i <= 2; i++) {
//   part[i].style.transform = `rotate(${d + (360 / 3) * i}deg)`
// }
</script>
