const Router = require('@koa/router')
const articleCtl = require('../controllers/article')
const router = new Router({ prefix: '/article' })
const auth = require('../auth')

router.post('/', auth.jwtAuth, articleCtl.create)
router.delete('/:id', auth.jwtAuth, articleCtl.delete)
router.patch('/:id', auth.jwtAuth, articleCtl.update)
router.get('/', articleCtl.find)
router.get('/:id', articleCtl.findById)

module.exports = router