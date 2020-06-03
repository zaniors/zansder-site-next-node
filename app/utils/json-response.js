const jsonResponse = () => {
  return async (ctx, next) => {
    await next()
    const code = ctx.status
    const data = ctx.body
    if (ctx.method.toLowerCase !== 'option' && code === 200) {
      ctx.body = {
        data,
        code
      }
    }
  }
}

module.exports = jsonResponse