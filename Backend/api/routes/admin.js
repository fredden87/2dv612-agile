const express = require('express')
const router = express.Router()
const typemodel = require('../db_resources/typemodel.js')
router.get('/', (req, res, next) => {
  // Temp test
  if (true) {
 // if (req.body.name === 'admin' && req.body.password === 'secret' && req.body.type) {
    res.status(200).json({
      message: 'pass'
    })
    const mongoose = require('mongoose')
    //you will need to have a PASS=mongoDBpassword environment variable to connect!
    mongoose.connect('mongodb+srv://team3:'+process.env.PASS+'@cluster0-xwlga.mongodb.net/team3', function(error){
    if(error){ 
        console.log(error)
      }
      typemodel.create({type:'test'},function(err){
        if(err){
          console.log("failed writing to db")
        }
        console.log("connection successful, type saved")
      })
    })
  } else {
    res.status(401).json({
      message: 'fail'
    })
    console.log('fail')
  }
})

module.exports = router
