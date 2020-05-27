const userModel = require('../models/users')

class UsersCtl {
  async find(ctx) {
    ctx.body = await userModel.find()
  }

  async findById(ctx) {
    const user = await userModel.findById(ctx.params.id)
    if (!user) {
      ctx.throw(404, '该用户不存在')
    }
    ctx.body = user
  }

  async create(ctx) {
    const user = await (await userModel.create(ctx.request.body)).save()
    ctx.body = user
  }
}

module.exports = new UsersCtl()