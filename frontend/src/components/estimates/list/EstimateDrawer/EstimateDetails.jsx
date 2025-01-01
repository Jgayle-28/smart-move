import PropTypes from 'prop-types'
import {
  Stack,
  Button,
  Typography,
  useMediaQuery,
  Tooltip,
} from '@mui/material'
import { PropertyList } from 'src/components/property-list'
import { PropertyListItem } from 'src/components/property-list-item'
import { RouterLink } from 'src/components/router-link'

const statusMap = {
  canceled: 'warning',
  complete: 'success',
  pending: 'info',
  rejected: 'error',
}

export const EstimateDetails = ({ estimate, setConeModalOpen }) => {
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
              Phone: {estimate.customer.customerPhoneNumber}
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
          <Stack
            direction='row'
            spacing={1}
            alignItems='center'
            justifyContent='center'
            sx={{ marginTop: 2 }}
          >
            {/* Go To Estimate */}
            <Tooltip title='Go To Estimate'>
              <Button
                size='small'
                color='primary'
                variant='text'
                component={RouterLink}
                href={`/dashboard/estimates/${estimate.job._id}/edit/${estimate._id}`}
              >
                View Estimate
              </Button>
            </Tooltip>
            {/* Go to job */}
            <Tooltip title='Go To Job'>
              <Button
                size='small'
                component={RouterLink}
                href={`/dashboard/jobs/${estimate.job._id}`}
                color='primary'
                variant='text'
              >
                View Job
              </Button>
            </Tooltip>
            {/* Clone Estimate */}
            <Tooltip title='Clone Estimate'>
              <Button
                size='small'
                variant='text'
                color='primary'
                onClick={() => setConeModalOpen(true)}
              >
                Clone Estimate
              </Button>
            </Tooltip>
          </Stack>
        </PropertyList>
      </Stack>
    </Stack>
  )
}

EstimateDetails.propTypes = {
  order: PropTypes.object,
}
