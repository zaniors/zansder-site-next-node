const Article = require('../models/article')

class ArticleCtl {
  /**
   * 新增一篇博客文章
   * @param {*} ctx 
   */
  async create(ctx) {
    // 对请求参数进行校验
    ctx.verifyParams({
      title: {
        type: 'string',
        required: true
      },
      intro: {
        type: 'string',
        required: false
      },
      cover: {
        type: 'string',
        required: false
      },
    })

    const article = await new Article(ctx.request.body).save()
    ctx.body = article
  }

  async delete(ctx) {
    const article = await Article.findByIdAndRemove(ctx.params.id)

    // 如果文章不存在则返回404
    if (!article) {
      ctx.throw(404, '文章不存在')
    }

    ctx.status = 204
  }

  async update(ctx) {
    const article = await Article.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    if (!article) {
      ctx.throw(404, '文章不存在')
    }

    ctx.body = article
  }

  async find(ctx) {
    ctx.body = await Article.find()
  }

  async findById(ctx) {
    const article = await Article.findById(ctx.params.id)

    // 如果文章不存在则返回404
    if (!article) {
      ctx.throw(404, '文章不存在')
    }

    ctx.body = article
  }
}

module.exports = new ArticleCtl()