const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

router.get('/', (req, res) => {
  Record.find()// 取出 Record model 裡的所有資料
    .lean() //把 Mongoose 的 Model 物件轉換成乾淨的JS資料陣列
    .sort({ _id: 'asc' })
    .then(records => {
      let totalAmount = 0
      records.forEach(records => {
        totalAmount += records.amount
      })
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.log(error)) //若發生意外執行錯誤處理
})

module.exports = router