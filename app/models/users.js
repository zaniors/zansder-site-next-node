const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  __v: {
    type: Number,
    select: false
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false // 密码不被查询出去
  },
  remember: {
    type: Boolean,
    required: false,
    default: false
  }
})

module.exports = model('User', userSchema)