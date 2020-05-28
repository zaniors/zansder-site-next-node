const moogose = require('mongoose')
const { Schema, model } = moogose

const userSchema = new Schema({
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