'use strict'
const mongoose = require('mongoose')
// const bcrypt = require('bcrypt-nodejs')
// const httpStatus = require('http-status')
// const APIError = require('../utils/APIError')
const Schema = mongoose.Schema


const userSchema = new Schema({
	first_name: {
		type: String
	},
	last_name: {
		type: String
	},
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 128
  },
  active: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    default: 'user',
    enum: roles
  },
  date: {
  	type: Date,
  	default: Date.now
  }
})

module.exports = mongoose.model('users', userSchema)