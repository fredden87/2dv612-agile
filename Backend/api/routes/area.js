const express = require('express')
const mongoose = require('mongoose')
const Area = require('../db_resources/areamodel.js')
const router = express.Router()

router.patch('/', (req, res, next) => {
  Area.findOne({ email: req.body.email, name: req.body.name })
    .exec()
    .then(area => {
      if (!area) {
        const area = new Area({
          _id: new mongoose.Types.ObjectId(),
          email: req.body.email,
          name: req.body.name,
          area: { long: req.body.long, lat: req.body.lat, timezones: req.body.timezones }
        })
        area.save().then(data => {
          res.status(200).json({
            message: 'New Area added'
          })
        }).catch(err => {
          console.log(err)
          res.status(500).json({
            error: err
          })
        })
      } else {
        Area.update({ email: req.body.email, name: req.body.name }, { $set: { area: { long: req.body.long, lat: req.body.lat, timezones: req.body.timezones } } }, function (err, user) {
          if (err) {
            res.status(500).json({
              error: err
            })
          }
          res.status(200).json({
            message: 'Area updated'
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

router.post('/', (req, res, next) => {
  Area.find({ email: req.body.email })
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
router.post('/remove', (req, res, next) => {
  Area.find({ email: req.body.email, name: req.body.name })
    .remove()
    .exec()
    .then(area => {
      console.log(area)
      return res.status(200).json({ message: JSON.stringify(req.body.name) + ' removed' })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})

module.exports = router
