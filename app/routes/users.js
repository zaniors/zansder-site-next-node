const Router = require('@koa/router')
const usersCtl = require('../controllers/users')
const router = new Router({ prefix: '/users' })

router.get('/', usersCtl.find)
router.post('/', usersCtl.create)
// router.delete('/', usersCtl)
router.get('/:id', usersCtl.findById)

module.exports = router