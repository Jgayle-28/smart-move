import PropTypes from 'prop-types'
import { format } from 'date-fns'
import numeral from 'numeral'
import {
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { PropertyList } from 'src/components/property-list'
import { PropertyListItem } from 'src/components/property-list-item'
import { SeverityPill } from 'src/components/severity-pill'
import { Scrollbar } from 'src/components/scrollbar'
import { RouterLink } from 'src/components/router-link'
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight'

const statusMap = {
  canceled: 'warning',
  complete: 'success',
  pending: 'info',
  rejected: 'error',
}

export const EstimateDetails = ({ estimate }) => {
  console.log('estimate :>> ', estimate)
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'))

  const align = lgUp ? 'horizontal' : 'vertical'
  // const items = order.items || []
  // const createdAt = format(order.createdAt, 'dd/MM/yyyy HH:mm')
  // const statusColor = statusMap[order.status]
  // const totalAmount = numeral(order.totalAmount).format(
  //   `${order.currency}0,0.00`
  // )

  return (
    <Stack spacing={6}>
      <Stack spacing={3}>
        <Stack
          alignItems='center'
          direction='row'
          justifyContent='space-between'
          spacing={3}
        >
          <Typography variant='h6'>Details</Typography>
        </Stack>
        <PropertyList>
          {/* <PropertyListItem
            align={align}
            disableGutters
            divider
            label='ID'
            value={order.id}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label='Number'
            value={order.number}
          /> */}
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label='Customer'
          >
            <Typography color='text.secondary' variant='body2'>
              Name: {estimate.customer?.customerName}
            </Typography>
            <Typography color='text.secondary' variant='body2'>
              Email: {estimate.customer.customerEmail}
            </Typography>
            <Typography color='text.secondary' variant='body2'>
              Phone: {estimate.customer.customerPhone}
            </Typography>
            <Typography color='text.secondary' variant='body2'>
              Address: {estimate.customer.customerAddress}
            </Typography>
          </PropertyListItem>
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label='Estimate'
          >
            <Typography color='text.secondary' variant='body2'>
              Total: ${estimate.totalCharges}
            </Typography>
            <Typography color='text.secondary' variant='body2'>
              Men: {estimate.moveCharges.totalMen}
            </Typography>
            <Typography color='text.secondary' variant='body2'>
              Trucks: {estimate.moveCharges.totalTrucks}
            </Typography>
            <Typography color='text.secondary' variant='body2'>
              Hours: {estimate.moveCharges.totalMoveHours}
            </Typography>
            <Typography color='text.secondary' variant='body2'>
              Items: {estimate.totalItemCount}
            </Typography>
            <Typography color='text.secondary' variant='body2'>
              Weight: {estimate.totalWeight}
            </Typography>
            <Typography color='text.secondary' variant='body2'>
              Volume: {estimate.totalVolume}
            </Typography>
            <Typography color='text.secondary' variant='body2'>
              Created By: {estimate.createdBy.name}
            </Typography>
          </PropertyListItem>
          <Stack direction='row' spacing={2} sx={{ marginTop: 3 }}>
            <Button
              fullWidth
              component={RouterLink}
              href={`/dashboard/estimates/${estimate.job._id}/edit/${estimate._id}`}
              color='primary'
              variant='contained'
              size='small'
            >
              Go To Estimate
            </Button>
            <Button
              fullWidth
              component={RouterLink}
              href={`/dashboard/jobs/${estimate.job._id}`}
              color='primary'
              variant='outlined'
              size='small'
            >
              Go To Job
            </Button>
          </Stack>
          {/* <PropertyListItem
            align={align}
            disableGutters
            divider
            label='Date'
            value={createdAt}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label='Promotion Code'
            value={order.promotionCode}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label='Total Amount'
            value={totalAmount}
          />
          <PropertyListItem align={align} disableGutters divider label='Status'>
            <SeverityPill color={statusColor}>{order.status}</SeverityPill>
          </PropertyListItem> */}
        </PropertyList>
      </Stack>
      {/* <Stack spacing={3}>
        <Typography variant='h6'>Line items</Typography>
        <Scrollbar>
          <Table sx={{ minWidth: 400 }}>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>Billing Cycle</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => {
                const unitAmount = numeral(item.unitAmount).format(
                  `${item.currency}0,0.00`
                )

                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      {item.name} x {item.quantity}
                    </TableCell>
                    <TableCell>{item.billingCycle}</TableCell>
                    <TableCell>{unitAmount}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Scrollbar>
      </Stack> */}
    </Stack>
  )
}

EstimateDetails.propTypes = {
  order: PropTypes.object,
}
