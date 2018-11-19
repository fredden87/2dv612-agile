const express = require('express')
const app = express()
const bodyParser = require('body-Parser')

const loginRoutes = require('./api/routes/login')
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// routes
app.use('/login', loginRoutes)

// error handling needs to be after all routes
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
