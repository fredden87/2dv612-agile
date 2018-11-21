'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        enum: ['Admin', 'Employee', 'Park owner', 'Car owner'],
        required: true
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true }
})

module.exports = mongoose.model('User', userSchema);