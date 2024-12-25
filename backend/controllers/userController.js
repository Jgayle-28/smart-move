const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const { generateToken, userHasPermissions } = require('../utils/auth')
const crypto = require('crypto')
const nodemailer = require('nodemailer')

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
// @desc Password reset request
// @route /api/users/forgot-password
// @access public
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body
  console.log('email :>> ', email)
  console.log('process.env.EMAIL_USER :>> ', process.env.EMAIL_USER)
  console.log('process.env.EMAIL_PASSWORD :>> ', process.env.EMAIL_PASSWORD)

  const user = await User.findOne({ email })

  if (!user) {
    res.status(404)
    throw new Error('No user found with that email')
  }

  // Generate a reset token
  const resetToken = crypto.randomBytes(20).toString('hex')

  // Set the expiration time for the token (1 hour)
  const resetPasswordExpire = Date.now() + 3600000

  // Save token and expiration time to the user document
  user.resetPasswordToken = resetToken
  user.resetPasswordExpire = resetPasswordExpire
  await user.save()

  // Create a reset password URL (assuming your app's base URL is 'http://localhost:3000')
  const resetUrl = `http://localhost:3000/reset-password/${resetToken}`
  // `${window.location.origin}/reset-password/${resetToken}`

  // Send the reset password email (using Nodemailer)
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use the appropriate email service
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASSWORD, // Your email password
    },
  })
  console.log('transporter :>> ', transporter)

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset Request',
    text: `You requested a password reset. Please click the link to reset your password: ${resetUrl}`,
  }

  await transporter.sendMail(mailOptions)

  res.status(200).json({ message: 'Password reset link sent to email' })
})
// @desc Reset password
// @route /api/users/reset-password
// @access public
const resetPassword = asyncHandler(async (req, res) => {
  // Get the token from the URL parameter
  const { token } = req.params // <-- This should be from req.params.token

  const { password } = req.body // Password should still be in the request body

  // Find user by the reset token and check expiration
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpire: { $gt: Date.now() }, // Ensure the token is not expired
  })

  if (!user) {
    res.status(400)
    throw new Error(
      'Invalid or expired token, please request a new password reset'
    )
  }

  // Hash the new password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Update the user's password and clear the reset token
  user.password = hashedPassword
  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined

  await user.save()

  res.status(200).json({ message: 'Password has been successfully updated' })
})

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  deleteUser,
  updateUser,
  forgotPassword,
  resetPassword,
}
