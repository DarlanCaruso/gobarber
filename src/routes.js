const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)
const routes = express.Router()

// middlewares
const authMiddleware = require('./app/middleware/auth')
const guestMiddleware = require('./app/middleware/guest')

routes.use('/app', authMiddleware)
routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success')
  res.locals.flashError = req.flash('error')

  return next()
})

// controllers
const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')

// routes
routes.get('/', guestMiddleware, SessionController.create)
routes.post('/signin', SessionController.store)

routes.get('/signup', guestMiddleware, UserController.create)
routes.post('/signup', upload.single('avatar'), UserController.store)

routes.get('/app/logout', SessionController.destroy)

routes.get('/app/dashboard', (req, res) => {
  console.log(req.session.user)
  return res.render('dashboard')
})

module.exports = routes
