import PropTypes from 'prop-types'
import { format } from 'date-fns'
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import { SeverityPill } from 'src/components/severity-pill'

const statusMap = {
  complete: 'success',
  pending: 'info',
  canceled: 'warning',
  rejected: 'error',
}

export const EstimateListTable = (props) => {
  const {
    count = 0,
    estimates = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelect,
    page = 0,
    rowsPerPage = 0,
  } = props

  return (
    <div>
      <Table>
        <TableBody>
          {estimates?.map((estimate) => {
            const createdAtMonth = format(
              new Date(estimate.createdAt),
              'LLL'
            ).toUpperCase()
            const createdAtDay = format(new Date(estimate.createdAt), 'd')
            const totalAmount = estimate.totalCharges
            const statusColor = statusMap[estimate.status] || 'warning'

            return (
              <TableRow
                hover
                key={estimate._id}
                onClick={() => onSelect?.(estimate)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                  }}
                >
                  <Tooltip label='Date Created'>
                    <Box
                      sx={{
                        backgroundColor: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'neutral.800'
                            : 'neutral.200',
                        borderRadius: 2,
                        maxWidth: 'fit-content',
                        ml: 3,
                        p: 1,
                      }}
                    >
                      <Typography variant='caption'>Created</Typography>
                      <Stack
                        direction='row'
                        justifyContent='center'
                        spacing={1}
                      >
                        <Typography variant='subtitle2'>
                          {createdAtMonth}
                        </Typography>
                        <Typography variant='subtitle2'>
                          {createdAtDay}
                        </Typography>
                      </Stack>
                    </Box>
                  </Tooltip>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant='subtitle2'>
                      {estimate.customer.customerName}
                    </Typography>
                    <Typography color='text.secondary' variant='body2'>
                      Total of ${totalAmount}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align='right'>
                  <SeverityPill color='primary'>
                    {estimate.job.jobType}
                  </SeverityPill>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      {estimates?.length > 0 && (
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
    </div>
  )
}

EstimateListTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelect: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
}
