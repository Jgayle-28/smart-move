import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material'
import React from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

function AdditionalServicesTable({ removeService, services }) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Service</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services &&
              services.map((item, i) => (
                <TableRow
                  key={i}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {item.serviceName}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {item.serviceAmount}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    <Tooltip title='Remove item'>
                      <HighlightOffIcon
                        onClick={() => removeService(item.serviceName)}
                        sx={{ cursor: 'pointer', color: 'error.main' }}
                        fontSize='small'
                      />
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default AdditionalServicesTable
