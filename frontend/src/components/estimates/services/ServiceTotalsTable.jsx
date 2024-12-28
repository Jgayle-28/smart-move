import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import React from 'react'
import { SeverityPill } from 'src/components/severity-pill'
import { useSelector } from 'react-redux'
import { calculateTotalMoveCost } from 'src/utils/services/move-charges'

function ServiceTotalsTable() {
  const { moveCharges, packing, additionalServices, fees, storage } =
    useSelector((state) => state.estimates)
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Move Charges</TableCell>
              <TableCell>Packing</TableCell>
              <TableCell>Additional Services</TableCell>
              <TableCell>Storage</TableCell>
              <TableCell>Fees</TableCell>
              <TableCell>Total Move Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                $
                {moveCharges?.totalMoveCost
                  ? moveCharges.totalMoveCost.toLocaleString()
                  : 0}
              </TableCell>
              <TableCell component='th' scope='row'>
                ${packing?.packingTotal?.toLocaleString() || 0}
              </TableCell>
              <TableCell component='th' scope='row'>
                $
                {additionalServices?.additionalServicesTotal?.toLocaleString() ||
                  0}
              </TableCell>
              <TableCell component='th' scope='row'>
                ${storage?.storageTotal?.toLocaleString() || 0}
              </TableCell>
              <TableCell component='th' scope='row'>
                ${fees?.feesTotal?.toLocaleString() || 0}
              </TableCell>
              <TableCell component='th' scope='row'>
                <SeverityPill color='success'>
                  ${' '}
                  {calculateTotalMoveCost(
                    moveCharges?.totalMoveCost,
                    packing?.packingTotal,
                    additionalServices?.additionalServicesTotal,
                    fees?.feesTotal,
                    storage?.storageTotal
                  )}
                </SeverityPill>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default ServiceTotalsTable
