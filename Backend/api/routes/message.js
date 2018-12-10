const express = require('express')
const router = express.Router()
const Messagemodel = require('../db_resources/messagemodel.js')

/**
 * Get the admin message.
 */
router.get('/', (req, res, next) => {
  res.status(200).json({message: 'hej'})
})

/**
 * Set a new message. Empties `viewed_by` array.
 */
router.post('/', (req, res, next) => {
  const mongoose = require('mongoose')

  console.log(req.body)

  mongoose.connect('mongodb+srv://team3:' + process.env.PASS + '@cluster0-xwlga.mongodb.net/team3', { useNewUrlParser: true }, function (error) {
    if (error) {
      res.status(500).json({
        message: 'Unable to establish database connection'
      })
    }
    // Updates the message in database, creates if not exists
    let query = {stringId: "admin_message"}
    let update = { message: req.body.message, viewed_by: [], stringId: 'admin_message' }
    let options = { upsert: true, new: true, setDefaultsOnInsert: true }

    Messagemodel.findOneAndUpdate(query, update, options, function (err, res) {
      if (err) {
        console.log(err)
      } else {
        console.log('Success')
      }
    })
  })
})

/**
 * Updates `viewed_by` array.
 */
router.patch('/', (req, res, next) => {})

module.exports = router
