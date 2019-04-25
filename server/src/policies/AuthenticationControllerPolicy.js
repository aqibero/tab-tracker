const { User } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const bcrypt = require('bcrypt')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

async function hashPassword (pwd) {
  const SALT_FACTOR = 12
  const result = await bcrypt.hash(pwd, SALT_FACTOR)
  .then(function (hash) {
    return hash
  })
  return result
}

module.exports = {
  async register (req, res) {
    try {
      req.body.password = await hashPassword(req.body.password)
      const user = await User.create(req.body)
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (error) {
      // e-mail already exists or such
      res.status(400).send({
        error: 'This email address is already in use'
      })
    }
  },
  async login (req, res) {
    try {
      // Grab user input
      const { email, password } = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })
      // Check to see if user is in db
      if (!user) {
        res.status(403).send({
          error: 'the login information was incorrect / Not Found'
        })
      }
      // Check to see if password is valid
      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }
      // return user using toJSON()
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (e) {
      res.status(500).send({ error: 'An error occured attempting to login' })
      console.log(e)
    }
  }
}
