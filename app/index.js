const Koa = require('koa')
const app = new Koa()
const path = require('path')
const koaBody = require('koa-body');
const koaStatic = require('koa-static')
const mongoose = require('mongoose')
const error = require('koa-json-error')
const parameter = require('koa-parameter');
const registerRoutes = require('./routes')
const config = require('./config')
const { postFormat } = require('./json-error')

mongoose.connect(config.addr, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.connection.on('error', console.error)
mongoose.connection.on('open', () => console.log('mongodb connection successful!'))

app
  .use(error({ postFormat }))
  .use(koaStatic(__dirname + '/public'))
  .use(koaBody({
    multipart: true,
    formidable: {
      uploadDir: __dirname + '/public/upload',
      keepExtensions: true
    }
  }))
  .use(parameter(app))
  .use(registerRoutes())
  .listen(config.port, console.log(`${process.env.NODE_ENV}, listen port on ${config.port}!`))