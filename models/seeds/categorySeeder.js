const mongoose = require('mongoose') // 載入 mongoose
const Category = require('../category')
const categoryList = require('../../category.json').category
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
  categoryList.forEach(category => Category.create(category))
  console.log('done')
})
