const express = require('express')
const router = express.Router()
const Messagemodel = require('../db_resources/messagemodel.js')

/**
 * Get the admin message.
 */
router.get('/', (req, res, next) => {})

/**
 * Set a new message. Empties `viewed_by` array.
 */
router.post('/', (req, res, next) => {})

/**
 * Updates `viewed_by` array.
 */
router.patch('/', (req, res, next) => {})

module.exports = router
