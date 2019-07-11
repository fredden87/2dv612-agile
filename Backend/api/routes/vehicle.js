const express = require('express')
const User = require('../db_resources/usermodel.js')
const router = express.Router()
const Area = require('../db_resources/areamodel.js')
router.patch('/', (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      console.log(req.body.email)
      if (checkDuplicates(user.vehicle, req.body.vehicle)) {
        user.vehicle.push(req.body.vehicle)
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
router.post('/park', (req, res, next) => {
  Area.find({})
    .exec()
    .then(area => {
      return res.status(200).send(area)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})
router.post('/', (req, res, next) => {
  User.find({ email: req.body.email })
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

router.post('/remove', (req, res, next) => {
  User.updateOne({ email: req.body.email }, { $pull: { vehicle: req.body.vehicle } }, (err) => {
    if (err) {
      console.log(err)
      res.status(500).json({
        error: err
      })
    } else {
      res.status(200).json({
        message: 'Vehicle removed'
      })
    }
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

module.exports = router
