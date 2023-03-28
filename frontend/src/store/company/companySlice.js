import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import { extractErrorMessage } from 'src/utils/auth'
import companyService from './companyService'

// Get company from local storage
const company = JSON.parse(localStorage.getItem('sm-company'))

const initialState = {
  company: company ? company : null,
  createdCompany: null,
  isLoading: false,
}

export const registerCompany = createAsyncThunk(
  'company/registerCompany',
  async (companyData, thunkAPI) => {
    try {
      return await companyService.registerCompany(companyData)
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getCompany = createAsyncThunk(
  'company/getCompany',
  async (companyId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await companyService.getCompany(token, companyId)
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const updateCompany = createAsyncThunk(
  'company/updateCompany',
  async (companyData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await companyService.updateCompany(token, companyData)
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const deleteCompany = createAsyncThunk(
  'company/deleteCompany',
  async (companyId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await companyService.deleteCompany(token, companyId)
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    clearCompany(state) {
      state.company = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerCompany.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerCompany.fulfilled, (state, action) => {
        state.isLoading = false
        state.company = action.payload
      })
      .addCase(registerCompany.rejected, (state) => {
        state.isLoading = false
        state.user = null
      })
      // Get Company
      .addCase(getCompany.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCompany.fulfilled, (state, action) => {
        state.isLoading = false
        state.company = action.payload
      })
      .addCase(getCompany.rejected, (state) => {
        state.isLoading = false
        state.user = null
      })
      // Update
      .addCase(updateCompany.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.isLoading = false
        state.company = action.payload
      })
      .addCase(updateCompany.rejected, (state) => {
        state.isLoading = false
        state.user = null
      })
      // Delete
      .addCase(deleteCompany.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.isLoading = false
        state.company = null
      })
      .addCase(deleteCompany.rejected, (state) => {
        state.isLoading = false
        state.user = null
      })
  },
})

export default companySlice.reducer
