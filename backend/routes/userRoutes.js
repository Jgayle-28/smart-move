const express = require('express')
const {
  registerUser,
  loginUser,
  getCurrentUser,
  deleteUser,
  updateUser,
  forgotPassword,
  resetPassword,
} = require('../controllers/userController')
const { protectRoute } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', registerUser)
router.post('/login', loginUser)
router.delete('/:id', protectRoute, deleteUser)
router.put('/', protectRoute, updateUser)
router.get('/current-user', protectRoute, getCurrentUser)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)

module.exports = router
