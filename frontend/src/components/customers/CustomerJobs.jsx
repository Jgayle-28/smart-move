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

function CustomerJobs({ customerJobs }) {
  return (
    <Card>
      <CardHeader title={`Customer Jobs (${customerJobs.length})`}></CardHeader>
      <Table>
        {customerJobs?.length === 0 ? (
          <TableRow>
            <TableCell>
              <Card variant='outlined'>
                <Box sx={{ px: 2, py: 1.5 }}>
                  <Typography textAlign='center' color='text.secondary'>
                    Customer does not have any previous jobs
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
                <TableCell>Date</TableCell>
                <TableCell>PU Address</TableCell>
                <TableCell>DO Address</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            {customerJobs.map((job) => (
              <TableRow
                key={job._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <SeverityPill>{job.jobType}</SeverityPill>
                </TableCell>
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

export default CustomerJobs
