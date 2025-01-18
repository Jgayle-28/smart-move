import { useState, useEffect, useMemo } from 'react'
import { Stack, TextField, Tooltip, IconButton, SvgIcon } from '@mui/material'
import { Add, Remove } from '@mui/icons-material'
import debounce from 'lodash/debounce'

const CustomerEditAddresses = ({ formik }) => {
  const [showSecondAddress, setShowSecondAddress] = useState(false)
  const [showSecondDropOffAddress, setShowSecondDropOffAddress] =
    useState(false)
  const [showThirdAddress, setShowThirdAddress] = useState(false)
  const [showThirdDropOffAddress, setShowThirdDropOffAddress] = useState(false)

  // Debounced function to handle visibility toggling
  const toggleVisibility = useMemo(
    () =>
      debounce((values) => {
        setShowSecondAddress(!!values.pickUpAddress2)
        setShowThirdAddress(!!values.pickUpAddress3)
        setShowSecondDropOffAddress(!!values.dropOffAddress2)
        setShowThirdDropOffAddress(!!values.dropOffAddress3)
      }, 300),
    []
  )

  useEffect(() => {
    toggleVisibility(formik.values)

    // Cleanup debounce on unmount
    return () => {
      toggleVisibility.cancel()
    }
  }, [formik.values, toggleVisibility])

  const handleToggleSecondAddress = () => {
    setShowSecondAddress((prevState) => {
      if (prevState) {
        formik.setFieldValue('pickUpAddress2', '')
      }
      return !prevState
    })
  }

  const handleToggleThirdAddress = () => {
    setShowThirdAddress((prevState) => {
      if (prevState) {
        formik.setFieldValue('pickUpAddress3', '')
      }
      return !prevState
    })
  }

  const handleToggleSecondDropAddress = () => {
    setShowSecondDropOffAddress((prevState) => {
      if (prevState) {
        formik.setFieldValue('dropOffAddress2', '')
      }
      return !prevState
    })
  }

  const handleToggleThirdDropAddress = () => {
    setShowThirdDropOffAddress((prevState) => {
      if (prevState) {
        formik.setFieldValue('dropOffAddress3', '')
      }
      return !prevState
    })
  }

  const handleAddressChange = (name, newValue) => {
    formik.setFieldValue(name, newValue)
  }
  return (
    <Stack spacing={2}>
      {/*---------- PU Address ----------*/}
      <Stack spacing={1} direction='row'>
        <TextField
          fullWidth
          label='Pickup Address'
          name='pickUpAddress'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.pickUpAddress}
          error={
            !!(formik.touched.pickUpAddress && formik.errors.pickUpAddress)
          }
          helperText={
            formik.touched.pickUpAddress && formik.errors.pickUpAddress
          }
        />
        {/* <AddressSelect
            label='Pickup Address'
            name='pickUpAddress'
            onChange={handleAddressChange}
            onBlur={formik.handleBlur}
            error={
              !!(formik.touched.pickUpAddress && formik.errors.pickUpAddress)
            }
            helperText={
              formik.touched.pickUpAddress && formik.errors.pickUpAddress
            }
            savedValue={formik.values.pickUpAddress}
          /> */}
        {!showSecondAddress && (
          <Tooltip title='Add second pickup address'>
            <IconButton
              size='small'
              color='primary'
              sx={{ display: 'block' }}
              onClick={handleToggleSecondAddress}
              disableRipple
            >
              <SvgIcon fontSize='small'>
                <Add />
              </SvgIcon>
            </IconButton>
          </Tooltip>
        )}
      </Stack>
      {/*---------- PU Address 2 ----------*/}
      {showSecondAddress && (
        <Stack spacing={1} direction='row'>
          <TextField
            fullWidth
            label='Second Pickup Address'
            name='pickUpAddress2'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.pickUpAddress2}
            error={
              !!(formik.touched.pickUpAddress2 && formik.errors.pickUpAddress2)
            }
            helperText={
              formik.touched.pickUpAddress2 && formik.errors.pickUpAddress2
            }
          />
          {/* <AddressSelect
              label='Second Pickup Address'
              name='pickUpAddress2'
              onChange={handleAddressChange}
              onBlur={formik.handleBlur}
              savedValue={formik.values.pickUpAddress2}
            /> */}
          <Stack spacing={1} direction='row'>
            <Tooltip title='Remove second pickup address'>
              <IconButton
                size='small'
                color='primary'
                onClick={handleToggleSecondAddress}
                disableRipple
              >
                <SvgIcon fontSize='small'>
                  <Remove />
                </SvgIcon>
              </IconButton>
            </Tooltip>
          </Stack>
          {!showThirdAddress && (
            <Tooltip title='Add third pickup address'>
              <IconButton
                size='small'
                color='primary'
                onClick={handleToggleThirdAddress}
                disableRipple
              >
                <SvgIcon fontSize='small'>
                  <Add />
                </SvgIcon>
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      )}
      {/*---------- PU Address 3 ----------*/}
      {showThirdAddress && (
        <Stack spacing={1} direction='row'>
          <TextField
            fullWidth
            label='Third Pickup Address'
            name='pickUpAddress3'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.pickUpAddress3}
            error={
              !!(formik.touched.pickUpAddress3 && formik.errors.pickUpAddress3)
            }
            helperText={
              formik.touched.pickUpAddress3 && formik.errors.pickUpAddress3
            }
          />
          {/* <AddressSelect
              label='Second Pickup Address'
              name='pickUpAddress2'
              onChange={handleAddressChange}
              onBlur={formik.handleBlur}
              savedValue={formik.values.pickUpAddress2}
            /> */}
          <Tooltip title='Remove second pickup address'>
            <IconButton
              size='small'
              color='primary'
              sx={{ display: 'block' }}
              onClick={handleToggleThirdAddress}
              disableRipple
            >
              <SvgIcon fontSize='small'>
                <Remove />
              </SvgIcon>
            </IconButton>
          </Tooltip>
        </Stack>
      )}
      {/*---------- DO Address ----------*/}
      <Stack spacing={1} direction='row'>
        <TextField
          fullWidth
          label='Drop Off Address'
          name='dropOffAddress'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.dropOffAddress}
        />
        {/* <AddressSelect
            label='Drop Off Address'
            name='dropOffAddress'
            onChange={handleAddressChange}
            onBlur={formik.handleBlur}
            savedValue={formik.values.dropOffAddress}
          /> */}
        {!showSecondDropOffAddress && (
          <Tooltip title='Add second pickup address'>
            <IconButton
              size='small'
              color='primary'
              sx={{ display: 'block' }}
              onClick={handleToggleSecondDropAddress}
              disableRipple
            >
              <SvgIcon fontSize='small'>
                <Add />
              </SvgIcon>
            </IconButton>
          </Tooltip>
        )}
      </Stack>
      {/*---------- DO Address 2 ----------*/}
      {showSecondDropOffAddress && (
        <Stack spacing={1} direction='row'>
          <TextField
            fullWidth
            label='Second Drop Off Address'
            name='dropOffAddress2'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.dropOffAddress2}
          />
          {/* <AddressSelect
              label='Second Drop Off Address'
              name='dropOffAddress2'
              onChange={handleAddressChange}
              onBlur={formik.handleBlur}
              savedValue={formik.values.dropOffAddress2}
            /> */}
          <Stack spacing={1} direction='row'>
            <Tooltip title='Remove second drop off address'>
              <IconButton
                size='small'
                color='primary'
                sx={{ display: 'block' }}
                onClick={handleToggleSecondDropAddress}
                disableRipple
              >
                <SvgIcon fontSize='small'>
                  <Remove />
                </SvgIcon>
              </IconButton>
            </Tooltip>
            {!showThirdDropOffAddress && (
              <Tooltip title='Add second pickup address'>
                <IconButton
                  size='small'
                  color='primary'
                  onClick={handleToggleThirdDropAddress}
                  disableRipple
                >
                  <SvgIcon fontSize='small'>
                    <Add />
                  </SvgIcon>
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        </Stack>
      )}
      {/*---------- DO Address 3 ----------*/}
      {showThirdDropOffAddress && (
        <Stack spacing={1} direction='row'>
          <TextField
            fullWidth
            label='Third Drop Off Address'
            name='dropOffAddress3'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.dropOffAddress3}
          />
          {/* <AddressSelect
              label='Second Drop Off Address'
              name='dropOffAddress2'
              onChange={handleAddressChange}
              onBlur={formik.handleBlur}
              savedValue={formik.values.dropOffAddress2}
            /> */}
          <Tooltip title='Remove third drop off address'>
            <IconButton
              size='small'
              color='primary'
              onClick={handleToggleThirdDropAddress}
              disableRipple
            >
              <SvgIcon fontSize='small'>
                <Remove />
              </SvgIcon>
            </IconButton>
          </Tooltip>
        </Stack>
      )}
    </Stack>
  )
}

export default CustomerEditAddresses
