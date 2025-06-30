import { TextField, Autocomplete, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from 'src/hooks/use-auth'
import { clearCustomers, getCustomers } from 'src/store/customers/customerSlice'

function CustomerSelect({
  onChange,
  value,
  error,
  helperText,
  onBlur,
  selectedCustomer = '',
  setSelectedCustomer = null,
  isEdit = false,
  shouldDisableCustomerSelect = false,
}) {
  const [newValue, setNewValue] = useState()
  // const [inputValue, setInputValue] = useState('')

  const dispatch = useDispatch()
  const { user } = useAuth()
  const { customers, isLoading } = useSelector((state) => state.customers)

  useEffect(() => {
    if (customers === null) fetchCustomers()
    return () => dispatch(clearCustomers())
  }, [])

  const fetchCustomers = () => {
    dispatch(getCustomers(user.company))
  }
  const handleChange = (newValue) => {
    if (newValue === null || newValue === undefined) {
      onChange('customer', '')
      setNewValue(null)
      if (setSelectedCustomer) {
        setSelectedCustomer('')
      }
      return
    }
    onChange('customer', newValue?.value || '')
    setNewValue(newValue)
    if (setSelectedCustomer) {
      setSelectedCustomer(newValue.label)
    }
  }

  return (
    <>
      {customers && (
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
          options={customers.map((customer) => {
            return { value: customer._id, label: customer.customerName }
          })}
          getOptionLabel={(option) =>
            typeof option === 'string' ? selectedCustomer : option.label
          }
          isOptionEqualToValue={(option, value) => option.value === value}
          renderInput={(params) => (
            <TextField
              {...params}
              name='customer'
              error={error}
              helperText={helperText || 'Search for customer by typing name'}
              onBlur={onBlur}
            />
          )}
          error={error}
          helperText={helperText}
          onBlur={onBlur}
          disabled={shouldDisableCustomerSelect}
        />
      )}
    </>
  )
}

export default CustomerSelect
