import PropTypes from 'prop-types'
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight'
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02'
import {
  Avatar,
  Box,
  IconButton,
  Link,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import { RouterLink } from 'src/components/router-link'
import { Scrollbar } from 'src/components/scrollbar'
import { paths } from 'src/paths'
import { getInitials } from 'src/utils/get-initials'
import { stringToColor } from 'src/utils/string-to-color'
import { formatPhoneNumber } from 'src/utils/format-phone-number'
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined'
import EmptyState from '../shared/EmptyState'
import { useNavigate } from 'react-router-dom'

export const CustomerListTable = (props) => {
  const {
    count = 0,
    customers = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    isSearching = false,
  } = props

  const navigate = useNavigate()

  return (
    <Box sx={{ position: 'relative' }}>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers && customers.length ? (
              customers.map((customer) => {
                return (
                  <TableRow hover key={customer._id}>
                    <TableCell>
                      <Stack alignItems='center' direction='row' spacing={1}>
                        <Avatar
                          sx={{
                            height: 42,
                            width: 42,
                            bgcolor: stringToColor(customer.customerName),
                          }}
                        >
                          {getInitials(customer.customerName)}
                        </Avatar>
                        <div>
                          <Link
                            color='inherit'
                            component={RouterLink}
                            href={paths.dashboard.customers.details}
                            variant='subtitle2'
                          >
                            {customer.customerName}
                          </Link>
                          <Typography color='text.secondary' variant='body2'>
                            {customer.customerEmail}
                          </Typography>
                        </div>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {formatPhoneNumber(customer.customerPhoneNumber)}
                    </TableCell>
                    <TableCell>{customer.customerEmail}</TableCell>
                    <TableCell>
                      <Typography variant='subtitle2'>
                        {customer.customerAddress.description}
                      </Typography>
                    </TableCell>
                    <TableCell align='right'>
                      <Tooltip title='Edit Customer'>
                        <IconButton
                          component={RouterLink}
                          href={`/dashboard/customers/${customer._id}/edit`}
                        >
                          <SvgIcon fontSize='small'>
                            <Edit02Icon />
                          </SvgIcon>
                        </IconButton>
                      </Tooltip>
                      <Tooltip title='Create job for customer'>
                        <IconButton
                          onClick={() =>
                            navigate(`/dashboard/jobs/create`, {
                              state: { customer },
                            })
                          }
                        >
                          <SvgIcon fontSize='small'>
                            <PostAddOutlinedIcon />
                          </SvgIcon>
                        </IconButton>
                      </Tooltip>
                      <Tooltip title='View Details'>
                        <IconButton
                          component={RouterLink}
                          href={`/dashboard/customers/${customer._id}`}
                        >
                          <SvgIcon fontSize='small'>
                            <ArrowRightIcon />
                          </SvgIcon>
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} align='center'>
                  <EmptyState
                    title={
                      isSearching
                        ? 'No customers match your search'
                        : 'You Have not added any customers yet'
                    }
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Scrollbar>
      {!!customers.length > 0 && (
        <TablePagination
          component='div'
          count={count}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      )}
    </Box>
  )
}

CustomerListTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
}
