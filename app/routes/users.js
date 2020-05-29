const Router = require('@koa/router')
const usersCtl = require('../controllers/users')
const auth = require('../auth')
const router = new Router({ prefix: '/users' })

router.post('/', usersCtl.create)
router.delete('/:id', auth.jwtAuth, auth.limitAuth, usersCtl.delete)
router.patch('/:id', auth.jwtAuth, auth.limitAuth, usersCtl.update)
router.get('/', usersCtl.find)
router.get('/:id', usersCtl.findById)

router.prefix('').post('/login', usersCtl.login)

module.exports = router