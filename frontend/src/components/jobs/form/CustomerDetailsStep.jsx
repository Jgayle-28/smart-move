import { useFormik } from 'formik'
import PropTypes from 'prop-types'
import {
  Button,
  IconButton,
  Stack,
  TextField,
  Box,
  Typography,
} from '@mui/material'
import { Add, Remove } from '@mui/icons-material'
import CustomerSelect from 'src/components/shared/CustomerSelect'

export const CustomerDetailsStep = ({
  formik,
  selectedCustomer = '',
  setSelectedCustomer,
  onBack = () => {},
  onNext = () => {},
  isEdit = false,
  shouldDisableCustomerSelect = false,
  ...other
}) => {
  const handleAddAddress = (type) => {
    if (formik.values[type].length < 5) {
      formik.setFieldValue(type, [
        ...formik.values[type],
        { address: '', details: '' },
      ])
    }
  }

  const handleRemoveAddress = (type, index) => {
    const updatedAddresses = formik.values[type].filter(
      (_, idx) => idx !== index
    )
    formik.setFieldValue(type, updatedAddresses)
  }

  const handleAddressChange = (type, index, field, value) => {
    const updatedAddresses = [...formik.values[type]]
    updatedAddresses[index][field] = value
    formik.setFieldValue(type, updatedAddresses)
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
        shouldDisableCustomerSelect={shouldDisableCustomerSelect}
      />
      <Box sx={{ paddingTop: 2 }}>
        <Typography variant='h6'>Pickup & Drop Off Locations</Typography>
      </Box>

      {/* Pickup Addresses */}
      <Stack spacing={2}>
        <Typography variant='subtitle2'>Pickup Addresses</Typography>
        {formik.values.pickUpAddresses.map((address, index) => (
          <Stack key={index} spacing={1} direction='row'>
            <TextField
              fullWidth
              size='small'
              label={`Pickup Address ${index + 1}`}
              value={address.address}
              onChange={(e) =>
                handleAddressChange(
                  'pickUpAddresses',
                  index,
                  'address',
                  e.target.value
                )
              }
            />
            {/* <TextField
              fullWidth
              label='Details'
              value={address.details}
              onChange={(e) =>
                handleAddressChange(
                  'pickUpAddresses',
                  index,
                  'details',
                  e.target.value
                )
              }
            />*/}
            {index !== 0 && (
              <IconButton
                size='small'
                onClick={() => handleRemoveAddress('pickUpAddresses', index)}
              >
                <Remove />
              </IconButton>
            )}
          </Stack>
        ))}
        {formik.values.pickUpAddresses.length < 5 && (
          <Button
            onClick={() => handleAddAddress('pickUpAddresses')}
            startIcon={<Add />}
          >
            Add Pickup Address
          </Button>
        )}
      </Stack>

      {/* Drop Off Addresses */}
      <Stack spacing={2}>
        <Typography variant='subtitle2'>Drop Off Addresses</Typography>
        {formik.values.dropOffAddresses.map((address, index) => (
          <Stack key={index} spacing={1} direction='row'>
            <TextField
              fullWidth
              size='small'
              label={`Drop Off Address ${index + 1}`}
              value={address.address}
              onChange={(e) =>
                handleAddressChange(
                  'dropOffAddresses',
                  index,
                  'address',
                  e.target.value
                )
              }
            />
            {/* <Stack direction='row' spacing={2}>
            <TextField
              fullWidth
              size='small'
              label='Details'
              value={address.details}
              onChange={(e) =>
                handleAddressChange(
                  'dropOffAddresses',
                  index,
                  'details',
                  e.target.value
                )
              }
            />
            </Stack> */}
            {index !== 0 && (
              <IconButton
                size='small'
                onClick={() => handleRemoveAddress('dropOffAddresses', index)}
              >
                <Remove fontSize='small' />
              </IconButton>
            )}
          </Stack>
        ))}
        {formik.values.dropOffAddresses.length < 5 && (
          <Button
            size='small'
            onClick={() => handleAddAddress('dropOffAddresses')}
            startIcon={<Add />}
          >
            Add Drop Off Address
          </Button>
        )}
      </Stack>

      {!isEdit && (
        <Stack direction='row' spacing={2}>
          <Button onClick={onBack}>Back</Button>
          <Button
            onClick={onNext}
            variant='contained'
            disabled={formik?.values?.customer?.length === 0}
          >
            Continue
          </Button>
        </Stack>
      )}
    </Stack>
  )
}

CustomerDetailsStep.propTypes = {
  formik: PropTypes.object.isRequired,
  selectedCustomer: PropTypes.string,
  setSelectedCustomer: PropTypes.func,
  onBack: PropTypes.func,
  onNext: PropTypes.func,
  isEdit: PropTypes.bool,
}
