// uses bcrypt package for password encryption
// according to tutorial on https://www.youtube.com/watch?v=_EP2qCmLzSE

'use strict'
const express = require('express')
const router = express.Router()
const User = require('../db_resources/usermodel.js')
const Area = require('../db_resources/areamodel.js')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const saltRounds = 10
const mailModel = require('../../mail.js')
const frontendUrl = require('../frontendURL.js')
const backendUrl = require('../backendURL.js')

router.get('/verify/:auth', function (req, res) {
  let authToken = req.params.auth
  User.find({ token: authToken })
    .exec()
    .then(user => {
      if (user.length !== 1) {
        return res.status(404).json({
          message: 'Email Verification Failed'
        })
      } else {
        User.update({ token: authToken }, { $set: { verified: true } }, function (err, user) {
          if (err) {
            res.status(500).json({
              error: err
            })
          }
          res.status(301).redirect(frontendUrl + '/#/login')
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
      let seed = crypto.randomBytes(20)
      let authToken = crypto.createHash('sha1').update(seed + req.body.email).digest('hex')

      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        role: req.body.role,
        email: req.body.email,
        password: hash,
        token: authToken,
        url: backendUrl + '/user/verify/' + authToken,
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

router.post('/', (req, res, next) => {
  User.find({ _id: req.params.id, email: req.body.email })
    .exec()
    .then(user => {
      return res.status(200).send(user)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})

router.post('/delete/:id', (req, res, next) => {
  User.find({ _id: req.params.id, email: req.body.email })
    .remove()
    .exec()
    .then(user => {
      console.log(user)
      Area.find({ email: req.body.email })
        .remove()
        .exec()
        .then(user => {
          console.log(user)
          return res.status(200).json({ message: JSON.stringify(req.body.email) + ' removed' })
        })
        .catch(err => {
          console.log(err)
          res.status(500).json({
            error: err
          })
        })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})
router.post('/changepw', (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      bcrypt.compare(req.body.oldPassword, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Password change failed'
          })
        }
        if (result) {
          bcrypt.hash(req.body.newPassword, saltRounds).then(function (hash) {
            user.password = hash
            user.save()
            return res.status(200).json({
              message: 'Password change succeeded'
            })
          })
        } else {
          return res.status(401).json({
            message: 'Password change failed'
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

router.post('/changeemail', (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (req.body.email === user.email) {
        user.email = req.body.newEmail
        user.save().then(user => {
          Area.updateMany({ email: req.body.email }, { $set: { email: req.body.newEmail } }).then(area => {
            return res.status(200).json({
              message: 'Email changed to:' + req.body.newEmail
            })
          }).catch(err => {
            console.log(err)
            res.status(500).json({
              error: err
            })
          })
        }).catch(err => {
          console.log(err)
          res.status(500).json({
            error: err
          })
        })
      } else {
        return res.status(401).json({
          message: 'Email change failed'
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

module.exports = router
