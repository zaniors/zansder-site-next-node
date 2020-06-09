const Router = require('@koa/router')
const homeCtl = require('../controllers/home')
const router = new Router()

router.get('/', homeCtl.index)
router.post('/upload', auth.jwtAuth, homeCtl.upload)

module.exports = router