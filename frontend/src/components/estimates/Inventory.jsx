import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Box,
  Card,
  Divider,
  Tab,
  Tabs,
  Typography,
  Grid2 as Grid,
} from '@mui/material'
import {
  getRoomItems,
  addItem,
  deleteItem,
  removeItem,
  generateItemObj,
} from 'src/utils/inventory'
import { EstimateSideBar } from './EstimateSideBar'
import ItemList from './inventory/ItemList'
import { a11yProps } from 'src/utils/a11y-props'
import { TabPanel } from '../shared/TabPanel'
import RoomItemsTable from './inventory/RoomItemsTable'
import AllRoomItemsTable from './inventory/AllRoomItemsTable'
import { updateTotals } from 'src/store/estimates/estimateSlice'
import { useDispatch, useSelector } from 'react-redux'
import {
  generateTotalItems,
  generateTotalVolume,
  generateTotalWeight,
} from 'src/utils/inventory/generate-all-room-totals'
import {
  clearInventoryItems,
  getInventoryItems,
} from 'src/store/inventory/inventorySlice'

function Inventory({ tempInventoryRef, toggleSidebar, sideBarOpen }) {
  const [currentRoom, setCurrentRoom] = useState('Entryway')
  const [currentRoomItems, setCurrentRoomItems] = useState([])
  const [currentTotalRoom, setCurrentTotalRoom] = useState(0)
  const [inventory, setInventory] = useState([])

  const inventoryRef = useRef([])
  const rootRef = useRef(null)

  const { user } = useSelector((state) => state.auth)
  const { inventoryItems } = useSelector((state) => state.inventory)
  const { tempInventory } = useSelector((state) => state.estimates)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getInventoryItems(user.company))
    return () => {
      dispatch(clearInventoryItems())
    }
  }, [])

  // Set inventory from redux on tab changes
  useEffect(() => {
    if (tempInventory?.length && !inventory.length) {
      setInventory([...tempInventory])
    }
  }, [tempInventory])

  // set custom inventory items or regular room items
  useEffect(() => {
    let tempItems
    if (currentRoom === 'Custom Inventory') {
      tempItems = inventoryItems
    } else {
      tempItems = getRoomItems(currentRoom)
    }
    updateRoomItems(tempItems)
  }, [currentRoom])

  useEffect(() => {
    if (inventory.length === 0) {
      setCurrentTotalRoom(0)
    } else {
      const totalWeight = generateTotalWeight(inventory)
      const totalVolume = generateTotalVolume(inventory)
      const totalItemCount = generateTotalItems(inventory)
      dispatch(updateTotals({ totalWeight, totalVolume, totalItemCount }))
    }
    inventoryRef.current = inventory
    tempInventoryRef.current = inventory
  }, [inventory])

  const updateRoomItems = useCallback((items) => {
    setCurrentRoomItems(items)
  }, [])

  const handleTotalsRoomChange = (event, newValue) => {
    setCurrentTotalRoom(newValue)
  }

  const handleAddItemClick = (item) => {
    let itemObj = generateItemObj(item, currentRoom)

    const updatedInventory = addItem(itemObj, inventory)
    setInventory(updatedInventory)
  }

  const handleRemoveItemClick = (item) => {
    let itemObj = generateItemObj(item, currentRoom)

    const updatedInventory = removeItem(itemObj, inventory)
    setInventory(updatedInventory)
  }

  const handleDeletedItemClick = (data) => {
    const updatedInventory = deleteItem(data.roomName, data.itemName, inventory)
    setInventory(updatedInventory)
  }

  return (
    <>
      <Box
        ref={rootRef}
        sx={{
          p: 3,
        }}
      >
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <EstimateSideBar
              currentTab='inventory'
              container={rootRef.current}
              handleClick={setCurrentRoom}
              currentSelection={currentRoom}
              onClose={toggleSidebar}
              open={sideBarOpen}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Card>
              <Box
                display='flex'
                alignItems='center'
                direction='row'
                justifyContent='space-between'
                sx={{ padding: 2 }}
              >
                <Typography sx={{ paddingLeft: 1 }} variant='h6'>
                  Item List
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  WEIGHT (LBS) / VOLUME (CFT)
                </Typography>
              </Box>
              <Divider />
              <ItemList
                currentRoomItems={currentRoomItems}
                handleAddItemClick={handleAddItemClick}
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
      {inventory.length > 0 && (
        <Grid container>
          <Grid
            size={{ xs: 12, md: 12 }}
            sx={{
              px: 3,
              mb: 3,
            }}
          >
            <Card>
              <Tabs
                value={currentTotalRoom || 0}
                onChange={handleTotalsRoomChange}
                variant='scrollable'
                scrollButtons='auto'
                sx={{ px: 3 }}
              >
                <Tab label='All Rooms' {...a11yProps(0)} />
                {inventory.map((room, i) => (
                  <Tab {...a11yProps(i + 1)} label={room.roomName} key={i} />
                ))}
              </Tabs>
              <Divider />
              <TabPanel value={currentTotalRoom} index={0}>
                <AllRoomItemsTable
                  addItem={handleAddItemClick}
                  removeItem={handleRemoveItemClick}
                  deleteItem={handleDeletedItemClick}
                  inventory={inventory}
                />
              </TabPanel>
              {inventory.map((room, index) => (
                <TabPanel
                  value={currentTotalRoom}
                  key={index + 1}
                  index={index + 1}
                >
                  <RoomItemsTable
                    addItem={handleAddItemClick}
                    removeItem={handleRemoveItemClick}
                    deleteItem={handleDeletedItemClick}
                    room={room}
                  />
                </TabPanel>
              ))}
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default Inventory
