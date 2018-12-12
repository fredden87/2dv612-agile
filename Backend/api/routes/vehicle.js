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
      if (checkDuplicates(user.vehicle, req.body.vehicle)) {
        user.vehicle.push(req.body.vehicle)
        user.save()
        mongoose.connection.close()
        return res.status(200).json({
          message: 'New vehicle added'
        })
      } else {
        mongoose.connection.close()
        return res.status(500).json({
          message: 'Vehicle already exists'
        })
      }
    })
    .catch(err => {
      console.log(err)
      mongoose.connection.close()
      res.status(500).json({
        error: err
      })
    })
})

router.post('/', (req, res, next) => {
  connectDB(res)
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      console.log(user)
      mongoose.connection.close()
      return res.status(200).send(user)
    })
    .catch(err => {
      console.log(err)
      mongoose.connection.close()
      res.status(500).json({
        error: err
      })
    })
})

router.post('/remove', (req, res, next) => {
  connectDB(res)
  User.updateOne({ email: req.body.email }, { $pull: { vehicle: req.body.vehicle } }, (err) => {
    if (err) {
      mongoose.connection.close()
      res.status(500).json({
        error: err
      })
    }
    mongoose.connection.close()
    res.status(200).json({
      message: 'Vehicle removed'
    })
  })
})

function checkDuplicates (cars, car) {
  if (cars.length === 0) {
    return true
  }
  for (let i = 0; i < cars.length; i++) {
    if (cars[i] === car.toUpperCase()) {
      return false
    }
  }
  return true
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
