const path = require('path')

class HomeCtl {
  index(ctx) {
    ctx.body = '我是首页'
  }

  /**
   * 上传文件
   * @param {*} ctx koa ctx
   */
  upload(ctx) {
    const { file } = ctx.request.files
    const basename = path.basename(file.path);
    ctx.body = { url: `${ctx.origin}/upload/${basename}` };
  }
}

module.exports = new HomeCtl()