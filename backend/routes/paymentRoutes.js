const express = require('express')

const { protectRoute } = require('../middleware/authMiddleware')
const {
  processUserRegistrationPayment,
} = require('../controllers/paymentController')

const router = express.Router()

router.post('/register/:id', processUserRegistrationPayment)

module.exports = router
