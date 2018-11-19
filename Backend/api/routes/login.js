const express = require('express')
const router = express.Router()

router.post('/', (req, res, next) => {
  // Temp test
  if (req.body.name === 'admin' && req.body.password === 'secret') {
    res.status(200).json({
      message: 'pass'
    })
    console.log('pass')
  } else {
    res.status(401).json({
      message: 'fail'
    })
    console.log('fail')
  }
})

module.exports = router
