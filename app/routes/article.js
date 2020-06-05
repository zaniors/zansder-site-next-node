const Router = require('@koa/router')
const articleCtl = require('../controllers/article')
const router = new Router({ prefix: '/article' })
const auth = require('../auth')

router.post('/', articleCtl.create)
router.delete('/:id', articleCtl.delete)
router.patch('/:id', articleCtl.update)
router.get('/', auth.jwtAuth, articleCtl.find)
router.get('/:id', articleCtl.findById)

module.exports = router