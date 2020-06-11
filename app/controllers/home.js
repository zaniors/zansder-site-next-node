const path = require('path')
const config = require('../config')
const qiniuUploader = require('../utils/qiniu-uploader')

class HomeCtl {
  index(ctx) {
    ctx.body = '欢迎来到我的博客接口，谢谢'
  }

  /**
   * 上传文件
   * @param {*} ctx koa ctx
   */
  async upload(ctx) {
    // 生产环境使用七牛云上传，开发环境则使用KoaBody中间件上传
    if (process.env.NODE_ENV === 'production') {
      try {
        const { file } = ctx.request.files
        const basename = path.basename(file.path)
        const data = await qiniuUploader.uploadFile(basename, file.path)
        ctx.body = { url: `${config.img_prefix}/${data}` }
      } catch (error) {
        ctx.throw(error)
      }
      return
    }

    const { file } = ctx.request.files
    const basename = path.basename(file.path);
    ctx.body = { url: `${config.img_prefix}/upload/${basename}` };
  }
}

module.exports = new HomeCtl()