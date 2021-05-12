// 載入 express 並建構應用程式伺服器
const express = require('express')
const mongoose = require('mongoose') // 載入 mongoose
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')// 引用 body-parser
const Record = require('./models/record')

const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

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
})

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

// 設定首頁路由
//home page
app.get('/', (req, res) => {
  Record.find()// 取出 Record model 裡的所有資料
    .lean() //把 Mongoose 的 Model 物件轉換成乾淨的JS資料陣列
    .then(records => res.render('index', { records }))
    .catch(error => console.log(error)) //若發生意外執行錯誤處理
})

app.get('/records/new', (req, res) => {
  return res.render('new')
})

app.post('/records', (req, res) => {
  const {
    name,
    category,
    date,
    amount,
  } = req.body
  return Record.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))

})


// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})