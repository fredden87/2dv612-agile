const express = require('express')
const mongoose = require('mongoose')
const User = require('../db_resources/usermodel.js')
const MONGODB_URL = 'mongodb+srv://team3:' + process.env.PASS + '@cluster0-xwlga.mongodb.net/team3'
const router = express.Router()

router.patch('/', (req, res, next) => {
  connectDB(res)
  User.update({ email: req.body.email }, { $push: { âreas: { name: req.body.name, long: req.body.long, lat: req.body.lat } } }, function (err, user) {
    if (err) {
      res.status(500).json({
        error: err
      })
    }
    res.status(200).json({
      message: 'New Area added'
    })
  })

  // User.findOne({ email: req.body.email })
  //   .exec()
  //   .then(user => {
  //     user.area.long = req.body.long
  //     user.area.lat = req.body.lat
  //     user.save()
  //     return res.status(200).json({
  //       message: 'New area added'
  //     })
  //   })
  //   .catch(err => {
  //     console.log(err)
  //     res.status(500).json({
  //       error: err
  //     })
  //   })
})

router.post('/', (req, res, next) => {
  connectDB(res)
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      return res.status(200).send(user.areas)
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

module.exports = router
