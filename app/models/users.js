const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  __v: {
    type: Number,
    select: false
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false // 密码不被查询出去
  }
})

module.exports = model('User', userSchema)