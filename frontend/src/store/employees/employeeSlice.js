import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import { extractErrorMessage } from 'src/utils/auth'
import employeeService from './employeeService'

const initialState = {
  employees: null,
  focusEmployee: null,
  createdEmployee: null,
  isLoading: false,
}

export const createEmployee = createAsyncThunk(
  'employees/createEmployee',
  async (employeeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await employeeService.createEmployee(token, employeeData)
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getEmployees = createAsyncThunk(
  'employees/getEmployees',
  async (companyId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await employeeService.getEmployees(token, companyId)
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getCurrentEmployee = createAsyncThunk(
  'employees/getCurrentEmployee',
  async (jobId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await employeeService.getCurrentEmployee(token, jobId)
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const updateEmployee = createAsyncThunk(
  'employees/updateEmployee',
  async (employeeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await employeeService.updateEmployee(token, employeeData)
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const deleteEmployee = createAsyncThunk(
  'jobs/deleteEmployee',
  async (jobId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await employeeService.deleteEmployee(token, jobId)
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    clearEmployees(state) {
      state.employees = null
    },
    clearFocusEmployee(state) {
      state.focusEmployee = null
    },
    clearCreatedEmployee(state) {
      state.createdEmployee = null
    },
  },
  extraReducers: (builder) => {
    builder
      // add
      .addCase(createEmployee.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.isLoading = false
        state.createdEmployee = action.payload
        state.employees =
          state.employees !== null
            ? [...state.employees, action.payload]
            : [action.payload]
      })
      .addCase(createEmployee.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(getEmployees.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.isLoading = false
        state.employees = action.payload
      })
      .addCase(getEmployees.rejected, (state) => {
        state.isLoading = false
        state.employees = null
      })
      .addCase(getCurrentEmployee.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCurrentEmployee.fulfilled, (state, action) => {
        state.isLoading = false
        state.focusEmployee = action.payload
      })
      .addCase(getCurrentEmployee.rejected, (state) => {
        state.isLoading = false
        state.focusEmployee = null
      })
      .addCase(updateEmployee.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.isLoading = false
        state.focusEmployee = action.payload
      })
      .addCase(updateEmployee.rejected, (state) => {
        state.isLoading = false
        state.focusEmployee = null
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.isLoading = false
        state.focusEmployee = null
      })
      .addCase(deleteEmployee.rejected, (state) => {
        state.isLoading = false
        state.focusEmployee = null
      })
  },
})
export const { clearEmployees, clearFocusEmployee, clearCreatedEmployee } =
  employeeSlice.actions
export default employeeSlice.reducer
