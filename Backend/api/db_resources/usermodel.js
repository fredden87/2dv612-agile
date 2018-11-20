'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstname: { type: String },
    lastname: { type: String },
    role: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

module.exports = mongoose.model('User', userSchema);