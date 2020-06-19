'use strict'

const config = require('../config')
const uuidv1 = require('uuidv1')

exports.register = async (req, res, next) => {
  try {
    const activationKey = uuidv1()
    const body = req.body
    body.activationKey = activationKey
    									// user should be added to the database
    res.status(200).send({body})

  } catch (err) {
  	// return next(User.checkDuplicateEmailError(error))
    console.log(`Error in registering : ${err}`)
    res.status(304).send({wrr})
  }
}

exports.login = async (req, res, next) => {
  try {

    // console.log(req.body);
    // const user = await User.findAndGenerateToken(req.body)
    										// find if the user is exists
    										// for now
    // 										const user = {
    // 											id : req.body.email
    // 										}
    // const payload = {sub: user.id}
    // const token = jwt.sign(payload, config.secret)
    // res.json({ message: 'OK', token: token, name: user.name, role: user.role })
    ress.send({msg:'OK', tell:'I am here'})
    console.log('uda try eke')
  } catch (error) {
  	console.log('yata catch eke')
    next(error)
  }
}