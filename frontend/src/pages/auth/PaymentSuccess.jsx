import { useDispatch } from 'react-redux'
import {
  Alert,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material'
import { Seo } from 'src/components/seo'
import { useRouter } from 'src/hooks/use-router'
import { useLocation } from 'react-router'
import { getStripeSessionDetails } from 'src/store/payments/paymentSlice'
import { useEffect, useState } from 'react'

const PaymentSuccess = () => {
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const sessionId = searchParams.get('session_id')
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    const fetchSessionDetails = async () => {
      if (sessionId) {
        try {
          dispatch(getStripeSessionDetails(sessionId))
            .unwrap()
            .then((res) => {
              console.log('Session details from backend:', res)
              if (res.data.payment_status === 'paid') {
                console.log('Payment succeeded')
              }
              setLoading(false)
              setTimeout(() => router.push('/dashboard'), 3000)
            })
        } catch (error) {
          console.error('Error fetching session details', error)
        }
      }
    }

    fetchSessionDetails()
  }, [sessionId])

  return (
    <>
      <Seo title='Payment Success' />
      <div>
        <Card elevation={16}>
          <CardHeader
            subheader={
              <Typography color='text.secondary' variant='body2'>
                Please wait while we update your account
              </Typography>
            }
            sx={{ pb: 0 }}
            title='Your payment was successful'
          />
          <CardContent>
            <Stack
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {loading ? (
                <CircularProgress />
              ) : (
                <Alert severity='success' sx={{ ml: 2 }}>
                  Your account has been successfully updated. You will be
                  redirected to your dashboard shortly.
                </Alert>
              )}
            </Stack>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default PaymentSuccess
