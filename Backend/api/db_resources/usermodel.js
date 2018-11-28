const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstname: {
    type: String,
    required: true,
    match: /^[A-Za-z-]+$/,
    minlength: 3,
    maxlength: 20
  },
  lastname: {
    type: String,
    required: true,
    match: /^[A-Za-z-]+$/,
    minlength: 3,
    maxlength: 20
  },
  role: {
    type: String,
    // enum: ['Admin', 'Employee', 'Park owner', 'Car owner'],
    required: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: { type: String, required: true },
  vehicle: {
    type: String,
    uppercase: true,
    default: 'No registered vehicle'
  }
})

module.exports = mongoose.model('User', userSchema)
