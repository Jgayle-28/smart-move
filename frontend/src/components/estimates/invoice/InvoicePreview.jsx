import { addDays, format } from 'date-fns'
import {
  Box,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material'
import { Logo } from 'src/components/logo'
import Spinner from 'src/components/shared/Spinner'
import { useSelector } from 'react-redux'
import { formatPhoneNumber } from 'src/utils/format-phone-number'

export const InvoicePreview = () => {
  const { focusJob } = useSelector((state) => state.jobs)
  const { company } = useSelector((state) => state.company)
  const { focusEstimate } = useSelector((state) => state.estimates)

  const today = new Date()
  const dueDate = format(addDays(today, 7).getTime(), 'MM/dd/yyyy')

  if (!focusEstimate || !focusJob || !company) return <Spinner />
  return (
    <Card sx={{ p: 6 }}>
      <Stack
        alignItems='flex-start'
        direction='row'
        justifyContent='space-between'
        spacing={3}
      >
        {/*----- Header ----- */}
        <div>
          <Box
            sx={{
              display: 'inline-flex',
              height: 24,
              width: 24,
            }}
          >
            <Logo />
          </Box>
          <Typography variant='h4'>{company?.companyName}</Typography>
        </div>

        <div>
          <Typography
            align='right'
            color={focusJob.isPaid ? 'success.main' : 'warning.main'}
            variant='h4'
          >
            {focusJob?.isPaid ? 'PAID' : 'UNPAID'}
          </Typography>
          <Typography align='right' variant='subtitle2'>
            {focusEstimate?.invoiceId.toUpperCase()}
          </Typography>
        </div>
      </Stack>
      {/*----- Company Data -----*/}
      <Box sx={{ mt: 4 }}>
        <Grid container justifyContent='space-between'>
          <Grid xs={12} md={4}>
            <Typography variant='body2'>
              {company?.companyAddress || company?.companyAddress?.description}
              {/* <br />
              Level 2, C, 442456
              <br />
              San Francisco, CA, USA */}
            </Typography>
          </Grid>
          <Grid xs={12} md={4}>
            <Typography variant='body2'>
              {/* Company No. 4675933
              <br />
              EU VAT No. 949 67545 45
              <br /> */}
            </Typography>
          </Grid>
          <Grid xs={12} md={4}>
            <Typography align='right' variant='body2'>
              {company?.companyEmail}
              <br />
              {formatPhoneNumber(company?.companyPhoneNumber)}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      {/*----- Invoice Data -----*/}
      <Box sx={{ mt: 4 }}>
        <Grid container justifyContent='space-between'>
          <Grid xs={12} md={4}>
            <Typography gutterBottom variant='subtitle2'>
              Due date
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              {dueDate}
            </Typography>
          </Grid>
          <Grid xs={12} md={4}>
            <Typography gutterBottom variant='subtitle2'>
              Date of issue
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              {(today && format(today, 'MM/dd/yyyy')) || ''}
            </Typography>
          </Grid>
          <Grid xs={12} md={4}>
            <Typography gutterBottom variant='subtitle2'>
              Number
            </Typography>
            <Typography variant='body2'>
              {focusEstimate?.invoiceId.toUpperCase()}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      {/*----- Billed to -----*/}
      <Box sx={{ mt: 4 }}>
        <Typography gutterBottom variant='subtitle2'>
          Billed to
        </Typography>
        <Typography variant='body2'>
          {focusJob.billTo ? focusJob.billTo : focusJob.customer.customerName}
          <br />
          {focusJob?.customer?.customerAddress?.description || ''}
          {/* <br />
          {invoice.customer.taxId}
          <br />
          {invoice.customer.address} */}
        </Typography>
      </Box>
      {/*----- Billing Table -----*/}
      <Table sx={{ mt: 4 }}>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Qty</TableCell>
            <TableCell>Unit Price</TableCell>
            <TableCell align='right'>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>{focusJob?.jobType}</TableCell>
            <TableCell>1</TableCell>
            <TableCell>${focusEstimate?.totalCharges}</TableCell>
            <TableCell align='right'>${focusEstimate?.totalCharges}</TableCell>
          </TableRow>
          {/* {items.map((item, index) => {
            const unitAmount = numeral(item.unitAmount).format(
              `${item.currency}0,0.00`
            )
            const totalAmount = numeral(item.totalAmount).format(
              `${item.currency}0,0.00`
            )

            return (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{unitAmount}</TableCell>
                <TableCell align='right'>{totalAmount}</TableCell>
              </TableRow>
            )
          })} */}
          {/* <TableRow>
            <TableCell colSpan={3} sx={{ borderBottom: 'none' }} />
            <TableCell sx={{ borderBottom: 'none' }}>
              <Typography variant='subtitle1'>Subtotal</Typography>
            </TableCell>
            <TableCell align='right' sx={{ borderBottom: 'none' }}>
              <Typography variant='subtitle2'>{subtotalAmount}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3} sx={{ borderBottom: 'none' }} />
            <TableCell sx={{ borderBottom: 'none' }}>
              <Typography variant='subtitle1'>Taxes</Typography>
            </TableCell>
            <TableCell align='right' sx={{ borderBottom: 'none' }}>
              <Typography variant='subtitle2'>{taxAmount}</Typography>
            </TableCell>
          </TableRow> */}
          <TableRow>
            <TableCell colSpan={3} sx={{ borderBottom: 'none' }} />
            <TableCell sx={{ borderBottom: 'none' }}>
              <Typography variant='subtitle1'>Total</Typography>
            </TableCell>
            <TableCell align='right' sx={{ borderBottom: 'none' }}>
              <Typography variant='subtitle2'>
                ${focusEstimate?.totalCharges}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/* <Box sx={{ mt: 2 }}>
        <Typography gutterBottom variant='h6'>
          Notes
        </Typography>
        <Typography color='text.secondary' variant='body2'>
          Please make sure you have the right bank registration number as I had
          issues before and make sure you guys cover transfer expenses.
        </Typography>
      </Box> */}
    </Card>
  )
}
