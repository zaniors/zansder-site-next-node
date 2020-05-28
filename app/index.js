const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose')
const registerRoutes = require('./routes')
const config = require('./config')
const error = require('koa-json-error')
const { postFormat } = require('./json-error')

mongoose.connect(config.addr, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, console.log('mongodb connection successful!'))
mongoose.connection.on('error', console.error)

app
  .use(error({ postFormat }))
  .use(bodyParser())
  .use(registerRoutes())
  .listen(config.port, console.log(`listen port on ${config.port}!`))