import PropTypes from 'prop-types'
import { Button, Card, CardActions, CardHeader } from '@mui/material'
import { PropertyList } from 'src/components/property-list'
import { PropertyListItem } from 'src/components/property-list-item'

export const CustomerBasicDetails = (props) => {
  const { customer, ...other } = props

  return (
    <Card {...other}>
      <CardHeader title='Basic Details' />
      <PropertyList>
        <PropertyListItem
          divider
          label='Email'
          value={customer.customerEmail}
        />
        <PropertyListItem
          divider
          label='Phone'
          value={customer.customerPhoneNumber}
        />
        {customer.altCustomerPhoneNumber && (
          <PropertyListItem
            divider
            label='Alternate Phone'
            value={customer.altCustomerPhoneNumber}
          />
        )}

        <PropertyListItem
          divider
          label='Address'
          value={customer.customerAddress}
        />
        {customer.customer}
        <PropertyListItem
          divider
          label='Referred By'
          value={customer.referredBy}
        />
        <PropertyListItem divider label='Comments' value={customer.comments} />
      </PropertyList>
      {/* <CardActions>
        <Button color='inherit' size='small'>
          Reset Password
        </Button>
      </CardActions> */}
    </Card>
  )
}
