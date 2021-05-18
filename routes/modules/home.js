const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../category.json')
console.log(Category)

router.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(records => {
      let totalAmount = 0
      console.log(records)
      records.forEach(record => {
        record.icon = Category[record.category].icon
        totalAmount += record.amount
        console.log(record.category)
      })
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.log(error))
})

module.exports = router