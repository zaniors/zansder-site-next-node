const Router = require('@koa/router')
const usersCtl = require('../controllers/users')
const router = new Router({ prefix: '/users' })
const auth = jwt({ secret: 'zansder_blog' })

router.post('/', usersCtl.create)
router.delete('/:id', auth, usersCtl.delete)
router.patch('/:id', auth, usersCtl.update)
router.get('/', usersCtl.find)
router.get('/:id', usersCtl.findById)

router.prefix('').post('/login', usersCtl.login)

module.exports = router