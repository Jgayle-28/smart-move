import { Avatar, Button, Link, Stack, SvgIcon, Typography } from '@mui/material'
import { paths } from 'src/paths'
import { RouterLink } from '../router-link'
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft'
import { getInitials } from 'src/utils/get-initials'
import { stringToColor } from 'src/utils/string-to-color'
import { SeverityPill } from '../severity-pill'
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02'
import { useDispatch } from 'react-redux'
import { deleteCustomer } from 'src/store/customers/customerSlice'
import { toast } from 'react-hot-toast'
import { useRouter } from 'src/hooks/use-router'

function CustomerEditPageHeader({ customer, isDetails }) {
  const dispatch = useDispatch()
  const router = useRouter()

  const handleCustomerDelete = () => {
    dispatch(deleteCustomer(customer._id))
      .unwrap()
      .then(() => {
        router.push(paths.dashboard.customers.index)
        toast.success('Customer successfully deleted')
      })
  }

  return (
    <Stack spacing={4}>
      <div>
        <Link
          color='text.primary'
          component={RouterLink}
          href={paths.dashboard.customers.index}
          sx={{
            alignItems: 'center',
            display: 'inline-flex',
          }}
          underline='hover'
        >
          <SvgIcon sx={{ mr: 1 }}>
            <ArrowLeftIcon />
          </SvgIcon>
          <Typography variant='subtitle2'>Customers</Typography>
        </Link>
      </div>
      <Stack
        alignItems='flex-start'
        direction={{
          xs: 'column',
          md: 'row',
        }}
        justifyContent='space-between'
        spacing={4}
      >
        <Stack
          justifyContent='space-between'
          alignItems='center'
          spacing={2}
          direction={{
            xs: 'column',
            md: 'row',
          }}
          sx={{ width: '100%' }}
        >
          <Stack alignItems='center' direction='row' spacing={2}>
            <Avatar
              src={customer.avatar}
              sx={{
                height: 64,
                width: 64,
                bgcolor: stringToColor(customer.customerName),
              }}
            >
              {getInitials(customer.customerName)}
            </Avatar>
            <Stack spacing={1}>
              <Typography variant='h4'>{customer.customerName}</Typography>
              <Stack alignItems='center' direction='row' spacing={1}>
                <SeverityPill>{customer.customerEmail}</SeverityPill>
              </Stack>
            </Stack>
          </Stack>

          <Stack
            sx={{ marginLeft: 'auto' }}
            alignItems='center'
            direction='row'
            spacing={2}
          >
            {isDetails && (
              <>
                <Button
                  component={RouterLink}
                  href={`/dashboard/customers/${customer._id}/edit`}
                  size='small'
                  endIcon={
                    <SvgIcon fontSize='small'>
                      <Edit02Icon />
                    </SvgIcon>
                  }
                >
                  Edit
                </Button>
                <Button
                  color='error'
                  variant='outlined'
                  size='small'
                  onClick={handleCustomerDelete}
                >
                  Delete Account
                </Button>
              </>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default CustomerEditPageHeader
