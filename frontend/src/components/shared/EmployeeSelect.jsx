import { TextField, Autocomplete, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from 'src/hooks/use-auth'
import { clearEmployees, getEmployees } from 'src/store/employees/employeeSlice'

function EmployeeSelect({
  onChange,
  value = [],
  error,
  helperText,
  onBlur,
  selectedEmployees = [],
  setSelectedEmployees = null,
  isEdit = false,
}) {
  const dispatch = useDispatch()
  const { user } = useAuth()
  const { employees, isLoading } = useSelector((state) => state.employees)

  useEffect(() => {
    if (employees === null) fetchEmployees()
    return () => dispatch(clearEmployees())
  }, [])

  const fetchEmployees = () => {
    dispatch(getEmployees(user.company))
  }

  const handleChange = (newValue) => {
    onChange(
      'employees',
      newValue.map((item) => item.value)
    ) // Pass array of IDs to onChange
    if (setSelectedEmployees) {
      setSelectedEmployees(newValue.map((item) => item.label)) // Update selected labels
    }
  }

  return (
    <>
      {employees && (
        <Autocomplete
          multiple
          disablePortal
          name='employees'
          fullWidth
          value={employees.filter((employee) => value.includes(employee._id))} // Match selected employee IDs to employee objects
          onChange={(event, newValue) => {
            const selectedIds = newValue.map((item) => item._id) // Extract IDs from selected employees
            onChange('employees', selectedIds) // Update the value with selected IDs
          }}
          options={employees.filter(
            (employee) => !value.includes(employee._id)
          )} // Filter out already selected employees
          getOptionLabel={(option) => option.name || ''} // Display the name of the employee
          isOptionEqualToValue={(option, value) => option._id === value._id} // Match based on IDs
          renderInput={(params) => (
            <TextField
              {...params}
              name='employees'
              error={error}
              helperText={helperText || 'Search for employees by typing name'}
              onBlur={onBlur}
            />
          )}
        />
      )}
    </>
  )
}

export default EmployeeSelect
