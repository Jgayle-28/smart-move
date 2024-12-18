import { useEffect, useState } from 'react'
import { formatDistanceStrict } from 'date-fns'
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight'
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon,
  Typography,
  Stack,
} from '@mui/material'
import { customLocale } from 'src/utils/date-locale'
import { RouterLink } from 'src/components/router-link'
import { useSelector } from 'react-redux'
import Spinner from '../shared/Spinner'
import { getInitials } from 'src/utils/get-initials'
import { useRouter } from 'src/hooks/use-router'
import Users03Icon from 'src/icons/untitled-ui/duocolor/users-03'

export const RecentCustomers = () => {
  const [orderedCustomers, setOrderedCustomers] = useState(null)

  const { customers } = useSelector((state) => state.customers)
  const router = useRouter()

  useEffect(() => {
    if (customers) {
      const tempCustomers = [...customers]

      tempCustomers.sort((a, b) => {
        const dateA = new Date(a.createdAt)
        const dateB = new Date(b.createdAt)
        return dateB - dateA // Sort in descending order (most recent first)
      })
      setOrderedCustomers(tempCustomers)
    }
  }, [customers])

  if (!customers || !orderedCustomers) return <Spinner />
  return (
    <Card>
      <CardHeader title='Recent Customers' />
      {orderedCustomers && orderedCustomers.length > 0 ? (
        <List disablePadding>
          {orderedCustomers.slice(0, 4).map((customer) => {
            const ago = formatDistanceStrict(
              new Date(customer.createdAt),
              new Date(),
              {
                addSuffix: true,
                locale: customLocale,
              }
            )

            return (
              <ListItem
                key={customer._id}
                sx={{
                  '&:hover': {
                    backgroundColor: 'action.hover',
                    cursor: 'pointer',
                  },
                }}
                onClick={() =>
                  router.push(`/dashboard/customers/${customer._id}`)
                }
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      height: 42,
                      width: 42,
                    }}
                  >
                    {getInitials(customer.customerName)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                      variant='subtitle2'
                    >
                      {customer.customerName}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      color='text.secondary'
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                      variant='caption'
                    >
                      Email: {customer.customerEmail} | Phone:{' '}
                      {customer.customerPhoneNumber}
                    </Typography>
                  }
                  sx={{ pr: 2 }}
                />
                <Typography
                  color='text.secondary'
                  sx={{ whiteSpace: 'nowrap' }}
                  variant='caption'
                >
                  {ago}
                </Typography>
              </ListItem>
            )
          })}
        </List>
      ) : (
        <Stack direction='column' alignItems='center' sx={{ p: 2 }}>
          <SvgIcon fontSize='large' color='primary'>
            <Users03Icon />
          </SvgIcon>
          <Typography variant='body2'>No customers found</Typography>
        </Stack>
      )}

      {/* <Divider /> */}
      {/* <CardActions>
        <Button
          component={RouterLink}
          href='/dashboard/customers'
          color='inherit'
          endIcon={
            <SvgIcon>
              <ArrowRightIcon />
            </SvgIcon>
          }
          size='small'
        >
          Go to customers
        </Button>
      </CardActions> */}
    </Card>
  )
}
