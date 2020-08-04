import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import connectMongo from 'connect-mongo'
import session from 'express-session'
import md5 from 'md5'
import dotenv from 'dotenv'
// import path from 'path'
// import multer from 'multer'
// import FTPStorage from 'multer-ftp'
// 需寫入檔案時要用到的(內建套件)
// import fs from 'fs'

import db from './db.js'

dotenv.config()

const MongoStore = connectMongo(session)
const app = express()

app.use(bodyParser.json())
app.use(cors({
  origin (origin, callback) {
    // 直接開網頁，不是 ajax 時，origin 是 undefined
    if (origin === undefined) {
      callback(null, true)
    } else {
      if (process.env.ALLOW_CORS === 'true') {
        // 開發環境，允許
        callback(null, true)
      } else if (origin.includes('github')) {
        // 非開發環境，但是從 github 過來，允許
        callback(null, true)
      } else {
        // 不是開發也不是從 github 過來，拒絕
        callback(new Error('Not allowed'), false)
      }
    }
  },
  // 取得認證資訊
  credentials: true
}))
// *拿來加密的訊號
app.use(session({
  // 密鑰，加密認證資料用(可隨便取)
  secret: 'dhand777',
  // 將 session 存入 mongodb
  store: new MongoStore({
    // 使用 mongoose 的資料庫連接
    mongooseConnection: db.connection,
    // 設定存入的 collection
    collection: process.env.COLLECTION_SESSION
  }),
  // *session 有效期間
  cookie: {
    // 1000 毫秒 = 一秒鐘
    // 1000 毫秒 * 60 = 一分鐘
    // 1000 毫秒 * 60 * 30 = 三十分鐘
    maxAge: 1000 * 60 * 30
  },
  // 是否保存未修改的 session
  saveUninitialized: false,
  // 是否每次重設過期時間
  rolling: true
}))

// *監聽
app.listen(process.env.PORT, () => {
  console.log(('已啟動'))
})

// TODO 從這開始
// *註冊 OK
app.post('/users', async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400)
    res.send({ success: false, message: '格式不符' })
  }

  try {
    await db.users.create({
      name: req.body.name,
      account: req.body.account,
      password: md5(req.body.password)
    })
    res.status(200)
    res.send({ success: true, message: `${req.body.account} 註冊成功` })
  } catch (error) {
    console.log(error)
    // 資料格式錯誤
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400)
      res.send({ success: false, message })
    } else {
      // 伺服器錯誤(程式問題)
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})

// *登入 OK
app.post('/login', async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400)
    res.send({ success: false, message: '格式不符' })
    return
  }

  try {
    const result = await db.users.find(
      {
        account: req.body.account,
        password: md5(req.body.password)
      }
    )

    if (result.length > 0) {
      req.session.user = result[0].account
      res.status(200)
      res.send({ success: true, message: `${req.body.name} 登入成功` })
    } else {
      res.status(404)
      res.send({ success: false, message: '帳號密碼有誤' })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      // 資料格式錯誤
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400)
      res.send({ success: false, message })
    } else {
      // 伺服器錯誤
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    }
  }
})

// *登出 OK
app.delete('/logout', async (req, res) => {
  req.session.destroy(error => {
    if (error) {
      res.status(500)
      res.send({ success: false, message: '伺服器錯誤' })
    } else {
      res.clearCookie()
      res.status(200)
      res.send({ success: true, message: '' })
    }
  })
})

// *知道使用者狀態 (維持住 session 登入，因為 session 每隔30分鐘過期的狀態)
app.get('/heartbeat', async (req, res) => {
  let islogin = false
  if (req.session.user !== undefined) {
    islogin = true
  }
  res.status(200)
  res.send(islogin)
  // 或是可以這樣寫↓
  // res.send(req.session.user !== undefined)
})
