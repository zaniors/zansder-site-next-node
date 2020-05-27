function formatError() {

}

function postFormat(err, { stack, ...rest }) {
  return process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
}

module.exports = {
  formatError,
  postFormat
}