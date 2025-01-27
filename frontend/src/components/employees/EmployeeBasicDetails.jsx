import { Card, Typography, CardHeader, Divider, Box, Chip } from '@mui/material'
import { PropertyList } from 'src/components/property-list'
import { PropertyListItem } from 'src/components/property-list-item'

export const EmployeeBasicDetails = (props) => {
  const { employee, ...other } = props

  if (!employee) return null
  return (
    <Card {...other}>
      <CardHeader title='Basic Details' />
      <PropertyList>
        <PropertyListItem divider label='Email' value={employee.email || ''} />
        <PropertyListItem
          divider
          label='Phone'
          value={employee.phoneNumber || ''}
        />
        {/* {customer.altCustomerPhoneNumber && (
          <PropertyListItem
            divider
            label='Alternate Phone'
            value={customer.altCustomerPhoneNumber}
          />
        )} */}

        <PropertyListItem
          divider
          label='Address'
          value={employee.address || ''}
        />
        <Divider />
        <Box sx={{ py: 2, px: 3 }}>
          <Typography sx={{ minWidth: 'inherit' }} variant='subtitle2'>
            Status
          </Typography>
          <Box
            sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, marginTop: 1 }}
          >
            <Chip
              label={employee?.status || 'No status'}
              size='small'
              variant='outlined'
              color={
                employee.status === 'Active'
                  ? 'success'
                  : employee.status === 'No Go'
                  ? 'error'
                  : 'warning'
              }
              sx={{
                borderColor:
                  employee.status === 'Active'
                    ? 'success.main'
                    : employee.status === 'No Go'
                    ? 'error.main'
                    : 'warning.main',
                color:
                  employee.status === 'Active'
                    ? 'success.main'
                    : employee.status === 'No Go'
                    ? 'error.main'
                    : 'warning.main',
              }}
            />
          </Box>
        </Box>
        <Divider />
        <PropertyListItem divider label='Comments' value={employee.comments} />
        <Divider />
        <Box sx={{ py: 2, px: 3 }}>
          <Typography sx={{ minWidth: 'inherit' }} variant='subtitle2'>
            Days Available
          </Typography>
          <Box
            sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, marginTop: 1 }}
          >
            {employee.daysAvailable.length > 0
              ? employee.daysAvailable.map((day) => (
                  <Chip
                    key={day}
                    label={day || ''}
                    size='small'
                    variant='outlined'
                    color='primary'
                  />
                ))
              : 'No days selected'}
          </Box>
        </Box>
      </PropertyList>
    </Card>
  )
}
