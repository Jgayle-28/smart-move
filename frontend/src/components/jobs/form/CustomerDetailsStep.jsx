import { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight'
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
        {/* PU Address */}
        <Stack spacing={1} direction='row'>
          <TextField
            fullWidth
            label='Pickup Address'
            name='pickUpAddress'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              !!(formik.touched.pickUpAddress && formik.errors.pickUpAddress)
            }
            helperText={
              formik.touched.pickUpAddress && formik.errors.pickUpAddress
            }
            value={formik.values.pickUpAddress}
          />
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
        {/* PU Address 2 */}
        {showSecondAddress && (
          <Stack spacing={1} direction='row'>
            <TextField
              fullWidth
              label='Second Pickup Address'
              name='pickUpAddress2'
              placeholder=''
              onChange={formik.handleChange}
              value={formik.values.pickUpAddress2}
            />

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
        {/* DO Address 2 */}
        <Stack spacing={1} direction='row'>
          <TextField
            fullWidth
            label='Drop Off Address'
            name='dropOffAddress'
            placeholder=''
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.dropOffAddress}
          />
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
        {/* DO Address 2 */}
        {showSecondDropOffAddress && (
          <Stack spacing={1} direction='row'>
            <TextField
              fullWidth
              label='Second Drop Off Address'
              name='dropOffAddress2'
              placeholder=''
              onChange={formik.handleChange}
              value={formik.values.dropOffAddress2}
            />

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
              <SvgIcon>
                <ArrowRightIcon />
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