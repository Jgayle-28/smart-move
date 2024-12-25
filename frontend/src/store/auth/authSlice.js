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
// Register new user in sign up and add user to company
export const createUser = createAsyncThunk(
  'auth/createUser',
  async (userData, thunkAPI) => {
    try {
      return await authService.createUser(userData)
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await authService.updateUser(token, userData)
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Forgot Password Action
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email, thunkAPI) => {
    try {
      return await authService.forgotPassword(email)
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Reset Password Action
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, password }, thunkAPI) => {
    try {
      return await authService.resetPassword(token, password)
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Confirm Code Action (if you have a confirmation code or other validation)
export const confirmCode = createAsyncThunk(
  'auth/confirmCode',
  async ({ token, code }, thunkAPI) => {
    try {
      return await authService.confirmCode(token, code)
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
    clearCreatedUser: (state) => {
      state.createdUser = null
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
      // update
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.user = {
          _id: state.user._id,
          name: payload.name,
          email: payload.email,
          role: payload.role,
          isAdmin: payload.isAdmin,
          company: payload.company,
          token: state.user.token,
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false
        state.user = null
      })
      // create
      // .addCase(createUser.pending, (state) => {
      //   state.isLoading = true
      // })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.createdUser = action.payload
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false
        state.user = null
      })
      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false
        toast.success('Password reset link sent to your email')
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false
      })
      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false
        toast.success('Password successfully reset')
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false
      })
      // Confirm Code
      .addCase(confirmCode.pending, (state) => {
        state.isLoading = true
      })
      .addCase(confirmCode.fulfilled, (state, action) => {
        state.isLoading = false
        toast.success('Code confirmed successfully')
      })
      .addCase(confirmCode.rejected, (state, action) => {
        state.isLoading = false
      })
  },
})
export const { clearCreatedUser } = authSlice.actions
export default authSlice.reducer
