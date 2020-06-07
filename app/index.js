const Koa = require('koa')
const app = new Koa()
const koaBody = require('koa-body');
const koaStatic = require('koa-static')
const mongoose = require('mongoose')
const error = require('koa-json-error')
const parameter = require('koa-parameter');
const cors = require('@koa/cors');
const registerRoutes = require('./routes')
const config = require('./config')
const { postFormat, formatError: format } = require('./utils/json-error')
const jsonResponse = require('./utils/json-response')

mongoose.set('toJSON', {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id;
    delete converted.__v;
  }
});
mongoose.connect(config.addr, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.connection.on('error', console.error)
mongoose.connection.on('open', () => console.log('mongodb connection successful!'))


app
  .use(jsonResponse())
  .use(registerRoutes())
  .use(cors({
    origin: (ctx) => {
      if (ctx.request.header.origin.includes('api.compelcode.com')) {
        return 'http://api.compelcode.com'
      }

      return '*'
    }
  }))
  .use(error({ postFormat, format }))
  .use(koaStatic(__dirname + '/public'))
  .use(koaBody({
    multipart: true,
    formidable: {
      uploadDir: __dirname + '/public/upload',
      keepExtensions: true
    }
  }))
  .use(parameter(app))
  .listen(config.port, console.log(`${process.env.NODE_ENV}, listen port on ${config.port}!`))