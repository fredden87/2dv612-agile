const express = require('express')
const router = express.Router()
const typemodel = require('../db_resources/typemodel.js')
// uncomment relevant lines to switch into post mode when frontend is ready.
router.get('/typedata', (req, res, next) => {
  typemodel.find((err, types) => {
    if (err) {
      res.status(500).json({
        message: 'unable to find any Customer Classes'
      })
    } else {
      res.status(200).send(types)
    }
  })
})
router.get('/', (req, res, next) => {
  // router.post('/', (req, res, next) => {

  if (true) {
    // if(req.body.name === 'admin' && req.body.password === 'secret' && req.body.type) { // TODO DO NOT STORE PASSWORD AND USERNAME HERE
    const mongoose = require('mongoose')
    // you will need to have a PASS=mongoDBpassword environment variable to connect!
    mongoose.connect('mongodb+srv://team3:' + process.env.PASS + '@cluster0-xwlga.mongodb.net/team3', { useNewUrlParser: true }, function (error) {
      if (error) {
        res.status(500).json({
          message: 'Unable to establish database connection'
        })
      }
      let input = 'Admin'
      // let typedata=new typemodel({customerClass: req.body.type})
      let typedata = new typemodel({ customerClass: input })
      typemodel.find({ customerClass: input }).exec(function (err, docs) {
        if (err || docs.length !== 0) {
          res.status(400).json({
            message: 'Customer Class Already Exists'
          })
        } else {
          console.log(docs.length)

          typedata.save(function (err) {
            if (err) {
              res.status(500).json({
                message: 'unable to create database object'
              })
            } else {
              res.status(200).json({
                message: 'saved new Customer Class: ' + input
              })
            }
          })
        }
      })
    })
  } else {
    res.status(401).json({
      message: 'Unauthorized'
    })
  }
})

module.exports = router
