const Router = require('@koa/router')
const homeCtl = require('../controllers/home')
const router = new Router()

router.get('/', homeCtl.index)

module.exports = router