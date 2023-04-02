const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const { generateToken, userHasPermissions } = require('../utils/auth')

const User = require('../models/userModel')

// @desc Register a new user
// @route /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, company, isAdmin } = req.body

  // role and isAdmin have defaults set
  if (!name || !email || !password) {
    res.status(400)
    throw new Error(
      `Please include -> ${!name ? 'name' : ''} ${!email ? 'email' : ''} ${
        !password ? 'password' : ''
      }`
    )
  }

  // Find if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const salt = await bcrypt.genSalt(10)

  const hashedPassword = await bcrypt.hash(password, salt)

  // create user
  const user = await User.create({
    name,
    email,
    company,
    password: hashedPassword,
    isAdmin: isAdmin ? isAdmin : false,
    role: role ? role : 'user',
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      role: user.role,
      company: user.company,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc Register a new user
// @route /api/users
// @access public
const updateUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, company, isAdmin, _id } = req.body

  // Find if user exists
  const userExists = await User.findById(_id)

  if (!userExists) {
    res.status(400)
    throw new Error('Can not locate user')
  }

  const tempUser = {
    name,
    email,
    isAdmin,
    role,
    company,
  }
  // Make sure there was a password sent and not empty string
  if (password && password.length) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    tempUser.password = hashedPassword
  }

  // update user
  const user = await User.findByIdAndUpdate(_id, tempUser, {
    new: true,
  })

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    role: user.role,
    company: user.company,
    token: generateToken(user._id),
  })
})
// @desc Login in a user
// @route /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  // If there is a user and the passwords match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isAdmin: user.isAdmin,
      company: user.company,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid credentials')
  }
})
// @desc DELETE  a user
// @route /api/users
// @access private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  const canDelete = userHasPermissions(req.user.role)

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }
  if (!canDelete) {
    res.status(404)
    throw new Error('You do not have the correct credentials to delete users.')
  }
  // delete the user
  await user.deleteOne()

  res.status(200).json({
    success: true,
    message: 'user deleted',
    memberId: req.params.id,
  })
})
// @desc Get current user
// @route /api/users/current-user
// @access private
const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  deleteUser,
  updateUser,
}
