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
const DashboardController = require('./app/controllers/DashboardController')
const FileController = require('./app/controllers/FileController')
const AppointmentController = require('./app/controllers/AppointmentController')
const AvaliableController = require('./app/controllers/AvaliableController')

// routes
routes.get('/file/:file', FileController.show)
routes.get('/', guestMiddleware, SessionController.create)
routes.get('/signup', guestMiddleware, UserController.create)
routes.get('/app/logout', SessionController.destroy)
routes.get('/app/dashboard', DashboardController.index)
routes.get('/app/appointments/new/:provider', AppointmentController.create)
routes.get('/app/available/:provider', AvaliableController.index)

routes.post('/signin', SessionController.store)
routes.post('/signup', upload.single('avatar'), UserController.store)
routes.post('/app/appointments/new/:provider', AppointmentController.store)

module.exports = routes
