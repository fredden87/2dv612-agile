// uses bcrypt package for password encryption
// according to tutorial on https://www.youtube.com/watch?v=_EP2qCmLzSE

'use strict'
const express = require('express')
const router = express.Router()
const User = require('../db_resources/usermodel.js')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const MONGODB_URL = 'mongodb+srv://team3:' + process.env.PASS + '@cluster0-xwlga.mongodb.net/team3'
// this route is in /user/signup fix this in Register.vue reference if not intended
router.get('/signup', (req, res, next) => {
  res.render('signup', { title: 'Sign up' })
})

router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err
      })
    } else {
      mongoose.connect(MONGODB_URL, {
        autoReconnect: true,
        useNewUrlParser: true
      }).catch(err => {
        console.log('Mongo connection error', err)
        res.status(500).json({
          error: err
        })
      })

      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        role: req.body.role,
        email: req.body.email,
        password: hash
      })

      user.save().then(data => {
        console.log(data)
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
