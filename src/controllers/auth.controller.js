'use strict'

const config = require('../config')
const uuidv1 = require('uuidv1')
const bcrypt = require('bcrypt-nodejs')
const httpStatus = require('http-status')
const jwt = require('jsonwebtoken')
const user = require('../models/user.model')

exports.register = async (req, res, next) => {
  try {
    const activationKey = uuidv1()
    const pwd = bcrypt.hashSync(req.body.password)

    // Proceesing and making data object 
    const details = {
      email : req.body.email,
      name : req.body.name,
      password : pwd,
      activation_key : activationKey
    }

  	// user should be added to the database
    await user.registering(details, (err) => {
      // user successfully registered
      if (!err) {
        return res.status(httpStatus.CREATED).json({msg : `${details.email} was successfully registered!`})
      } else {
        // User is already there
        if(err == "ER_DUP_ENTRY")
          return res.status(httpStatus.CONFLICT).json({Error: 'Email already taken'})
        // Internal server error
        else
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Error: err})
      }
    })    
  } catch (err) {
  	next(err)
  }
}


exports.login = async (req, res, next) => {
  try {
    // Find the user if exist
    await user.findUser(req.body.email, (err, result) => {
      // There could be an internal server error
      if(err){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({Error: err})
      } else {
        // Requested user is not in the database
        if(result.length == 0) {
          return res.status(httpStatus.UNAUTHORIZED).json({Error : `${req.body.email} is not a user`})
        } else {
          // password missmatch
          if(!bcrypt.compareSync(req.body.password, result[0].Password)) {
            return res.status(httpStatus.UNAUTHORIZED).json({Error : `email/password missmatch`})
            // user/password are correct
          } else {
            const payload = {sub: result[0].ID}
            const token = jwt.sign(payload, config.secret)
            return res.status(httpStatus.OK).json({ token: token, name: result[0].Name, role: result[0].Role })
          }
        }
      }
    })

  } catch (err) {
  	console.log('yata catch eke')
    next(err)
  }
}