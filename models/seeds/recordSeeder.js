const mongoose = require('mongoose') // 載入 mongoose
const Record = require('../record')
const recordList = require('../../record.json').results
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })// 設定連線到 mongoDB
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
  recordList.forEach(record => Record.create(record))
  console.log('done')
})