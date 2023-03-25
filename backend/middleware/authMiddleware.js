const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')

/**
 * Makes sure user is authenticated to perform critical actions
 */
const protectRoute = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]
      // Verify token
      const decodedTokens = jwt.verify(token, process.env.JWT_SECRET)
      // Get user from token
      req.user = await User.findById(decodedTokens.id).select('-password')
      next()
    } catch (error) {
      console.log(`error`)
      res.status(401)
      throw new Error(`Not authorized`)
    }
  }
  if (!token) {
    res.status(401)
    throw new Error(`Not authorized`)
  }
})

module.exports = { protectRoute }
