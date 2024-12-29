import PropTypes from 'prop-types'
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined'
import {
  Box,
  Button,
  Checkbox,
  Stack,
  SvgIcon,
  TextField,
  Typography,
  Autocomplete,
} from '@mui/material'
import { createFilterOptions } from '@mui/material/Autocomplete'
import { Tip } from 'src/components/tip'

const paymentItemList = [
  'Card',
  'Cash',
  'Check',
  'Zelle',
  'Venmo',
  'Cash App',
  'Other',
]

const filter = createFilterOptions()

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
        <Tip message='To add a payment type not listed, type in the INPUT and then hit ENTER.' />
        <Autocomplete
          value={formik.values.paymentType}
          onChange={(event, newValue) => {
            formik.setFieldValue('paymentType', newValue)
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params)
            const { inputValue } = params
            // Suggest the creation of a new value
            const isExisting = options.some((option) => inputValue === option)
            if (inputValue !== '' && !isExisting) {
              filtered.push(inputValue)
            }

            return filtered
          }}
          id='free-solo-with-text-demo'
          options={paymentItemList}
          getOptionLabel={(option) => {
            // Value selected with enter, right from the input
            if (typeof option === 'string') {
              return option
            }
            // Add "xxx" option created dynamically
            if (option.inputValue) {
              return option.inputValue
            }
            // Regular option
            return option.value
          }}
          renderOption={(props, option) => <li {...props}>{option}</li>}
          freeSolo
          renderInput={(params) => (
            <TextField {...params} label='Payment Type' />
          )}
        />
      </Stack>
      {!isEdit && (
        <Stack alignItems='center' direction='row' spacing={2}>
          <Button
            endIcon={
              <SvgIcon fontSize='small'>
                <ArrowRightAltOutlinedIcon />
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
