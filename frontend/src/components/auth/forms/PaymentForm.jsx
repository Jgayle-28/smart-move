import { useSelector, useDispatch } from 'react-redux'
import { registerUser } from 'src/store/auth/authSlice'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { toast } from 'react-hot-toast'
import { useRouter } from 'src/hooks/use-router'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { PAYMENT_API_URL } from 'src/store/constants'
import { paths } from 'src/paths'
import axios from 'axios'

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#aab7c4',
      color: '#fff',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': { color: '#aab7c4' },
      '::placeholder': { color: '#aab7c4' },
    },
    invalid: {
      // iconColor: '#9e2146',
      // color: '#9e2146',
    },
  },
}

const PaymentForm = ({ creationCallback }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const stripe = useStripe()
  const elements = useElements()

  const { isLoading } = useSelector((state) => state.auth)
  const { company } = useSelector((state) => state.company)
  console.log('company :>> ', company)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) {
      return
    }
    try {
      // Get card data
      const cardElement = elements.getElement(CardElement)

      // Create payment method -> this is used on the backend to create a subscription & customer
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: company.companyName,
          phone: company.companyPhoneNumber,
          email: company.companyEmail,
        },
      })

      // Handle any errors from stripe
      if (error) {
        console.log('Payment method error ----->', error)
        toast.error(
          'Stripe: Payment method error, please verify the information you have entered is correct.'
        )
      } else {
        // Send payment method id to backend to create subscription and process payment
        const res = await axios.post(
          `${PAYMENT_API_URL}/register/${company._id}`,
          {
            paymentMethodId: paymentMethod.id,
            subscriptionLevel: 'Standard',
          }
        )

        console.log('res ----->', res)
        // If payment succeeded, redirect to dashboard
        if (res.status === 200) {
          toast.success(
            'Payment succeeded, you are now being redirected to your dashboard'
          )
          setTimeout(() => router.push(paths.dashboard.index), 700)
        } else {
          // Handle any errors from backend
          console.log('Payment failed')
        }
      }
    } catch (error) {
      console.log('error ---->', error)
      toast.error(`Payment processing error ${error.response.data.error}`)
    }
  }

  return (
    <>
      <div>
        <Stack sx={{ mb: 4 }} spacing={1}>
          <Typography variant='subtitle2' color='primary.main' sx={{ mb: 1 }}>
            Let's get you subscribed.
          </Typography>
          <Typography variant='h5'></Typography>
          <Stack direction='row' spacing={1} alignItems='center'>
            <Typography color='text.secondary' variant='body2'>
              All payments processed by
            </Typography>
            <Box
              alt='Stripe'
              component='img'
              src='/assets/stripe-logo.svg'
              sx={{
                height: 24,
                maxWidth: '100%',
              }}
            />
          </Stack>
          <Typography color='text.secondary' variant='body2'>
            No billing data is stored on our servers.
          </Typography>
        </Stack>
        <form noValidate onSubmit={handleSubmit}>
          <Card variant='outlined' sx={{ mb: 3 }}>
            <CardContent>
              <CardElement options={CARD_OPTIONS} />
            </CardContent>
          </Card>

          <LoadingButton
            loading={isLoading}
            loadingPosition='start'
            fullWidth
            size='large'
            sx={{ mt: 3 }}
            type='submit'
            variant='contained'
          >
            Get Started With Smart Move
          </LoadingButton>
        </form>
      </div>
    </>
  )
}

export default PaymentForm
