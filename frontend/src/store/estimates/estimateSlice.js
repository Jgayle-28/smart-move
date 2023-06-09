import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import { extractErrorMessage } from 'src/utils/auth'
import estimateService from './estimateService'

const initialState = {
  estimates: null,
  focusEstimate: null,
  invoiceId: null,
  tempInventory: [],
  moveCharges: null,
  packing: null,
  additionalServices: null,
  storage: null,
  fees: null,
  totalWeight: null,
  totalVolume: null,
  totalItemCount: null,
  totalCharges: null,
  currentWeekEstimates: null,
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

export const getCurrentWeekEstimates = createAsyncThunk(
  'estimates/getCurrentWeekEstimates',
  async (companyId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await estimateService.getCurrentWeekEstimates(token, companyId)
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
    clearEstimate(state) {
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
    clearEstimates(state) {
      state.estimates = null
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
        state.focusEstimate = action.payload
      })
      .addCase(addEstimate.rejected, (state) => {
        state.isLoading = false
        state.focusEstimate = null
      })
      // get estimates
      .addCase(getEstimates.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getEstimates.fulfilled, (state, action) => {
        state.isLoading = false
        state.estimates = action.payload
      })
      .addCase(getEstimates.rejected, (state) => {
        state.isLoading = false
        state.estimates = null
      })
      // get current week estimates
      .addCase(getCurrentWeekEstimates.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCurrentWeekEstimates.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentWeekEstimates = action.payload
      })
      .addCase(getCurrentWeekEstimates.rejected, (state) => {
        state.isLoading = false
        state.currentWeekEstimates = null
      })
      // get estimate
      .addCase(getEstimate.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getEstimate.fulfilled, (state, action) => {
        state.isLoading = false
        state.focusEstimate = action.payload
        state.invoiceId = action.payload.invoiceId
        state.tempInventory = action.payload.inventory
        state.moveCharges = action.payload.moveCharges
        state.packing = action.payload.packing || null
        state.additionalServices = action.payload.additionalServices || null
        state.storage = action.payload.storage || null
        state.fees = action.payload.fees || null
        state.totalWeight = action.payload.totalWeight
        state.totalVolume = action.payload.totalVolume
        state.totalItemCount = action.payload.totalItemCount
        state.totalCharges = action.payload.totalCharges
      })
      .addCase(getEstimate.rejected, (state) => {
        state.isLoading = false
        state.focusEstimate = null
        state.invoiceId = null
        state.tempInventory = []
        state.moveCharges = null
        state.packing = null
        state.additionalServices = null
        state.storage = null
        state.fees = null
        state.totalWeight = null
        state.totalVolume = null
        state.totalItemCount = null
      })
      // update estimate
      .addCase(updateEstimate.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateEstimate.fulfilled, (state, action) => {
        state.isLoading = false
        state.focusEstimate = action.payload
        state.invoiceId = action.payload.invoiceId
        state.tempInventory = action.payload.inventory
        state.moveCharges = action.payload.moveCharges
        state.packing = action.payload.packing || null
        state.additionalServices = action.payload.additionalServices || null
        state.storage = action.payload.storage || null
        state.fees = action.payload.fees || null
        state.totalWeight = action.payload.totalWeight
        state.totalVolume = action.payload.totalVolume
        state.totalItemCount = action.payload.totalItemCount
        state.totalCharges = action.payload.totalCharges
      })
      .addCase(updateEstimate.rejected, (state) => {
        state.isLoading = false
        state.focusEstimate = null
      })
      // delete estimate
      .addCase(deleteEstimate.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteEstimate.fulfilled, (state, action) => {
        state.isLoading = false
        state.focusEstimate = null
      })
      .addCase(deleteEstimate.rejected, (state) => {
        state.isLoading = false
        state.focusEstimate = null
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
  clearEstimate,
  updateTotals,
  clearTempInventory,
  clearFocusEstimate,
  clearEstimates,
} = estimateSlice.actions
export default estimateSlice.reducer
