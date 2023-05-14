import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import { extractErrorMessage } from 'src/utils/auth'
import estimateService from './estimateService'

const initialState = {
  estimates: null,
  focusEstimate: null,
  tempInventory: [],
  moveCharges: null,
  packing: null,
  additionalServices: null,
  storage: null,
  fees: null,
  totalWeight: null,
  totalVolume: null,
  totalItemCount: null,
  createdEstimate: null,
  isLoading: false,
}

export const addEstimate = createAsyncThunk(
  'estimates/addEstimate',
  async (estimateData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await estimateService.addEstimate(token, estimateData)
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getEstimates = createAsyncThunk(
  'estimates/getEstimates',
  async (companyId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await estimateService.getEstimates(token, companyId)
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getEstimate = createAsyncThunk(
  'estimates/getEstimate',
  async (estimateId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await estimateService.getEstimate(token, estimateId)
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const updateEstimate = createAsyncThunk(
  'estimates/updateEstimate',
  async (estimateData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await estimateService.updateEstimate(token, estimateData)
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const deleteEstimate = createAsyncThunk(
  'estimates/deleteEstimate',
  async (estimateId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await estimateService.deleteEstimate(token, estimateId)
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const estimateSlice = createSlice({
  name: 'estimates',
  initialState,
  reducers: {
    updateTempInventory(state, action) {
      state.tempInventory = action.payload
    },
    updateTotals(state, action) {
      state.totalWeight = action.payload.totalWeight
      state.totalVolume = action.payload.totalVolume
      state.totalItemCount = action.payload.totalItemCount
    },
    updateMoveCharges(state, action) {
      state.moveCharges = action.payload
    },
    updatePacking(state, action) {
      state.packing = action.payload
    },
    updateAdditionalServices(state, action) {
      state.additionalServices = action.payload
    },
    updateStorage(state, action) {
      state.storage = action.payload
    },
    updateFees(state, action) {
      state.fees = action.payload
    },
    clearServices(state) {
      state.focusEstimate = null
      state.tempInventory = null
      state.moveCharges = null
      state.packing = null
      state.additionalServices = null
      state.storage = null
      state.fees = null
      state.totalWeight = null
      state.totalVolume = null
      state.totalItemCount = null
    },
  },
  extraReducers: (builder) => {
    builder
      // add
      .addCase(addEstimate.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addEstimate.fulfilled, (state, action) => {
        state.isLoading = false
        state.createdJob = action.payload
        state.jobs =
          state.jobs !== null
            ? [...state.jobs, action.payload]
            : [action.payload]
      })
      .addCase(addEstimate.rejected, (state) => {
        state.isLoading = false
        state.jobs = null
      })
      // get jobs
      .addCase(getEstimates.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getEstimates.fulfilled, (state, action) => {
        state.isLoading = false
        state.jobs = action.payload
      })
      .addCase(getEstimates.rejected, (state) => {
        state.isLoading = false
        state.jobs = null
      })
      // get job
      .addCase(getEstimate.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getEstimate.fulfilled, (state, action) => {
        state.isLoading = false
        state.focusJob = action.payload
      })
      .addCase(getEstimate.rejected, (state) => {
        state.isLoading = false
        state.focusJob = null
      })
      // update job -> update jobs array and focusCustomer
      .addCase(updateEstimate.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateEstimate.fulfilled, (state, action) => {
        state.isLoading = false
        state.focusJob = action.payload
      })
      .addCase(updateEstimate.rejected, (state) => {
        state.isLoading = false
        state.focusJob = null
      })
      // delete job -> update jobs array and focusJob
      .addCase(deleteEstimate.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteEstimate.fulfilled, (state, action) => {
        state.isLoading = false
        state.focusJob = null
      })
      .addCase(deleteEstimate.rejected, (state) => {
        state.isLoading = false
        state.focusJob = null
      })
  },
})
export const {
  updateTempInventory,
  updateMoveCharges,
  updatePacking,
  updateAdditionalServices,
  updateStorage,
  updateFees,
  clearServices,
  updateTotals,
  clearTempInventory,
  clearFocusEstimate,
  clearCreatedEstimate,
} = estimateSlice.actions
export default estimateSlice.reducer
