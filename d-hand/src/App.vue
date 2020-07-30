<template>
  <v-app id="app">
    <!-- 電腦尺寸 NavT -->
    <v-bottom-navigation
      id="top"
      class="elevation-0 py-2"
      background-color="transparent"
      height="calc(64px + 16px)"
      v-model="navT"
      dark
      shift
    >
      <!-- TODO Logo 之後 hover 要做效果 -->
      <div class="col-2 pl-10 d-flex justify-start align-center">
        <!-- <router-link to="/" id="logo" class="white--text">LOGO</router-link> -->
        <span id="logo" class="white--text">LOGO</span>
      </div>

      <!-- Menu 選單 -->
      <div class="col-8 d-flex justify-center">
        <router-link
          v-for="navLitem in navLitems"
          :key="navLitem.name"
          :to="navLitem.router"
        >
          <v-btn>
            <span>{{navLitem.name}}</span>
            <v-icon>{{navLitem.icon}}</v-icon>
          </v-btn>
        </router-link>

        <!-- 組合設定：登入後才有的功能 -->
        <router-link v-if="login" to="/group">
          <v-btn>
            <span>組合</span>
            <v-icon>mdi-text-box-multiple</v-icon>
          </v-btn>
        </router-link>
      </div>

      <!-- TODO Reg / Login /Logout 功能 -->
      <div class="col-2 pr-10 d-flex justify-end align-center white--text">
        <!-- 註冊 -->
        <v-btn
          id="btnReg"
          text
          v-if="!login"
          class="login mr-1"
          @click.stop="dialog = true"
          @click="dialogReg"
        >
          註冊
        </v-btn>
        <!-- 登入 -->
        <v-btn
          id="btnLogin"
          text
          v-if="!login"
          class="login"
          @click.stop="dialog = true"
          @click="dialogLogin"
        >
          登入
        </v-btn>
        <!-- 對話框 -->
        <v-dialog
          v-model="dialog"
          persistent
          max-width="500px"
        >
            <!-- 標籤組件 -->
            <v-card>
              <v-tabs
                class="d-flex justify-center"
                v-model="tab"
              >
                <v-tab
                  v-for="item in items"
                  :key="item.tab"
                >
                  {{ item.tab }}
                </v-tab>
              </v-tabs>
            <!-- 各標籤內容 -->
            <v-tabs-items v-model="tab">
              <v-tab-item
                v-for="item in items"
                :key="item.tab"
              >
                <v-card flat>
                  <v-card-text>
                    <form>
                      <v-text-field
                        v-if=" tab === 0"
                        v-model="name"
                        :error-messages="nameErrors"
                        :counter="10"
                        label="暱稱"
                        required
                        @input="$v.name.$touch()"
                        @blur="$v.name.$touch()"
                      >
                      </v-text-field>

                      <v-text-field
                        v-model="account"
                        :error-messages="accountErrors"
                        counter
                        label="帳號"
                        required
                        @input="$v.account.$touch()"
                        @blur="$v.account.$touch()"
                      >
                      </v-text-field>

                      <v-text-field
                        v-model="password"
                        :error-messages="passwordErrors"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        counter
                        label="密碼"
                        required
                        @input="$v.password.$touch()"
                        @blur="$v.password.$touch()"
                        @click:append="show1 = !show1"
                      >
                      </v-text-field>

                      <v-text-field
                        v-if=" tab === 0"
                        v-model="repeatPassword"
                        :error-messages="repeatPasswordErrors"
                        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show2 ? 'text' : 'password'"
                        counter
                        label="重複密碼"
                        required
                        @input="$v.repeatPassword.$touch()"
                        @blur="$v.repeatPassword.$touch()"
                        @click:append="show2 = !show2"
                      >
                      </v-text-field>
                      <!-- clg 檢查狀態 -->
                      <div class="text-center">
                        是否有錯誤：{{$v.$error}} ｜ 對話框打開：{{ dialog }}｜
                        帳號 / 密碼錯誤：{{$v.account.$error}} / {{$v.password.$error}}
                      </div>
                      <!-- 註冊 / 登入 / 取消 button -->
                      <div class="text-center">
                        <v-btn
                          class="mr-4 mt-2 mb-1 py-1"
                          color="dhorange"
                          dark
                          @click="dialog = false"
                        >
                          取消
                        </v-btn>
                        <v-btn
                          v-if="tab === 0"
                          class="mt-2 mb-1 py-1" color="primary"
                          @click="check"
                          @click.stop="dialogCheck = true"
                        >
                          註冊
                        </v-btn>

                        <v-btn
                          v-else
                          class="mt-2 mb-1 py-1"
                          color="primary"
                          @click="check"
                          @click.stop="dialogCheck = true"
                        >
                          登入
                        </v-btn>
                        <!-- 確認對話框 -->
                        <!-- TODO
                        1.註冊成功按登入可直接(登入)，並關閉所有對話框 v
                        2.註冊失敗要關掉該對話框，註冊對話框保留(重新註冊) v
                        3.登入成功 (開始) / 登入失敗 (重新輸入) v
                        4.之後註冊要判斷註冊暱稱、帳號是否已被使用過
                        5.之後登入要判斷是否有該帳號存在
                        6.按 enter 的效果  -->
                        <v-dialog
                          v-model="dialogCheck"
                          max-width="290"
                          persistent
                        >
                          <v-card>
                            <!-- icon -->
                            <div class="text-center pt-5">
                              <!-- 成功 -->
                              <v-icon
                                v-if="(tab === 0 && !$v.$error) || (tab === 1 && (!$v.account.$error && !$v.password.$error))"
                                color="dhred"
                                style="font-size:2rem;"
                              >
                                mdi-party-popper
                              </v-icon>
                              <!-- 失敗 -->
                              <v-icon
                                v-else-if="(tab === 0 && $v.$error) || (tab === 1 && ($v.account.$error || $v.password.$error))"
                                color="dhorange"
                                style="font-size:2rem;"
                              >
                                mdi-cloud-alert
                              </v-icon>
                            </div>
                            <!-- 文字 -->
                            <v-card-title
                              class="d-flex justify-center font-weight-bold"
                            >
                              <!-- 註冊/登入 成功 -->
                              <span v-if="tab === 0 && !$v.$error">註冊成功</span>
                              <span v-else-if="tab === 1 && !$v.account.$error && !$v.password.$error">登入成功</span>
                              <!-- 註冊/登入 失敗 -->
                              <span v-else-if="tab === 0 && $v.$error">註冊失敗</span>
                              <span v-else-if="tab === 1 && ($v.account.$error || $v.password.$error)">登入失敗</span>
                            </v-card-title>
                            <!-- button -->
                            <div class="text-center pb-5">
                              <v-btn
                                color="green darken-1"
                                style="height:30px"
                                text
                                @click="dialogCheck = false"
                              >
                                <!-- 註冊/登入 成功 -->
                                <span v-if="tab === 0 && !$v.$error" @click="submit">登入</span>
                                <span v-else-if="tab === 1 && !$v.account.$error && !$v.password.$error" @click="submit">開始</span>
                                <!-- 註冊/登入 失敗 -->
                                <span  v-else-if="(tab === 0 && $v.$error) || (tab === 1 && ($v.account.$error || $v.password.$error))">再試一次</span>
                              </v-btn>
                            </div>
                          </v-card>
                        </v-dialog>

                      </div>
                    </form>
                  </v-card-text>
                </v-card>

              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-dialog>

        <!-- 已登入 -->
        <span v-if="login" class="login" @click="logout">
          <v-icon class="pr-2">mdi-emoticon-happy-outline</v-icon>
          <span>暱稱</span>
        </span>
      </div>
    </v-bottom-navigation>

    <!-- 平板尺寸以下 NavB -->
    <v-bottom-navigation
      id="bottom"
      :value="navB"
      color="dhred"
      background-color="dhyellow"
      app
    >
      <router-link
        v-for="navBitem in navBitems"
        :key="navBitem.name"
        :to="navBitem.router"
      >
        <v-btn>
          <span>{{navBitem.name}}</span>
          <v-icon>{{navBitem.icon}}</v-icon>
        </v-btn>
      </router-link>

      <!-- 組合設定：登入後才有的功能 -->
      <router-link v-if="login" to="/group">
        <v-btn>
          <span>組合</span>
          <v-icon>mdi-text-box-multiple</v-icon>
        </v-btn>
      </router-link>

      <!-- TODO Reg / Login/ Logout 功能 -->
      <v-btn v-if="!login" @click="clickLogin">
        <span>登入</span>
        <v-icon>mdi-emoticon-cool-outline</v-icon>
      </v-btn>

      <v-btn v-else @click="logout">
        <span>登出</span>
        <v-icon>mdi-emoticon-happy-outline</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <!-- footer -->
    <div id="footer"
      class="text-center white--text overline py-3"
    >
      Decision Hand &copy; {{ new Date().getFullYear() }}
      <v-btn
        class="white--text"
        style="height:36px;"
        href="https://github.com/ya95123/vue-decisionHand"
        target="_blank"
        icon
      >
        <v-icon size="28px">mdi-github</v-icon>
      </v-btn>
    </div>
    <router-view/>
  </v-app>
</template>

<script>
// 驗證
import { validationMixin } from 'vuelidate'
import { required, maxLength, sameAs, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'App',
  // 驗證使用
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(10) },
    account: { required, minLength: minLength(4) },
    password: { required, minLength: minLength(4) },
    repeatPassword: { required, sameAsPassword: sameAs('password') }
  },
  data: () => ({
    login: false,
    navT: 0,
    navB: 0,
    navLitems: [
      { name: '猜拳', router: '/', icon: 'mdi-hand-peace' },
      { name: '轉盤', router: '/wheel', icon: 'mdi-radius-outline' },
      { name: '抽獎', router: '/raffle', icon: 'mdi-gift-outline' }
    ],
    navBitems: [
      { name: '猜拳', router: '/', icon: 'mdi-hand-peace' },
      { name: '酒瓶', router: '/bottle', icon: 'mdi-bottle-wine' },
      { name: '轉盤', router: '/wheel', icon: 'mdi-radius-outline' },
      { name: '抽獎', router: '/raffle', icon: 'mdi-gift-outline' }
    ],
    // reg / login 標籤組件
    dialog: false,
    dialogCheck: false,
    tab: 0,
    name: '',
    account: '',
    password: '',
    repeatPassword: '',
    show1: false,
    show2: false,
    items: [{ tab: '註冊' }, { tab: '登入' }]
  }),
  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('暱稱最多 10 個字')
      !this.$v.name.required && errors.push('請 帥哥 / 美女 必須填唷 ☺')
      return errors
    },
    accountErrors () {
      const errors = []
      if (!this.$v.account.$dirty) return errors
      !this.$v.account.minLength && errors.push('帳號最少 4 個字')
      !this.$v.account.required && errors.push('請 帥哥 / 美女 必須填唷 ☺')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength && errors.push('密碼最少 4 個字')
      !this.$v.password.required && errors.push('請 帥哥 / 美女 必須填唷 ☺')
      return errors
    },
    repeatPasswordErrors () {
      const errors = []
      if (!this.$v.repeatPassword.$dirty) return errors
      !this.$v.repeatPassword.required && errors.push('請 帥哥 / 美女 必須填唷 ☺')
      !this.$v.repeatPassword.sameAsPassword && errors.push('密碼必須相同唷 ☺')
      return errors
    }
  },
  methods: {
    dialogReg () {
      this.$data.tab = 0
    },
    dialogLogin () {
      this.$data.tab = 1
    },
    check () {
      this.$v.$touch()
    },
    submit () {
      // dialog 在瀏覽器上顯示未定義，所以無法使用 $data，其他就需要使用，效能會比較好
      this.dialog = false
      this.dialogCheck = false
      this.$data.login = true
      // TODO 之後要做"資料傳遞" 註冊 / 登入
      // TODO 註冊成功可以直接登入 or 跳到 tab = 1 畫面
    },
    clickLogin () {
      document.getElementById('btnLogin').click()
    },
    logout () {
      // 點擊到登出按鈕 or 只要都用登出就好
      this.$data.login = false
    }
  }
}
</script>
