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

function PackingItemsTable({ removePackingItem, packingItems }) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Material</TableCell>
              <TableCell>Item Qty</TableCell>
              <TableCell>Item Price</TableCell>
              <TableCell>Item Total</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packingItems &&
              packingItems.map((item, i) => (
                <TableRow
                  key={i}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {item.packingItem}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {item.packingItemQty}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    ${item.packingItemPrice}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    ${item.packingTotalItemAmt}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    <Tooltip title='Remove item'>
                      <HighlightOffIcon
                        onClick={() => removePackingItem(item.packingItem)}
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

export default PackingItemsTable
