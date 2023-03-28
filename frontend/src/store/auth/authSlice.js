import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import { extractErrorMessage } from 'src/utils/auth'
import authService from './authService'

// Get user from local storage
const user = JSON.parse(localStorage.getItem('sm-user'))

const initialState = {
  user: user ? user : null,
  createdUser: null,
  isLoading: false,
}

export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      return await authService.loginUser(userData)
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)
// Register new user in sign up and add user to company
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      return await authService.registerUser(userData)
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const logoutUser = createAction('auth/logout', () => {
  authService.logoutUser()
  return {}
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
      })
      // register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.user = null
      })
  },
})

export default authSlice.reducer
