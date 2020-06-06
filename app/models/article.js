const { Schema, model } = require('mongoose')

const articleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  intro: String,
  cover: String,
  content: String,
  createTime: {
    type: Date,
    default: new Date()
  }
})

module.exports = model('Article', articleSchema)