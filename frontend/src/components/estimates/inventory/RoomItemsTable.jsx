import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Tooltip,
} from '@mui/material'
import React from 'react'
import {
  generateTotalItems,
  generateTotalVolume,
  generateTotalWeight,
} from 'src/utils/inventory/generate-room-totals'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

function RoomItemsTable({ addItem, removeItem, deleteItem, room }) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Item Description</TableCell>
              <TableCell align='center'>Qty</TableCell>
              <TableCell align='center'>Weight(LBS)</TableCell>
              <TableCell align='center'>Calculated Volume(CFT)</TableCell>
              <TableCell align='center'>Calculated Weight(LBS)</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {room.items.map((item, i) => (
              <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {item.name}
                </TableCell>
                <TableCell align='center'>{item.itemAmt}</TableCell>
                <TableCell align='center'>{item.weight}</TableCell>
                <TableCell align='center'>{item.calcVolume}</TableCell>
                <TableCell align='center'>{item.calcWeight}</TableCell>
                <TableCell align='right'>
                  <Stack direction='row' spacing={1} justifyContent='flex-end'>
                    <Tooltip title='Add 1 more'>
                      <AddCircleOutlineIcon
                        onClick={() => addItem(item)}
                        sx={{ cursor: 'pointer', color: 'success.main' }}
                        fontSize='small'
                      />
                    </Tooltip>

                    {parseInt(item.itemAmt) === 1 ? (
                      <Tooltip title='Delete item'>
                        <HighlightOffIcon
                          onClick={() =>
                            deleteItem({
                              roomName: room.roomName,
                              itemName: item.name,
                            })
                          }
                          sx={{ cursor: 'pointer', color: 'error.main' }}
                          fontSize='small'
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title='Remove 1 item'>
                        <RemoveCircleOutlineIcon
                          onClick={() => removeItem(item)}
                          sx={{ cursor: 'pointer', color: 'error.main' }}
                          fontSize='small'
                        />
                      </Tooltip>
                    )}
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell rowSpan={3} />
              <TableCell rowSpan={3} />
              <TableCell rowSpan={3} />
              <TableCell colSpan={1}>Total weight (lbs)</TableCell>
              <TableCell align='right'>
                {generateTotalWeight(room.items)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={1}>Total Volume (cft)</TableCell>
              <TableCell align='right'>
                {generateTotalVolume(room.items)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={1}>Total Item Count</TableCell>
              <TableCell align='right'>
                {generateTotalItems(room.items)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default RoomItemsTable
