import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import { extractErrorMessage } from 'src/utils/auth'
import customerService from './customerService'

const initialState = {
  customers: null,
  focusCustomer: null,
  customerJobs: null,
  customerEstimates: null,
  createdCustomer: null,
  currentWeekCustomers: null,
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

export const getCurrentWeekCustomers = createAsyncThunk(
  'customers/getCurrentWeekCustomers',
  async (companyId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await customerService.getCurrentWeekCustomers(token, companyId)
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

export const getCustomerJobs = createAsyncThunk(
  'customers/getCustomerJobs',
  async (customerId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await customerService.getCustomerJobs(token, customerId)
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getCustomerEstimates = createAsyncThunk(
  'customers/getCustomerEstimates',
  async (customerId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await customerService.getCustomerEstimates(token, customerId)
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
    clearCustomer(state) {
      state.focusCustomer = null
      state.customerJobs = null
      state.customerEstimates = null
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
            ? [...state.customers, action.payload.customer]
            : [action.payload.customer]
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
      // get current week customers
      .addCase(getCurrentWeekCustomers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCurrentWeekCustomers.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentWeekCustomers = action.payload
      })
      .addCase(getCurrentWeekCustomers.rejected, (state) => {
        state.isLoading = false
        state.currentWeekCustomers = null
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
      // get customer jobs
      .addCase(getCustomerJobs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCustomerJobs.fulfilled, (state, action) => {
        state.isLoading = false
        state.customerJobs = action.payload
      })
      .addCase(getCustomerJobs.rejected, (state) => {
        state.isLoading = false
        state.customerJobs = null
      })
      // get customer estimates
      .addCase(getCustomerEstimates.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCustomerEstimates.fulfilled, (state, action) => {
        state.isLoading = false
        state.customerEstimates = action.payload
      })
      .addCase(getCustomerEstimates.rejected, (state) => {
        state.isLoading = false
        state.customerEstimates = null
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
export const { clearCustomers, clearCustomer } = customerSlice.actions
export default customerSlice.reducer
