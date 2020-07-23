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
        <v-card>
          <!-- 標題 -->
          <v-card-title class="d-flex justify-center font-weight-bold orange--text">
            抽獎設定
          </v-card-title>
          <!-- 文字、選項 -->
          <vue-scroll>
            <v-card-text class="d-flex justify-center align-center flex-column pa-0">
              <!-- 選擇方式 -->
              <v-radio-group v-model="radioSet">
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
              </v-radio-group>
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
          <!-- button -->
          <v-card-actions class="d-flex justify-center pb-4">
            <!-- 可對應到文字 -->
            <!-- <span>{{inputs[0].item}}</span> -->
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
    dialogSet: false,
    // 預設選擇方式
    radioSet: 'w2',
    inputs: [
      { num: '紙條1', item: '' },
      { num: '紙條2', item: '' },
      { num: '紙條3', item: '' }
    ]
  }),
  methods: {
    addInput () {
      const n = this.$data.inputs.length
      this.$data.inputs.push({ num: `紙條${n + 1}`, item: '' })
    },
    deletInput (idx) {
      this.$data.inputs.splice(idx, 1)
    }
  }
}
</script>
