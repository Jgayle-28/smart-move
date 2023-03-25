const express = require('express')
const {
  registerUser,
  loginUser,
  getCurrentUser,
} = require('../controllers/userController')
const { protectRoute } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/current-user', protectRoute, getCurrentUser)

module.exports = router
