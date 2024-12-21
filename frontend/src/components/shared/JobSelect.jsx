import { TextField, Autocomplete, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from 'src/hooks/use-auth'
import { clearJobs, getJobs } from 'src/store/jobs/jobSlice'

function JobSelect({
  onChange,
  value,
  error,
  helperText,
  onBlur,
  selectedJobs = '',
  setSelectedJob = null,
  isEdit = false,
}) {
  const [newValue, setNewValue] = useState()

  const dispatch = useDispatch()
  const { user } = useAuth()
  const { jobs, isLoading } = useSelector((state) => state.jobs)

  useEffect(() => {
    if (jobs === null) fetchJobs()
    return () => dispatch(clearJobs())
  }, [])

  const fetchJobs = () => {
    dispatch(getJobs(user.company))
  }
  const handleChange = (newValue) => {
    onChange(newValue.value)
    // setInputValue(newValue.label)
    setNewValue(newValue)
    if (setSelectedJob) setSelectedJob(newValue.label)
  }

  return (
    <>
      {jobs && (
        <Autocomplete
          disablePortal
          name='customer'
          fullWidth
          value={newValue || value}
          onChange={(event, newValue) => {
            handleChange(newValue)
          }}
          // inputValue={inputValue}
          // onInputChange={(event, newInputValue) => {
          //   setInputValue(newInputValue)
          // }}
          options={jobs.map((job) => {
            return { value: job._id, label: job.jobTitle }
          })}
          getOptionLabel={(option) =>
            typeof option === 'string' ? selectedJobs : option.label
          }
          isOptionEqualToValue={(option, value) => option.value === value}
          renderInput={(params) => (
            <TextField
              {...params}
              name='customer'
              error={error}
              helperText={helperText || 'Search for jobs by typing job title'}
              onBlur={onBlur}
            />
          )}
          error={error}
          helperText={helperText}
          onBlur={onBlur}
        />
      )}
    </>
  )
}

export default JobSelect
