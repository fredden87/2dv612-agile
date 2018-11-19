const express = require('express')
const app = express()
const bodyParser = require('body-Parser')

const loginRoutes = require('./api/routes/login')
const adminRoutes = require('./api/routes/admin')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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
app.use('/login', loginRoutes)
app.use('/admin', adminRoutes)

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
