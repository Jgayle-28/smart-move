const asyncHandler = require('express-async-handler')
const stripe = require('stripe')(
  process.env.NODE_ENV === 'development'
    ? process.env.DEV_STRIPE_SK_KEY
    : process.env.STRIPE_SK_KEY
)

const Company = require('../models/companyModel')

// @desc Process a payment for a new user
// @route /api/payments/register/:id
// @access public
const processUserRegistrationPayment = asyncHandler(async (req, res) => {
  const { paymentMethodId, subscriptionLevel } = req.body

  try {
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId)

    const customer = await stripe.customers.create({
      payment_method: paymentMethodId,
      email: paymentMethod.billing_details.email,
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    })

    // TODO-> need add correct priceId based on subscriptionLevel
    const priceId = process.env.DEV_STANDARD_PLAN_ID

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      default_payment_method: paymentMethodId,
    })

    // Update the company's subscription level and isCurrent
    const company = await Company.findById(req.params.id)
    // Make sure the company is found
    if (!company) {
      res.status(404)
      throw new Error('Company not found')
    }

    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      { ...company, subscription: subscriptionLevel, isCurrent: true },
      {
        new: true,
      }
    )
    //  Payment & Company update succeeded
    res.status(200).json({ subscription, updatedCompany })
  } catch (error) {
    // Payment failed
    console.error('Error creating subscription ------>', error)
    if (error.type === 'StripeCardError') {
      // Handle specific card errors
      res.status(400).json({ error: error.message })
    } else {
      // Handle other types of errors
      res
        .status(500)
        .json({ error: 'An error occurred while processing the payment.' })
    }
  }
})

module.exports = {
  processUserRegistrationPayment,
}
