import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import React, { Fragment } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { useSelector } from 'react-redux'
import { SeverityPill } from 'src/components/severity-pill'
import { Scrollbar } from 'src/components/scrollbar'

function AllRoomItemsTable({ addItem, removeItem, deleteItem, inventory }) {
  const { totalWeight, totalVolume, totalItemCount } = useSelector(
    (state) => state.estimates
  )
  return (
    <>
      <Stack
        direction='row'
        justifyContent='flex-end'
        spacing={2}
        sx={{ mb: 2 }}
      >
        <SeverityPill>Total weight (lbs): {totalWeight || 0}</SeverityPill>
        {/* </TableCell>
              <TableCell colSpan={2}> */}
        <SeverityPill> Total Volume (cft): {totalVolume || 0}</SeverityPill>
        {/* </TableCell>
              <TableCell colSpan={2}> */}
        <SeverityPill>Total Item Count: {totalItemCount || 0}</SeverityPill>
      </Stack>
      <TableContainer component={Paper}>
        <Scrollbar
          sx={{
            height: 500,
          }}
        >
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label='simple table'>
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
              {inventory &&
                inventory.map((room, i) => (
                  <Fragment key={i}>
                    {room.items.map((item, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell component='th' scope='row'>
                          {item.name}{' '}
                          <Typography variant='caption' color='primary'>
                            ({room.roomName})
                          </Typography>
                        </TableCell>
                        <TableCell align='center'>{item.itemAmt}</TableCell>
                        <TableCell align='center'>{item.weight}</TableCell>
                        <TableCell align='center'>{item.calcVolume}</TableCell>
                        <TableCell align='center'>{item.calcWeight}</TableCell>
                        <TableCell align='center'>
                          <Stack
                            direction='row'
                            spacing={1}
                            justifyContent='flex-end'
                          >
                            <Tooltip title='Add 1 more'>
                              <AddCircleOutlineIcon
                                onClick={() => addItem(item)}
                                sx={{
                                  cursor: 'pointer',
                                  color: 'success.main',
                                }}
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
                                  sx={{
                                    cursor: 'pointer',
                                    color: 'error.main',
                                  }}
                                  fontSize='small'
                                />
                              </Tooltip>
                            ) : (
                              <Tooltip title='Remove 1 item'>
                                <RemoveCircleOutlineIcon
                                  onClick={() => removeItem(item)}
                                  sx={{
                                    cursor: 'pointer',
                                    color: 'error.main',
                                  }}
                                  fontSize='small'
                                />
                              </Tooltip>
                            )}
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </Fragment>
                ))}
              {/* <TableRow>
              <TableCell rowSpan={3} />
              <TableCell rowSpan={3} />
              <TableCell rowSpan={3} />
              <TableCell rowSpan={3} />
              <TableCell colSpan={1}>Total weight (lbs)</TableCell>
              <TableCell align='right'>{totalWeight || 0}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={1}>Total Volume (cft)</TableCell>
              <TableCell align='right'>{totalVolume || 0}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={1}>Total Item Count</TableCell>
              <TableCell align='right'>{totalItemCount || 0}</TableCell>
            </TableRow> */}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
    </>
  )
}

export default AllRoomItemsTable
