const Record = require('../record')
const recordList = require('../../record.json').results

const db = require('../../config/mongoose')

// 連線成功
db.once('open', () => {
  recordList.forEach(record => Record.create(record))
  console.log('done')
})