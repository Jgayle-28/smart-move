import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import { extractErrorMessage } from 'src/utils/auth'
import customerService from './customerService'

const initialState = {
  customers: null,
  focusCustomer: null,
  createdCustomer: null,
  isLoading: false,
}

export const addCustomer = createAsyncThunk(
  'customers/addCustomer',
  async (customerData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await customerService.addCustomer(token, customerData)
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getCustomers = createAsyncThunk(
  'customers/getCustomers',
  async (companyId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await customerService.getCustomers(token, companyId)
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getCustomer = createAsyncThunk(
  'customers/getCustomer',
  async (customerId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await customerService.getCustomer(token, customerId)
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const updateCustomer = createAsyncThunk(
  'customers/updateCustomer',
  async (customerData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await customerService.updateCustomer(token, customerData)
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const deleteCustomer = createAsyncThunk(
  'customers/deleteCustomer',
  async (customerId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await customerService.deleteCustomer(token, customerId)
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    clearCustomers(state) {
      state.customers = null
    },
    clearFocusCustomer(state) {
      state.focusCustomer = null
    },
  },
  extraReducers: (builder) => {
    builder
      // add
      .addCase(addCustomer.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.isLoading = false
        state.customers =
          state.customers !== null
            ? [...state.customers, action.payload]
            : [action.payload]
      })
      .addCase(addCustomer.rejected, (state) => {
        state.isLoading = false
        state.customers = null
      })
      // get customers
      .addCase(getCustomers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.isLoading = false
        state.customers = action.payload
      })
      .addCase(getCustomers.rejected, (state) => {
        state.isLoading = false
        state.customers = null
      })
      // get customer
      .addCase(getCustomer.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCustomer.fulfilled, (state, action) => {
        state.isLoading = false
        state.focusCustomer = action.payload
      })
      .addCase(getCustomer.rejected, (state) => {
        state.isLoading = false
        state.focusCustomer = null
      })
      // update customer -> update customers array and focusCustomer
      .addCase(updateCustomer.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.isLoading = false
      })
      .addCase(updateCustomer.rejected, (state) => {
        state.isLoading = false
        state.focusCustomer = null
      })
      // delete customer -> update customers array and focusCustomer
      .addCase(deleteCustomer.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.isLoading = false
        state.focusCustomer = null
      })
      .addCase(deleteCustomer.rejected, (state) => {
        state.isLoading = false
        state.focusCustomer = null
      })
  },
})
export const { clearCustomers, clearFocusCustomer } = customerSlice.actions
export default customerSlice.reducer
