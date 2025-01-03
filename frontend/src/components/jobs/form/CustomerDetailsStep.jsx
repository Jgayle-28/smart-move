import { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined'
import {
  Button,
  IconButton,
  Stack,
  SvgIcon,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { Add, Remove } from '@mui/icons-material'
import CustomerSelect from 'src/components/shared/CustomerSelect'
// import AddressSelect from 'src/components/shared/AddressSelect'

export const CustomerDetailsStep = (props) => {
  const {
    formik,
    selectedCustomer = '',
    setSelectedCustomer,
    onBack = () => {},
    onNext = () => {},
    isEdit = false,
    ...other
  } = props

  const [showSecondAddress, setShowSecondAddress] = useState(false)
  const [showSecondDropOffAddress, setShowSecondDropOffAddress] =
    useState(false)

  const handleToggleSecondAddress = useCallback(() => {
    setShowSecondAddress((prevState) => !prevState)
  }, [])
  const handleToggleSecondDropAddress = useCallback(() => {
    setShowSecondDropOffAddress((prevState) => !prevState)
  }, [])
  const handleAddressChange = (name, newValue) => {
    formik.setFieldValue(name, newValue)
  }

  return (
    <Stack spacing={3} {...other}>
      <div>
        <Typography variant='h6'>Select Customer</Typography>
      </div>
      <CustomerSelect
        isEdit={true}
        value={formik.values.customer}
        onChange={formik.setFieldValue}
        error={!!(formik.touched.customer && formik.errors.customer)}
        helperText={formik.touched.customer && formik.errors.customer}
        onBlur={formik.handleBlur}
        selectedCustomer={selectedCustomer}
        setSelectedCustomer={setSelectedCustomer}
      />
      <div>
        <Typography variant='h6'>Pickup & Drop Off Locations</Typography>
      </div>
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
                !!(
                  formik.touched.pickUpAddress2 && formik.errors.pickUpAddress2
                )
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
            <Tooltip title='Remove second pickup address'>
              <IconButton
                size='small'
                color='primary'
                sx={{ display: 'block' }}
                onClick={handleToggleSecondAddress}
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
              savedValue={formik.values.dropOffAddress2}
            />
            {/* <AddressSelect
              label='Second Drop Off Address'
              name='dropOffAddress2'
              onChange={handleAddressChange}
              onBlur={formik.handleBlur}
              savedValue={formik.values.dropOffAddress2}
            /> */}
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
          </Stack>
        )}
      </Stack>
      {!isEdit && (
        <Stack alignItems='center' direction='row' spacing={2}>
          <Button
            disabled={formik.values.customer.length === 0}
            endIcon={
              <SvgIcon fontSize='small'>
                <ArrowRightAltOutlinedIcon />
              </SvgIcon>
            }
            onClick={onNext}
            variant='contained'
          >
            Continue
          </Button>
          <Button color='inherit' onClick={onBack}>
            Back
          </Button>
        </Stack>
      )}
    </Stack>
  )
}

CustomerDetailsStep.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func,
}
