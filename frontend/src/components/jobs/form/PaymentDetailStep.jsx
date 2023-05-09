import PropTypes from 'prop-types'
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight'
import {
  Box,
  Button,
  Checkbox,
  Stack,
  SvgIcon,
  TextField,
  Typography,
} from '@mui/material'

export const PaymentDetailStep = (props) => {
  const { formik, onBack, onNext, isEdit = false, ...other } = props

  return (
    <Stack spacing={3} {...other}>
      <Stack spacing={1}>
        {!formik.values.billingSameAsCustomer && (
          <TextField
            fullWidth
            label='Bill To'
            name='billTo'
            onChange={formik.handleChange}
            placeholder=''
          />
        )}
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            ml: -1,
          }}
        >
          <Checkbox
            checked={formik.values.billingSameAsCustomer}
            name='billingSameAsCustomer'
            onChange={() =>
              formik.setFieldValue(
                'billingSameAsCustomer',
                !formik.values.billingSameAsCustomer
              )
            }
          />
          <Typography color='text.secondary' variant='body2'>
            Billing same as customer
          </Typography>
        </Box>
        <TextField
          fullWidth
          label='Payment Type'
          name='paymentType'
          onChange={formik.handleChange}
          value={formik.values.paymentType}
          placeholder=''
        />
      </Stack>
      {!isEdit && (
        <Stack alignItems='center' direction='row' spacing={2}>
          <Button
            endIcon={
              <SvgIcon>
                <ArrowRightIcon />
              </SvgIcon>
            }
            type='submit'
            variant='contained'
          >
            Create Job
          </Button>
          <Button color='inherit' onClick={onBack}>
            Back
          </Button>
        </Stack>
      )}
    </Stack>
  )
}

PaymentDetailStep.propTypes = {
  onBack: PropTypes.func,
}
