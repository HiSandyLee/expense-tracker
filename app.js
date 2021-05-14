const express = require('express')// 載入 express 並建構應用程式伺服器
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')// 引用 body-parsery

const routes = require('./routes')
require('./config/mongoose')

const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(routes)

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})