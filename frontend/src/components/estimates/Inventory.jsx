import {
  AppBar,
  Box,
  Card,
  Divider,
  Tab,
  Tabs,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import {
  getRoomItems,
  addItem,
  deleteItem,
  removeItem,
} from 'src/utils/inventory'
import { EstimateSideBar } from './EstimateSideBar'
import ItemList from './inventory/ItemList'
import { a11yProps } from 'src/utils/a11y-props'
import { TabPanel } from '../shared/TabPanel'
import RoomItemsTable from './inventory/RoomItemsTable'
import AllRoomItemsTable from './inventory/AllRoomItemsTable'

function Inventory({ toggleSidebar, sideBarOpen }) {
  const [currentRoom, setCurrentRoom] = useState('Entryway')
  const [currentRoomItems, setCurrentRoomItems] = useState([])
  const [currentTotalRoom, setCurrentTotalRoom] = useState(0)
  const [inventory, setInventory] = useState([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  console.log('inventory :>> ', inventory)

  const rootRef = useRef(null)
  const inventoryItemRef = useRef(null)

  useLayoutEffect(() => {
    if (inventoryItemRef.current) {
      setDimensions({
        width: inventoryItemRef.current.offsetWidth,
        height: inventoryItemRef.current.offsetHeight,
      })
    }
  }, [])

  useEffect(() => {
    const tempItems = getRoomItems(currentRoom)
    updateRoomItems(tempItems)
  }, [currentRoom])

  useEffect(() => {
    if (inventory.length === 0) setCurrentTotalRoom(0)
  }, [inventory])

  const updateRoomItems = useCallback((items) => {
    setCurrentRoomItems(items)
  }, [])

  const handleTotalsRoomChange = (event, newValue) => {
    setCurrentTotalRoom(newValue)
  }

  const handleAddItemClick = (item) => {
    let room = currentRoom
    let volume = item.itemVolume || item.volume
    let weight = item.itemWeight || item.weight
    let name = item.itemName || item.name
    let itemAmt = 1
    let itemObj = {
      roomName: room,
      item: {
        name,
        itemAmt,
        volume,
        weight,
        calcVolume: volume,
        calcWeight: weight,
      },
    }

    // Update inventory using Util function
    const updatedInventory = addItem(itemObj, inventory)
    setInventory(updatedInventory)
  }

  const handleRemoveItemClick = (item) => {
    let room = currentRoom
    let volume = item.itemVolume || item.volume
    let weight = item.itemWeight || item.weight
    let name = item.itemName || item.name
    let itemAmt = 1
    let itemObj = {
      roomName: room,
      item: {
        name,
        itemAmt,
        volume,
        weight,
        calcVolume: volume,
        calcWeight: weight,
      },
    }

    // Update inventory using Util function
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
          <Grid xs={12} md={4}>
            <EstimateSideBar
              currentTab='inventory'
              container={rootRef.current}
              handleClick={setCurrentRoom}
              currentSelection={currentRoom}
              onClose={toggleSidebar}
              open={sideBarOpen}
            />
          </Grid>

          <Grid xs={12} md={8}>
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
                dimensions={dimensions}
                handleAddItemClick={handleAddItemClick}
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
      {inventory.length > 0 && (
        <Grid container>
          <Grid
            xs={12}
            md={12}
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
