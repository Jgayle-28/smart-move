import {
  Card,
  CardHeader,
  IconButton,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Box,
  Typography,
} from '@mui/material'
import { format } from 'date-fns'
import { SeverityPill } from '../severity-pill'
import { Launch } from '@mui/icons-material'
import { RouterLink } from '../router-link'

function EmployeeJobs({ employeeJobs = [] }) {
  return (
    <Card>
      <CardHeader title={`Employee Jobs (${employeeJobs.length})`}></CardHeader>
      <Table>
        {employeeJobs?.length === 0 ? (
          <TableRow>
            <TableCell>
              <Card variant='outlined'>
                <Box sx={{ px: 2, py: 1.5 }}>
                  <Typography textAlign='center' color='text.secondary'>
                    Employee has not been assigned any jobs
                  </Typography>
                </Box>{' '}
              </Card>
            </TableCell>
          </TableRow>
        ) : (
          <>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>PU Address</TableCell>
                <TableCell>DO Address</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            {employeeJobs.map((job) => (
              <TableRow
                key={job._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <SeverityPill>{job.jobType}</SeverityPill>
                </TableCell>
                <TableCell>{job.customer.customerName}</TableCell>
                <TableCell>
                  {format(new Date(job.jobDate), 'MM/dd/yyyy')}
                </TableCell>
                <TableCell>
                  {job?.pickUpAddress?.description || 'TBD'}
                </TableCell>
                <TableCell>
                  {job?.dropOffAddress?.description || 'TBD'}
                </TableCell>
                <TableCell>
                  <Tooltip title='View Job'>
                    <IconButton
                      component={RouterLink}
                      href={`/dashboard/jobs/${job._id}`}
                    >
                      <Launch fontSize='small' />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </>
        )}
      </Table>
    </Card>
  )
}

export default EmployeeJobs
