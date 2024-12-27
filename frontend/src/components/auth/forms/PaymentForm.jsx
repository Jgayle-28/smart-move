import { useSelector, useDispatch } from 'react-redux'
import { Box, Button, Stack, Typography } from '@mui/material'
import { toast } from 'react-hot-toast'
import { createStripeCheckoutSession } from 'src/store/payments/paymentSlice'

const PaymentForm = ({ creationCallback }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const handleStripeCheckoutClick = async (e) => {
    e.preventDefault()

    try {
      dispatch(createStripeCheckoutSession(user._id))
        .unwrap()
        .then((res) => {
          console.log('redirecting to stripe', res.data)
        })
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
          <Stack
            sx={{ paddingTop: 8 }}
            direction='column'
            spacing={1}
            alignItems='center'
          >
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

            <Button
              fullWidth
              variant='contained'
              onClick={handleStripeCheckoutClick}
              sx={{
                backgroundColor: '#635bff',
                color: '#fff',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#5146d9',
                },
              }}
            >
              Pay with Stripe
            </Button>
            {/* <Typography color='text.secondary' variant='body2'>
              No billing data is stored on our servers.
            </Typography> */}
          </Stack>
        </Stack>
      </div>
    </>
  )
}

export default PaymentForm
