const Router = require('@koa/router')
const articleCtl = require('../controllers/article')
const router = new Router({ prefix: '/article' })

router.post('/', articleCtl.create)
router.delete('/:id', articleCtl.delete)
router.patch('/:id', articleCtl.update)
router.get('/', articleCtl.find)
router.get('/:id', articleCtl.findById)

module.exports = router