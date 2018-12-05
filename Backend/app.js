const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const loginRoutes = require('./api/routes/login')
const adminRoutes = require('./api/routes/admin')
const userRoutes = require('./api/routes/user')
const vehicleRoutes = require('./api/routes/vehicle')
const areaRoutes = require('./api/routes/area')
const checkToken = require('./api/middleware/checkToken')

// enable preflight headers for all routes
const cors = require('cors')
app.options('*', cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
  secret: '447ru5768gjsdfbnll34556978dfgjkfdjk45654343l',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
  // default server-side session storage, MemoryStore, is not designed for a production environment
  // store: new MongoStore({mongoose_connection: mongoose.connection })
}))

// Preventing CORS errors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, DELETE, POST, PUT, PATCH')
    return res.status(200).send()
  }
  next()
})

// Routes
// app.use('*', checkToken)
app.use('/login', loginRoutes)
app.use('/user', userRoutes)
app.use('/admin', checkToken, adminRoutes)
app.use('/vehicle', checkToken, vehicleRoutes)
app.use('/area', checkToken, areaRoutes)

// Error handling needs to be after all routes
app.use((req, res, next) => {
  const error = new Error('Not found!')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app
