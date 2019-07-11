const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../db_resources/usermodel.js')
const router = express.Router()
const jwt = require('jsonwebtoken')

// Using email and password to auth user
router.post('/', (req, res, next) => {
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
          req.session.isLoggedIn = true
          req.session.email = req.body.email
          req.session.password = req.body.password
          req.session.save()
          let token = jwt.sign({ id: user.id }, process.env.PASS, { expiresIn: 86400 })
          res.status(200).json({ message: 'Welcome: ' + user[0].firstname + ' ' + user[0].lastname, auth: true, token: token, user: user[0] })
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

router.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err)
      res.status(500).json({
        error: err
      })
    } else {
      res.status(200).json({
        message: 'User logged out'
      })
    }
  })
})

module.exports = router
