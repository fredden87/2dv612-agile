const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../db_resources/usermodel.js')
const MONGODB_URL = 'mongodb+srv://team3:' + process.env.PASS + '@cluster0-xwlga.mongodb.net/team3'
const router = express.Router()
const jwt=require('jsonwebtoken')

// Using email and password to auth user
router.post('/', (req, res, next) => {
  connectDB(res)
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: 'Authorization failed'
        })
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Authorization failed'
          })
        }
        if (result) {
          let token = jwt.sign({ id: user.id }, process.env.PASS, { expiresIn: 86400 })
          res.status(200).send({ auth: true, token: token, user: user })
        } else {
        return res.status(401).json({
          message: 'Authorization failed'
        })
      }
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
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
// Temp test
/* if (req.body.name === 'admin' && req.body.password === 'secret') {
  res.status(200).json({
    message: 'pass'
  })
  console.log('pass')
} else {
  res.status(401).json({
    message: 'fail'
  })
  console.log('fail')
}
}) */
module.exports = router
