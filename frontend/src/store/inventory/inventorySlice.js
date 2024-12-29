import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import { extractErrorMessage } from 'src/utils/auth'
import inventoryService from './inventoryService'

const initialState = {
  inventoryItems: null,
  focusItem: null,
  createdItem: null,
  isLoading: false,
}

export const addInventoryItem = createAsyncThunk(
  'inventory/addInventoryItem',
  async (jobData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await inventoryService.addInventoryItem(token, jobData)
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getInventoryItems = createAsyncThunk(
  'inventory/getInventoryItems',
  async (companyId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await inventoryService.getInventoryItems(token, companyId)
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getInventoryItem = createAsyncThunk(
  'inventory/getInventoryItem',
  async (companyId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await inventoryService.getInventoryItem(token, companyId)
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const updateInventoryItem = createAsyncThunk(
  'inventory/updateInventoryItem',
  async (jobData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await inventoryService.updateInventoryItem(token, jobData)
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const deleteInventoryItem = createAsyncThunk(
  'inventory/deleteInventoryItem',
  async (jobId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await inventoryService.deleteInventoryItem(token, jobId)
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    clearInventoryItems(state) {
      state.inventoryItems = null
    },
    clearFocusItem(state) {
      state.focusItem = null
    },
    clearCreatedItem(state) {
      state.createdItem = null
    },
  },
  extraReducers: (builder) => {
    builder
      // add
      .addCase(addInventoryItem.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addInventoryItem.fulfilled, (state, action) => {
        state.isLoading = false
        state.createdItem = action.payload
        state.inventoryItems =
          state.inventoryItems !== null
            ? [...state.inventoryItems, action.payload]
            : [action.payload]
      })
      .addCase(addInventoryItem.rejected, (state) => {
        state.isLoading = false
        state.inventoryItems = null
      })
      // get items
      .addCase(getInventoryItems.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getInventoryItems.fulfilled, (state, action) => {
        state.isLoading = false
        state.inventoryItems = action.payload
      })
      .addCase(getInventoryItems.rejected, (state) => {
        state.isLoading = false
        state.inventoryItems = null
      })
      // get item
      .addCase(getInventoryItem.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getInventoryItem.fulfilled, (state, action) => {
        state.isLoading = false
        state.focusItem = action.payload
      })
      .addCase(getInventoryItem.rejected, (state) => {
        state.isLoading = false
        state.focusItem = null
      })
      // update job
      .addCase(updateInventoryItem.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateInventoryItem.fulfilled, (state, action) => {
        state.isLoading = false
        state.focusItem = action.payload
      })
      .addCase(updateInventoryItem.rejected, (state) => {
        state.isLoading = false
        state.focusItem = null
      })
      // delete job
      .addCase(deleteInventoryItem.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteInventoryItem.fulfilled, (state, action) => {
        state.isLoading = false
        state.focusItem = null
      })
      .addCase(deleteInventoryItem.rejected, (state) => {
        state.isLoading = false
        state.focusItem = null
      })
  },
})
export const { clearInventoryItems, clearCreatedItem, clearFocusItem } =
  inventorySlice.actions
export default inventorySlice.reducer
