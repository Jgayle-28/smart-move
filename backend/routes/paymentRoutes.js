// paymentRoutes.js
const express = require('express')
const {
  createStripeCheckoutSession,
  retrieveCheckoutSession,
} = require('../controllers/paymentController')

const router = express.Router()

router.post('/create-stripe-checkout-session', createStripeCheckoutSession)
router.get('/session/:sessionId', retrieveCheckoutSession)

module.exports = router
