const Category = require('../category')
const categoryList = require('../../category.json').category

const db = require('../../config/mongoose')

// 連線成功
db.once('open', () => {
  categoryList.forEach(category => Category.create(category))
  console.log('done')
})