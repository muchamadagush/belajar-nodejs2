const jwt = require('jsonwebtoken')

const AuthenticationSuperAdmin = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    return res.status(401).json({})
  }

  jwt.verify(token.split(' ')[1], 'bvhjgkasdfbkjhbd87698231y98jksdbc', (err, decoded) => {
    if (err) {
      throw new Error(err.message)
    }

    req.decoded = decoded
    next()
  })
}

const Authentication = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    return res.status(401).json({})
  }

  jwt.verify(token.split(' ')[1], 'bvhjgkasdfbkjhbd87698231y98jksdbc', (err, decoded) => {
    if (err) {
      throw new Error(err.message)
    }

    req.decoded = decoded
    next()
  })
}

module.exports = { Authentication }
