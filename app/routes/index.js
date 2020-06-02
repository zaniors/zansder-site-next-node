const fs = require('fs')

function registerRoutes() {
  return async function ({ app }, next) {
    const files = fs.readdirSync(__dirname)

    files.forEach(file => {
      if (file === 'index.js') {
        return
      }
      const route = require(`./${file}`)
      app
      .use(route.routes())
      .use(route.allowedMethods())
    })

    await next()
  }
}

module.exports = registerRoutes