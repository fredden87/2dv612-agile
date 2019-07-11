const express = require('express')
const router = express.Router()
const Messagemodel = require('../db_resources/messagemodel.js')

/**
 * Get the admin message.
 *
 * GET /message
 *
 * 200: Returns object like:
 *      {
 *        "viewed_by": [],
 *        "_id": "5c0eabcadbaa400b6cb86cc0",
 *        "stringId": "admin_message",
 *        "__v": 0,
 *        "message": "Tjolahopp, tjolahej, tjolahoppsan..."
 *      }
 *
 *
 *
 */
router.get('/', (req, res, next) => {
  Messagemodel.findOne({ stringId: 'admin_message' }, function (err, result) {
    if (err) {
      console.log(err)
    } else {
      res.status(200).json(result)
    }
  })
})

/**
 * Set a new message. Empties `viewed_by` array.
 *
 * POST /message
 * Takes JSON: { "message": "Your message here..." }
 *
 * 200: Success setting new message, clears viewed-by-list.
 *
 */
router.post('/', (req, res, next) => {
  // Updates the message in database, creates if not exists
  let query = { stringId: 'admin_message' }
  let update = { message: req.body.message, viewed_by: [], stringId: 'admin_message' }
  let options = { upsert: true, new: true, setDefaultsOnInsert: true }

  Messagemodel.findOneAndUpdate(query, update, options, function (err, response) {
    if (err) {
      console.log(err)
      res.status(400).json({ message: 'Message could not be updated!' })
    } else {
      res.status(200).json({ message: 'Message updated!' })
    }
  })
})

/**
 * Updates `viewed_by` array. Needs email to add to list.
 *
 * PATCH /message
 * Takes an email: { "email": "your@email.com" }
 *
 * 200: Added email to list.
 *
 */
router.patch('/', (req, res, next) => {
  Messagemodel.findOne({ stringId: 'admin_message' }, function (err, result) {
    if (err) {
      console.log(err)
    } else {
      result.save((err) => {
        if (err) {
          console.log(err)
        }
      })
    }
  })
    .then(data => {
      data.viewed_by.push(req.body.email)
      console.log(data)

      Messagemodel.findByIdAndUpdate(
        data._id,
        data,
        { new: true },
        (err, message) => {
          if (err) {
            return res.status(500).send(err)
          }
          return res.status(200).json(message)
        }
      )
    })
})

module.exports = router
