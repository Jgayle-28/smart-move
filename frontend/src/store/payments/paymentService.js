import axios from 'axios'
import { getAxiosConfig } from 'src/utils/get-axios-config'
import { PAYMENT_API_URL } from '../constants'

// Create Stripe checkout session
const createStripeCheckoutSession = async (payload) => {
  const res = await axios.post(
    `${PAYMENT_API_URL}/create-stripe-checkout-session`,
    payload // Send the entire payload
  )

  return res.data
}

// Create Stripe checkout session
const getStripeSessionDetails = async (sessionId) => {
  const res = await axios.get(`${PAYMENT_API_URL}/session/${sessionId}`)

  if (res.data) {
    return res
    // localStorage.setItem('sm-company', JSON.stringify(res.data))
  }
}

const paymentService = {
  createStripeCheckoutSession,
  getStripeSessionDetails,
}

export default paymentService
