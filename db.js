import dotenv from 'dotenv'
import mongoose from 'mongoose'
import beautifyUnique from 'mongoose-beautiful-unique-validation'

dotenv.config()

const Schema = mongoose.Schema
// 連到資料庫，設定在env環境檔裡
mongoose.connect(process.env.DBURL)
mongoose.plugin(beautifyUnique)

const userSchema = new Schema({
  name: {
    type: String,
    minlength: [1, '暱稱最少 1 個字'],
    maxlength: [10, '暱稱最多 10 個字'],
    unique: '暱稱已被使用',
    required: [true, '請輸入暱稱']
  },
  account: {
    type: String,
    minlength: [4, '帳號最少 4 個字'],
    unique: '帳號已被註冊',
    required: [true, '請輸入帳號']
  },
  password: {
    type: String,
    minlength: [4, '帳號最少 4 個字'],
    required: [true, '請輸入密碼']
  }
}, {
  versionKey: false
})

// process.env.COLLECTION_USER =>'users'
// 連到 env 檔
const users = mongoose.model(process.env.COLLECTION_USER, userSchema)
const connection = mongoose.connection

export default {
  users,
  connection
}
