:state="state('name')"
:state="state('account')"
:state="state('password')"
reg()
login()

data(){
name: '',
account: '',
password: ''
}

computed: {
  // 抓取使用者
  user () {
    return this.$store.getters.user
  }
}
methods:{
state (type) {
  // 狀態
  //
  if (type === 'name') {
    if (this.name.length < 10) {
      return false
    } else {
      return true
    }
  }
  // 帳密一起
  if (type === 'account') {
    if (this.account.length < 4) {
      return false
    } else {
      return true
    }
  } else if (type === 'password') {
    if (this.password.length < 4) {
      return false
    } else {
      return true
    }
  }
},
reg () {
  event.preventDefault()
  this.axios.post(
    process.env.VUE_APP_APIURL + '/users',
    { account: this.account, password: this.password }
  )
    .then(response => {
      const data = response.data
      if (data.success) {
        // 如果回來的資料 success 是 true
        alert('註冊成功')
      } else {
        // 是 false 就顯示錯誤
        alert(data.message)
      }
    })
    .catch(error => {
      // 如果回來的狀態不是 200，顯示回來的 message
      alert(error.response.data.message)
    })
},
login () {
  event.preventDefault()
  this.axios.post(
    process.env.VUE_APP_APIURL + '/login',
    { account: this.account, password: this.password }
  )
    .then(response => {
      const data = response.data
      if (data.success) {
        // 如果回來的資料 success 是 true
        alert('登入成功')
        // 呼叫 vuex 的登入
        this.$store.commit('login', this.account)
      } else {
        // 是 false 就顯示錯誤
        alert(data.message)
      }
    })
    .catch(error => {
      // 如果回來的狀態不是 200，顯示回來的 message
      alert(error.response.data.message)
    })
},
logout () {
  // 登出案有轉換
  this.$data.login = false
  // 資料庫
  this.axios.delete(process.env.VUE_APP_APIURL + '/logout')
    .then(response => {
      const data = response.data
      if (data.success) {
        // 如果回來的資料 success 是 true
        alert('登出成功')
        // 呼叫 vuex 的登出
        this.$store.commit('logout')
        // 如果現在不是在首頁，登出後就跳到的首頁
        if (this.$route.path !== '/') {
          this.$router.push('/')
        }
      } else {
        // 不是就顯示回來的 message
        alert(data.message)
      }
    })
    .catch(error => {
      // 如果回來的狀態不是 200，顯示回來的 message
      alert(error.response.data.message)
    })
},
heartbeat () {
  this.axios.get(process.env.VUE_APP_APIURL + '/heartbeat')
    .then(response => {
      const data = response.data
      // 如果是登入中
      if (this.user.length > 0) {
        // 如果後端登入時間過期
        if (!data) {
          this.$store.commit('logout')
          // 如果現在不是在首頁，跳到登出後的首頁
          if (this.$route.path !== '/') {
            this.$router.push('/')
          }
        }
      }
    })
    .catch(() => {
      alert('發生錯誤')
      this.$store.commit('logout')
      // 如果現在不是在首頁，跳到登出後的首頁
      if (this.$route.path !== '/') {
        this.$router.push('/')
      }
    })
}
},
mounted () {
// 掛接
this.heartbeat()
setInterval(() => {
  this.heartbeat()
}, 1000 * 60)
}