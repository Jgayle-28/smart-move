import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import { extractErrorMessage } from 'src/utils/auth'
import authService from '../auth/authService'
import paymentService from './paymentService'

// should I get or store anything in local storage

const initialState = {
  isLoading: false,
}
// Create stripe session
export const createStripeCheckoutSession = createAsyncThunk(
  'payments/createStripeCheckoutSession',
  async (userId, thunkAPI) => {
    console.log('userId in slice:>> ', userId)
    try {
      // 1. Call service to create a session
      const { url } = await paymentService.createStripeCheckoutSession(userId)
      // 2. Redirect user to Stripe
      window.open(url, '_blank', 'noopener,noreferrer')
      // 3. Return the URL or some status if you want
      return { url }
    } catch (error) {
      toast.error('Failed to create Stripe Checkout session')
      return thunkAPI.rejectWithValue(error.response?.data || error.message)
    }
  }
)
// Get session details
export const getStripeSessionDetails = createAsyncThunk(
  'payments/getStripeSessionDetails',
  async (sessionId, thunkAPI) => {
    try {
      const { data } = await paymentService.getStripeSessionDetails(sessionId)
      console.log('data :>> ', data)

      return { data }
    } catch (error) {
      toast.error('Failed to create Stripe Checkout session')
      return thunkAPI.rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // createStripeCheckoutSession
      .addCase(createStripeCheckoutSession.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createStripeCheckoutSession.fulfilled, (state, action) => {
        state.isLoading = false
        // You typically don’t store the session URL because you’re redirecting.
        // But you could store some data if you want.
      })
      .addCase(createStripeCheckoutSession.rejected, (state, action) => {
        state.isLoading = false
        // Optionally store the error somewhere
      })
  },
})
export const {} = paymentSlice.actions
export default paymentSlice.reducer
