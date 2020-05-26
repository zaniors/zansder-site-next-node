const moogose = require('mongoose')
const { Schema, model } = moogose

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})

module.exports = model('User', userSchema)