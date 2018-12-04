const express = require('express')
const mongoose = require('mongoose')
const User = require('../db_resources/usermodel.js')
const MONGODB_URL = 'mongodb+srv://team3:' + process.env.PASS + '@cluster0-xwlga.mongodb.net/team3'
const router = express.Router()

router.patch('/', (req, res, next) => {
  connectDB(res)
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (checkDuplicates(user.vehicle, req.body.car)) {
        user.vehicle.push(req.body.car)
        user.save()
        return res.status(200).json({
          message: 'New vehicle added'
        })
      } else {
        return res.status(500).json({
          message: 'Vehicle already exists'
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

function checkDuplicates (cars, car) {
  if (cars.length === 0) {
    return true
  }
  for (let i = 0; i < cars.length; i++) {
    if (cars[i] === car) {
      return false
    }
    return true
  }
}

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
