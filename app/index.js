const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose')
const registerRoutes = require('./routes')
const config = require('./config')

mongoose.connect(config.addr, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, console.log('mongodb connection successful!'))
mongoose.connection.on('error', console.error)

app
  .use(bodyParser())
  .use(registerRoutes())
  .listen(9200, console.log('listen port on 9200!'))