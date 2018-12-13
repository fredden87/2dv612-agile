const express = require('express')
const mongoose = require('mongoose')
const Area = require('../db_resources/areamodel.js')
const MONGODB_URL = 'mongodb+srv://team3:' + process.env.PASS + '@cluster0-xwlga.mongodb.net/team3'
const router = express.Router()

router.patch('/', (req, res, next) => {
  connectDB(res)
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
          mongoose.connection.close()
          res.status(200).json({
            message: 'New Area added'
          })
        }).catch(err => {
          console.log(err)
          mongoose.connection.close()
          res.status(500).json({
            error: err
          })
        })
      } else {
        Area.update({ email: req.body.email, name: req.body.name }, { $set: { area: { long: req.body.long, lat: req.body.lat, timezones: req.body.timezones } } }, function (err, user) {
          if (err) {
            mongoose.connection.close()
            res.status(500).json({
              error: err
            })
          }
          mongoose.connection.close()
          res.status(200).json({
            message: 'Area updated'
          })
        })
      }
    })
    .catch(err => {
      mongoose.connection.close()
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
})

router.post('/', (req, res, next) => {
  connectDB(res)
  Area.find({ email: req.body.email })
    .exec()
    .then(area => {
      mongoose.connection.close()
      return res.status(200).send(area)
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
  Area.find({ email: req.body.email, name: req.body.name })
    .remove()
    .exec()
    .then(area => {
      console.log(area)
      mongoose.connection.close()
      return res.status(200).json({ message: JSON.stringify(req.body.name) + ' removed' })
    })
    .catch(err => {
      console.log(err)
      mongoose.connection.close()
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
