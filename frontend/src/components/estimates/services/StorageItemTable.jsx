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

function StorageItemTable({ removeStorageItem, storageItems }) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Rate Per Day</TableCell>
              <TableCell>Days In Storage</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {storageItems &&
              storageItems.map((item, i) => (
                <TableRow
                  key={i}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {item.storageItemName}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {item.storageItemQty}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    ${item.storageItemPrice.toLocaleString()}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {item.storageItemTime}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    ${item.storageItemTotal.toLocaleString()}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    <Tooltip title='Remove item'>
                      <HighlightOffIcon
                        onClick={() => removeStorageItem(i)}
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

export default StorageItemTable
