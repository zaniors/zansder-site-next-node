const path = require('path')
const config = require('../config')

class HomeCtl {
  index(ctx) {
    ctx.body = '欢迎来到我的博客接口，谢谢'
  }

  /**
   * 上传文件
   * @param {*} ctx koa ctx
   */
  upload(ctx) {
    const { file } = ctx.request.files
    const basename = path.basename(file.path);
    ctx.body = { url: `${config.img_prefix}/upload/${basename}` };
  }
}

module.exports = new HomeCtl()