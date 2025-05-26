import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import { extractErrorMessage } from 'src/utils/auth'
import jobService from './jobService'

const initialState = {
  jobs: null,
  currentWeekJobs: null,
  focusJob: null,
  createdJob: null,
  isLoading: false,
}

export const addJob = createAsyncThunk(
  'jobs/addJob',
  async (jobData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await jobService.addJob(token, jobData)
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getJobs = createAsyncThunk(
  'jobs/getJobs',
  async (companyId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await jobService.getJobs(token, companyId)
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getAnnualJobs = createAsyncThunk(
  'jobs/getAnnualJobs',
  async (companyId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await jobService.getAnnualJobs(token, companyId)
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getCurrentWeekJobs = createAsyncThunk(
  'jobs/getCurrentWeekJobs',
  async (companyId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await jobService.getCurrentWeekJobs(token, companyId)
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getJob = createAsyncThunk(
  'jobs/getJob',
  async (jobId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await jobService.getJob(token, jobId)
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const updateJob = createAsyncThunk(
  'jobs/updateJob',
  async (jobData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await jobService.updateJob(token, jobData)
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const deleteJob = createAsyncThunk(
  'jobs/deleteJob',
  async (jobId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await jobService.deleteJob(token, jobId)
    } catch (error) {
      const message = extractErrorMessage(error)
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    clearJobs(state) {
      state.jobs = null
    },
    clearFocusJob(state) {
      state.focusJob = null
    },
    clearCreatedJob(state) {
      state.createdJob = null
    },
  },
  extraReducers: (builder) => {
    builder
      // add
      .addCase(addJob.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addJob.fulfilled, (state, action) => {
        state.isLoading = false
        state.createdJob = action.payload
        state.jobs =
          state.jobs !== null
            ? [...state.jobs, action.payload]
            : [action.payload]
      })
      .addCase(addJob.rejected, (state) => {
        state.isLoading = false
      })
      // get jobs
      .addCase(getJobs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        state.isLoading = false
        state.jobs = action.payload.map((job) => {
          return {
            ...job,
            customerPhone: job.customer.customerPhoneNumber, // Added for data grid
          }
        })
      })
      .addCase(getJobs.rejected, (state) => {
        state.isLoading = false
        state.jobs = null
      })
      // get current week jobs
      .addCase(getCurrentWeekJobs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCurrentWeekJobs.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentWeekJobs = action.payload
      })
      .addCase(getCurrentWeekJobs.rejected, (state) => {
        state.isLoading = false
        state.currentWeekJobs = null
      })
      // get annual jobs
      .addCase(getAnnualJobs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAnnualJobs.fulfilled, (state, action) => {
        state.isLoading = false
        state.annualJobs = action.payload
      })
      .addCase(getAnnualJobs.rejected, (state) => {
        state.isLoading = false
        state.annualJobs = null
      })
      // get job
      .addCase(getJob.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getJob.fulfilled, (state, action) => {
        state.isLoading = false
        state.focusJob = action.payload
      })
      .addCase(getJob.rejected, (state) => {
        state.isLoading = false
        state.focusJob = null
      })
      // update job -> update jobs array and focusCustomer
      .addCase(updateJob.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.isLoading = false
        state.focusJob = action.payload
      })
      .addCase(updateJob.rejected, (state) => {
        state.isLoading = false
        state.focusJob = null
      })
      // delete job -> update jobs array and focusJob
      .addCase(deleteJob.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.isLoading = false
        state.focusJob = null
      })
      .addCase(deleteJob.rejected, (state) => {
        state.isLoading = false
        state.focusJob = null
      })
  },
})
export const { clearJobs, clearFocusJob, clearCreatedJob } = jobSlice.actions
export default jobSlice.reducer
