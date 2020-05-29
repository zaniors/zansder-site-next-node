const jwt = require('koa-jwt')

const jwtAuth = jwt({ secret: 'zansder_blog' })

async function limitAuth(ctx, next) {
  // koa-jwt验证通过后会把payload信息存放在ctx.state.user中
  // 用户修改或者删除接口，将会把请求的id和用户id进行验证
  if (ctx.params.id !== ctx.state.user._id) {
    ctx.throw(401, '没有权限')
  }
  await next()
}

module.exports = {
  jwtAuth,
  limitAuth
}