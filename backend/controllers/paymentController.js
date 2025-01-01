// paymentController.js
const asyncHandler = require('express-async-handler')
const stripe = require('stripe')(
  process.env.NODE_ENV === 'development'
    ? process.env.DEV_STRIPE_SK_KEY
    : process.env.STRIPE_SK_KEY
)

const Company = require('../models/companyModel')
const User = require('../models/userModel')

const priceIds = {
  standard: {
    monthly: process.env.DEV_STANDARD_PLAN_ID,
    yearly: process.env.DEV_STANDARD_YEARLY_PLAN_ID,
  },
  // premium: {
  //   monthly: process.env.DEV_PREMIUM_PLAN_ID,
  //   yearly: process.env.DEV_PREMIUM_PLAN_YEARLY_ID,
  // },
  // Add more plans as needed
}

/**
 * @desc Create a Stripe Checkout Session for a user (subscription flow)
 * @route POST /api/payments/create-stripe-checkout-session
 * @access public
 */
const createStripeCheckoutSession = asyncHandler(async (req, res) => {
  const { userId, plan, isYearly } = req.body

  // Determine billing cycle
  const billingCycle = isYearly ? 'yearly' : 'monthly'

  // Validate plan and billing cycle
  if (!priceIds[plan] || !priceIds[plan][billingCycle]) {
    return res.status(400).json({ error: 'Invalid plan or billing cycle' })
  }

  const priceId = priceIds[plan][billingCycle]

  // Fetch the user from the database
  const user = await User.findById(userId)

  // Create a Stripe customer if not already created
  const customer = await stripe.customers.create({
    name: user.name,
    email: user.email,
    metadata: { userId: user._id.toString(), plan },
  })

  // Create a Checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: isYearly ? 'payment' : 'subscription',
    line_items: [
      {
        price: priceId, // Dynamically determined price ID
        quantity: 1,
      },
    ],
    customer: customer.id,
    success_url:
      'http://localhost:3000/payment-success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:3000/',
  })

  return res.json({ url: session.url })
})

/**
 * @desc Retrieve details of a Checkout Session & update user billing info
 * @route GET /api/payments/session/:sessionId
 * @access public (or protected, if you prefer)
 */
const retrieveCheckoutSession = asyncHandler(async (req, res) => {
  const { sessionId } = req.params

  try {
    // 1. Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    // 2. Retrieve the related customer
    //    We assume you created the customer with metadata containing userId
    //    e.g., metadata: { userId: user._id.toString() }
    const customer = await stripe.customers.retrieve(session.customer)

    // 3. Extract the userId from metadata
    const userId = customer.metadata?.userId
    if (!userId) {
      return res
        .status(400)
        .json({ error: 'No userId found in Stripe customer metadata' })
    }
    const userPlan = customer.metadata?.plan

    // 4. Retrieve the user from your database
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    user.subscriptionLevel = userPlan

    // 5. Update the user's billing info or any other fields you need
    user.billing = {
      subscriptionId: session.subscription,
      customerId: session.customer,
      paymentStatus: session.payment_status,
      // Add other relevant fields as needed
    }

    // Save the updated user
    await user.save()

    // Optionally, retrieve the subscription details too
    // const subscription = await stripe.subscriptions.retrieve(session.subscription);

    // Respond with session details and the updated user
    return res.status(200).json({
      sessionId: session.id,
      subscriptionId: session.subscription,
      customerId: session.customer,
      paymentStatus: session.payment_status,
      user,
      // subscription, // if you want to return the subscription object
    })
  } catch (error) {
    console.error('Error retrieving checkout session:', error)
    return res.status(500).json({ error: 'Error retrieving checkout session' })
  }
})

module.exports = {
  createStripeCheckoutSession,
  retrieveCheckoutSession,
}
