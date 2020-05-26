class HomeCtl {
  index(ctx) {
    ctx.body = '我是首页'
  }
}

module.exports = new HomeCtl()