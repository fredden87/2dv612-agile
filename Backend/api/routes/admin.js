const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  // Temp test
  if (true) {
    res.status(200).json({
      message: 'pass'
    })
    const mongoose = require('mongoose')
    //you will need to have a PASS=mongoDBpassword environment variable to connect!
    mongoose.connect('mongodb+srv://team3:'+process.env.PASS+'@cluster0-xwlga.mongodb.net/admin', function(error){
      if(error){ console.log(error)}
      
              console.log("connection successful")
    })

  } else {
    res.status(401).json({
      message: 'fail'
    })
    console.log('fail')
  }
})

module.exports = router
