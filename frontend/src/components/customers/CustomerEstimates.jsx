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
import { SeverityPill } from '../severity-pill'
import { Launch } from '@mui/icons-material'
import { RouterLink } from '../router-link'

function CustomerEstimates({ customerEstimates }) {
  return (
    <Card>
      <CardHeader
        title={`Customer Estimates (${customerEstimates.length})`}
      ></CardHeader>
      <Table>
        {customerEstimates?.length === 0 ? (
          <TableRow>
            <TableCell>
              <Card variant='outlined'>
                <Box sx={{ px: 2, py: 1.5 }}>
                  <Typography textAlign='center' color='text.secondary'>
                    Customer does not have any previous estimates
                  </Typography>
                </Box>{' '}
              </Card>
            </TableCell>
          </TableRow>
        ) : (
          <>
            <TableHead>
              <TableRow>
                <TableCell>Charges</TableCell>
                <TableCell>Item Count</TableCell>
                <TableCell>Weight</TableCell>
                <TableCell>Volume</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            {customerEstimates.map((estimate) => (
              <TableRow
                key={estimate._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <SeverityPill color='success'>
                    ${estimate.totalCharges || ''}
                  </SeverityPill>
                </TableCell>
                <TableCell>{estimate.totalItemCount || ''}</TableCell>
                <TableCell>{estimate.totalWeight || ''}</TableCell>
                <TableCell>{estimate.totalVolume || ''}</TableCell>
                <TableCell>
                  <Tooltip title='View Estimate'>
                    <IconButton
                      component={RouterLink}
                      href={`/dashboard/estimates/${estimate.job}/edit/${estimate._id}`}
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
export default CustomerEstimates
