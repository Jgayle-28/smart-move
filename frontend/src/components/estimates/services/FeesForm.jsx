import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  Unstable_Grid2 as Grid,
  Box,
  Typography,
} from '@mui/material'
import { MobileDatePicker, MobileTimePicker } from '@mui/x-date-pickers'
import { Scrollbar } from 'src/components/scrollbar'
import { Tip } from 'src/components/tip'

function FeesForm() {
  return (
    <>
      <Box>
        <Scrollbar
          sx={{
            height: 400,
          }}
        >
          <Grid container spacing={3}>
            <Grid xs={12} md={12}>
              <Tip message='Add any additional fees here.' />
            </Grid>
            <Grid xs={12} md={3}>
              <TextField
                fullWidth
                label='Trip Fee'
                name='tripFee'
                variant='standard'
                size='small'
                // error={
                //   !!(
                //     formik.touched.customerPhoneNumber &&
                //     formik.errors.customerPhoneNumber
                //   )
                // }
                // helperText={
                //   formik.touched.customerPhoneNumber &&
                //   formik.errors.customerPhoneNumber
                // }
                // onBlur={formik.handleBlur}
                // onChange={formik.handleChange}
                // value={formatPhoneNumber(formik.values.customerPhoneNumber)}
              />
            </Grid>
            <Grid xs={12} md={3}>
              <TextField
                fullWidth
                label='Receiving Fee'
                name='receivingFee'
                variant='standard'
                size='small'
                // error={
                //   !!(
                //     formik.touched.altCustomerPhoneNumber &&
                //     formik.errors.altCustomerPhoneNumber
                //   )
                // }
                // helperText={
                //   formik.touched.altCustomerPhoneNumber &&
                //   formik.errors.altCustomerPhoneNumber
                // }
                // onBlur={formik.handleBlur}
                // onChange={formik.handleChange}
                // value={formatPhoneNumber(formik.values.altCustomerPhoneNumber)}
              />
            </Grid>
            <Grid xs={12} md={12}>
              <Typography variant='h6'>Additional Fees</Typography>
            </Grid>
            <Grid xs={12} md={3}>
              <TextField
                fullWidth
                label='Fee'
                name='serviceName'
                variant='standard'
                size='small'
              />
            </Grid>
            <Grid xs={12} md={3}>
              <TextField
                fullWidth
                label='Amount'
                name='serviceAmount'
                variant='standard'
                size='small'
              />
            </Grid>
            <Grid xs={12} md={2}>
              <Button variant='contained'>Add Fee</Button>
            </Grid>
          </Grid>
        </Scrollbar>
      </Box>
    </>
  )
}

export default FeesForm
