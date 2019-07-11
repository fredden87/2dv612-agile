const express = require('express')
const router = express.Router()
const Typemodel = require('../db_resources/typemodel.js')
// uncomment relevant lines to switch into post mode when frontend is ready.
router.post('/typedata', (req, res, next) => {
  Typemodel.find((err, types) => {
    if (err) {
      res.status(500).json({
        message: 'unable to find any Customer Classes'
      })
    } else {
      res.status(200).send(types)
    }
  })
})
// router.get('/', (req, res, next) => {
router.post('/', (req, res, next) => {
  // need to control the API access somehow, currently admin checks are only on frontend
  if (true) {
    // if(req.body.name === 'admin' && req.body.password === 'secret' && req.body.type) { // TODO DO NOT STORE PASSWORD AND USERNAME HERE
    let input = req.body.cclass
    // let typedata=new typemodel({customerClass: req.body.type})
    let typedata = new Typemodel({ customerClass: input })
    Typemodel.find({ customerClass: input }).exec(function (err, docs) {
      if (err || docs.length !== 0) {
        res.status(400).json({
          message: 'Customer Class: ' + input + ' Already Exists'
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
  } else {
    res.status(401).json({
      message: 'Unauthorized'
    })
  }
})

module.exports = router
