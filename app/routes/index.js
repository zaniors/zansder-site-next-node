const fs = require('fs')

function registerRoutes() {
  return async function ({ app }, next) {
    const files = fs.readdirSync(__dirname)

    files.forEach(file => {
      if (file === 'index.js') {
        return
      }
      const router = require(`./${file}`)
      app.use(router.routes())
    })

    await next()
  }
}

module.exports = registerRoutes