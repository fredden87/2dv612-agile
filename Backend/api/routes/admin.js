const express = require('express')
const router = express.Router()
const typemodel = require('../db_resources/typemodel.js')
// uncomment relevant lines to switch into post mode when frontend is ready

router.get('/', (req, res, next) => {
// router.post('/', (req, res, next) => {  

  if (true) { 
  // if(req.body.name === 'admin' && req.body.password === 'secret' && req.body.type) { // TODO DO NOT STORE PASSWORD AND USERNAME HERE
    const mongoose = require('mongoose')
    //you will need to have a PASS=mongoDBpassword environment variable to connect!
    mongoose.connect('mongodb+srv://team3:'+process.env.PASS+'@cluster0-xwlga.mongodb.net/team3', { useNewUrlParser: true }, function(error){
    if(error){ 
        res.status(500).json({
          message: 'Unable to establish database connection'
        })
      }
      let input="ok"
      //let input=req.body.type

      //TODO  check if already present
      typemodel.create({type:input},function(err){
        if(err){
          res.status(500).json({
            message: 'unable to create database object'
          })
        }
        res.status(200).json({
          message: 'successfuly created type in database'
        })
      })
    })
  } else {
    res.status(401).json({
      message: 'fail'
    })
  }
})

module.exports = router
