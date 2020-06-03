function formatError(err) {
  console.log(err)
  return {
    code: err.status,
    message: err.message,
    stack: err.stack
  }
}

function postFormat(err, { stack, ...rest }) {
  // 生产环境不返回stack错误堆栈消息
  return process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
}

module.exports = {
  formatError,
  postFormat
}