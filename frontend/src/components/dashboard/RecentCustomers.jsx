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
} from '@mui/material'
import { customLocale } from 'src/utils/date-locale'
import { RouterLink } from 'src/components/router-link'
import { useSelector } from 'react-redux'
import Spinner from '../shared/Spinner'
import { getInitials } from 'src/utils/get-initials'

export const RecentCustomers = () => {
  const { customers } = useSelector((state) => state.customers)

  if (!customers) return <Spinner />
  return (
    <Card>
      <CardHeader title='Recent Customers new' />
      <List disablePadding>
        {customers.slice(0, 4).map((customer) => {
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
      <Divider />
      <CardActions>
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
      </CardActions>
    </Card>
  )
}
