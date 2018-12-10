
'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const areaSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  area: {
    long: {
      type: Number,
      required: true
    },
    lat: {
      type: Number,
      required: true
    },
    timezones: {
      0: {
        type: Number,
        required: true,
        default: 0
      },
      1: {
        type: Number,
        required: true,
        default: 0
      },
      2: {
        type: Number,
        required: true,
        default: 0
      },
      3: {
        type: Number,
        required: true,
        default: 0
      },
      4: {
        type: Number,
        required: true,
        default: 0
      },
      5: {
        type: Number,
        required: true,
        default: 0
      },
      6: {
        type: Number,
        required: true,
        default: 0
      },
      7: {
        type: Number,
        required: true,
        default: 0
      },
      8: {
        type: Number,
        required: true,
        default: 0
      },
      9: {
        type: Number,
        required: true,
        default: 0
      },
      10: {
        type: Number,
        required: true,
        default: 0
      },
      11: {
        type: Number,
        required: true,
        default: 0
      },
      12: {
        type: Number,
        required: true,
        default: 0
      },
      13: {
        type: Number,
        required: true,
        default: 0
      },
      14: {
        type: Number,
        required: true,
        default: 0
      },
      15: {
        type: Number,
        required: true,
        default: 0
      },
      16: {
        type: Number,
        required: true,
        default: 0
      },
      17: {
        type: Number,
        required: true,
        default: 0
      },
      18: {
        type: Number,
        required: true,
        default: 0
      },
      19: {
        type: Number,
        required: true,
        default: 0
      },
      20: {
        type: Number,
        required: true,
        default: 0
      },
      21: {
        type: Number,
        required: true,
        default: 0
      },
      22: {
        type: Number,
        required: true,
        default: 0
      },
      23: {
        type: Number,
        required: true,
        default: 0
      }

    }
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true
  }
})

module.exports = mongoose.model('Area', areaSchema)
