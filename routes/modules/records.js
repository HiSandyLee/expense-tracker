const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../category.json')
const record = require('../../models/record')

//create page
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const { name, category, date, amount, icon } = req.body
  return Record.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//edit page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => {
      record.name = req.body.name
      record.category = req.body.category
      record.date = req.body.date
      record.amount = req.body.amount
      return record.save()
    })
    .then(() => res.redirect(`/`))
    .catch(error => console.log(error))
})


//delete
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//filter
router.get('/filter', (req, res) => {
  const { category } = req.query
  const categoryList = Category[category].name
  console.log(categoryList)
  console.log(category)
  return Record.find({ category })
    .sort({ _id: "asc" })
    .lean()
    .then((records) => {
      console.log(records)
      let totalAmount = 0
      records.forEach((record) => {
        record.icon = Category[record.category].icon
        totalAmount += record.amount
      })
      res.render('index', { records, totalAmount, category, categoryList })
    })
    .catch(error => console.log(error))
})

module.exports = router