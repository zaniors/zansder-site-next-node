const Router = require('@koa/router')
const usersCtl = require('../controllers/users')
const router = new Router({ prefix: '/users' })

router.get('/', usersCtl.find)
router.get('/:id', usersCtl.findById)

module.exports = router