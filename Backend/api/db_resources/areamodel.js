
'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const areaSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  area: {
    name: {
      type: String,
      required: true,
      unique: true
    },
    long: {
      type: Number,
      required: true
    },
    lat: {
      type: Number,
      required: true
    }
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  }
})

module.exports = mongoose.model('Area', areaSchema)
