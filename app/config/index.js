const dev = require('./dev.config')
const prod = require('./prod.config')

process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
module.exports = process.env.NODE_ENV === 'production' ? prod : dev