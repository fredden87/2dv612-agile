// uses bcrypt package for password encryption
// according to tutorial on https://www.youtube.com/watch?v=_EP2qCmLzSE

'use strict'
const express = require('express')
const router = express.Router()
const User = require('../db_resources/usermodel.js')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const saltRounds = 10
const MONGODB_URL = 'mongodb+srv://team3:' + process.env.PASS + '@cluster0-xwlga.mongodb.net/team3'
const mailModel = require('../../mail.js')
let backendUrl = '127.0.0.1:3000'
if (process.env.VUE_APP_ENVIRONMENT==="production"){
    backendUrl='194.47.206.226:3000'
  }
function connect (response) {
  mongoose.connect(MONGODB_URL, {
    autoReconnect: true,
    useNewUrlParser: true
  }).catch(err => {
    console.log('Mongo connection error', err)
    response.status(500).json({
      error: err
    })
  })
}
router.get('/verify/:auth', function (req, res) {
  connect(res)
  console.log(req.params.auth)
  User.find({ token: req.params.auth })
    .exec()
    .then(user => {
      if (user.length !== 1) {
        return res.status(404).json({
          message: 'Email Verification Failed'
        })
      } else {
        user.verified = true
        user.url = ''
        user.save().then(data => {
          mailModel.sendMail(user, (error) => {
            if (error) {
              return console.log('Error: ' + error)
            }
          })
          res.status(200).json({
            message: user.email + ' email verification complete'
          })
        }).catch(err => {
          console.log(err)
          res.status(500).json({
            error: err
          })
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})
router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err
      })
    } else {
      connect(res)
      let seed = crypto.randomBytes(20)
      let authToken = crypto.createHash('sha1').update(seed + req.body.email).digest('hex')

      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        role: req.body.role,
        email: req.body.email,
        password: hash,
        url: 'http://' + backendUrl + '/user/verify/' + authToken,
        verified: false
      })

      user.save().then(data => {
        mailModel.sendMail(user, (error) => {
          if (error) {
            return console.log('Error: ' + error)
          }
        })
        res.status(200).json({
          message: 'New user added'
        })
      }).catch(err => {
        console.log(err)
        res.status(500).json({
          error: err
        })
      })
    }
  })
})

module.exports = router
