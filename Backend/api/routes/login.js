const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../db_resources/usermodel.js')
const MONGODB_URL = 'mongodb+srv://team3:' + process.env.PASS + '@cluster0-xwlga.mongodb.net/team3'
const router = express.Router()
const jwt = require('jsonwebtoken')

// Using email and password to auth user
router.post('/', (req, res, next) => {
  connectDB(res)
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        mongoose.connection.close()
        return res.status(401).json({
          message: 'Authorization failed'
        })
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          mongoose.connection.close()
          return res.status(401).json({
            message: 'Authorization failed'
          })
        }
        if (result) {
          req.session.isLoggedIn = true
          req.session.email = req.body.email
          req.session.password = req.body.password
          req.session.save()
          mongoose.connection.close()
          let token = jwt.sign({ id: user.id }, process.env.PASS, { expiresIn: 86400 })
          res.status(200).json({ message: 'Welcome: ' + user[0].firstname + ' ' + user[0].lastname, auth: true, token: token, user: user[0] })
        } else {
          mongoose.connection.close()
          return res.status(401).json({
            message: 'Authorization failed'
          })
        }
      })
    })
    .catch(err => {
      console.log(err)
      mongoose.connection.close()
      res.status(500).json({
        error: err
      })
    })
})

router.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err)
      mongoose.connection.close()
      res.status(500).json({
        error: err
      })
    } else {
      mongoose.connection.close()
      res.status(200).json({
        message: 'User logged out'
      })
    }
  })
})

function connectDB (res) {
  mongoose.connect(MONGODB_URL, {
    autoReconnect: true,
    useNewUrlParser: true
  }).catch(err => {
    console.log('Mongo connection error', err)
    res.status(500).json({
      error: err
    })
  })
}

module.exports = router
