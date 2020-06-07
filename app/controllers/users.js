const jwt = require('jsonwebtoken')
const Users = require('../models/users')

class UsersCtl {
  async create(ctx) {
    // 对请求参数校验，创建用户时name、password为必选
    ctx.verifyParams({
      username: {
        type: 'string',
        required: true
      },
      password: {
        type: 'string',
        required: true
      }
    })

    // 创建用户之前去数据库查找是否存在该用户，存在则不新建用户并返回409状态码
    const { username } = ctx.request.body
    const repeatedUser = await Users.findOne({ username })
    if (repeatedUser) {
      ctx.throw(409, '用户已经存在')
    }

    // const user = await (await userModel.create(ctx.request.body)).save()
    const user = await new Users(ctx.request.body).save() // 等价于上面的语句
    ctx.body = user
  }

  async delete(ctx) {
    const user = await Users.findByIdAndRemove(ctx.params.id)
    // 如果用户不存在则返回404状态码
    // 如果删除成功则返回204
    if (!user) {
      ctx.throw(404, '用户不存在')
    }
    ctx.status = 204
  }

  async update(ctx) {
    // 对请求参数校验，可以指定更新，参数都为可选
    ctx.verifyParams({
      username: {
        type: 'string',
        required: false
      },
      password: {
        type: 'string',
        required: false
      }
    })

    const user = await Users.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    // 如果用户不存在则返回404
    // 如果用户存在，更新用户信息且返回
    if (!user) {
      ctx.throw(404, '该用户不存在')
    }
    ctx.body = user
  }

  async find(ctx) {
    // 返回所有用户集合
    ctx.body = await Users.find()
  }

  async findById(ctx) {
    const user = await Users.findById(ctx.params.id)
    // 如果用户不存在则返回404
    // 如果找到该用户则返回该用户信息
    if (!user) {
      ctx.throw(404, '该用户不存在')
    }
    ctx.body = user
  }

  async login(ctx) {
    // 对请求参数校验，用户登录时name、password为必选
    ctx.verifyParams({
      username: {
        type: 'string',
        required: true
      },
      password: {
        type: 'string',
        required: true
      },
    })

    // 根据用户名和密码查找用户
    // 如果用户不存在，则返回401
    // 如果用户存在，密码错误则返回401
    // 否则返回jwt
    const user = await Users.findOne(ctx.request.body)
    if (!user) {
      ctx.throw(401, '用户名或者密码错误')
    }

    const { _id, username } = user
    const token = jwt.sign({ _id, username }, 'zansder_blog', { expiresIn: '24h' })
    ctx.body = { token }
  }
}

module.exports = new UsersCtl()