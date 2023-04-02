import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import { extractErrorMessage } from 'src/utils/auth'
import authService from '../auth/authService'
import companyService from './companyService'

// Get company from local storage
const company = JSON.parse(localStorage.getItem('sm-company'))

const initialState = {
  company: company ? company : null,
  createdCompany: null,
  team: null,
  editMember: null,
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

export const getCompanyTeam = createAsyncThunk(
  'company/getCompanyTeam',
  async (companyId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await companyService.getCompanyTeam(token, companyId)
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

export const deleteMember = createAsyncThunk(
  'auth/deleteMember',
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await authService.deleteMember(token, userId)
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const updateMember = createAsyncThunk(
  'auth/updateMember',
  async (memberData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await authService.updateMember(token, memberData)
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
    updateTeam(state, action) {
      state.team = [...state.team, action.payload]
    },
    clearTeam(state) {
      state.team = null
    },
    setEditMember(state, action) {
      state.editMember = action.payload
    },
    clearEditMember(state) {
      state.editMember = null
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
        state.company = null
      })
      // Get company team
      .addCase(getCompanyTeam.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCompanyTeam.fulfilled, (state, action) => {
        state.isLoading = false
        state.team = action.payload
      })
      .addCase(getCompanyTeam.rejected, (state) => {
        state.isLoading = false
        state.team = null
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
      // Delete company
      .addCase(deleteCompany.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCompany.fulfilled, (state) => {
        state.isLoading = false
        state.company = null
      })
      .addCase(deleteCompany.rejected, (state) => {
        state.isLoading = false
        state.user = null
      })
      // delete member
      .addCase(deleteMember.fulfilled, (state, action) => {
        state.team = state.team.filter(
          (member) => member._id !== action.payload
        )
        state.isLoading = false
      })
      .addCase(deleteMember.rejected, (state) => {
        state.isLoading = false
      })
      // update member

      .addCase(updateMember.fulfilled, (state, action) => {
        state.team = state.team.map((member) =>
          member._id === action.payload._id ? action.payload : member
        )
        state.isLoading = false
      })
      .addCase(updateMember.rejected, (state) => {
        state.isLoading = false
      })
  },
})
export const {
  updateTeam,
  clearTeam,
  clearCompany,
  setEditMember,
  clearEditMember,
} = companySlice.actions
export default companySlice.reducer
