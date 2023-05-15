import {
  Button,
  Stack,
  TextField,
  Unstable_Grid2 as Grid,
  Box,
} from '@mui/material'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Scrollbar } from 'src/components/scrollbar'
import { Tip } from 'src/components/tip'
import { updateStorage } from 'src/store/estimates/estimateSlice'
import StorageItemTable from './StorageItemTable'
import { SeverityPill } from 'src/components/severity-pill'

const initialValues = {
  storageItemName: '',
  storageItemQty: '',
  storageItemPrice: '',
  storageItemTime: '',
}

function StorageForm() {
  const [storageItems, setStorageItems] = useState([])
  const [storageItemObj, setStorageItemObj] = useState(initialValues)

  const { storage } = useSelector((state) => state.estimates)
  const dispatch = useDispatch()

  useEffect(() => {
    if (storage?.storageItems?.length > 0) {
      setStorageItems(storage.storageItems)
    }
  }, [storage])

  useEffect(() => {
    const storageObj = {
      storageItems,
      storageTotal: storageItems.reduce(
        (a, b) => a + parseFloat(b.storageItemTotal),
        0
      ),
    }
    dispatch(updateStorage(storageObj))
  }, [storageItems])

  const handleChange = (e) => {
    setStorageItemObj({ ...storageItemObj, [e.target.name]: e.target.value })
  }

  const addStorageItem = () => {
    const tempStorageItemObj = {
      ...storageItemObj,
      storageItemTotal:
        parseFloat(storageItemObj.storageItemPrice) *
        parseFloat(storageItemObj.storageItemTime) *
        parseFloat(storageItemObj.storageItemQty),
    }
    const updatedStorageItems = [...storageItems, tempStorageItemObj]
    setStorageItems(updatedStorageItems)
    setStorageItemObj(initialValues)
  }

  const removeStorageItem = (index) => {
    const updatedStorageItems = storageItems.filter((_, i) => i !== index)
    setStorageItems(updatedStorageItems)
  }

  return (
    <>
      <Box>
        <Scrollbar
          sx={{
            height: 400,
          }}
        >
          <Grid container spacing={3}>
            <Grid xs={12} md={12}>
              <Tip message='Use this section to calculate storage costs' />
            </Grid>
            <Grid xs={12} md={2}>
              <TextField
                fullWidth
                label='Item Name'
                name='storageItemName'
                variant='standard'
                size='small'
                onChange={handleChange}
                value={storageItemObj.storageItemName}
              />
            </Grid>
            <Grid xs={12} md={2}>
              <TextField
                fullWidth
                label='Item Quantity'
                name='storageItemQty'
                variant='standard'
                size='small'
                type='number'
                onChange={handleChange}
                value={storageItemObj.storageItemQty}
              />
            </Grid>
            <Grid xs={12} md={2}>
              <TextField
                fullWidth
                label='Rate Per Day'
                name='storageItemPrice'
                variant='standard'
                size='small'
                type='number'
                onChange={handleChange}
                value={storageItemObj.storageItemPrice}
              />
            </Grid>
            <Grid xs={12} md={3}>
              <TextField
                fullWidth
                label='Days In Storage'
                name='storageItemTime'
                variant='standard'
                size='small'
                type='number'
                onChange={handleChange}
                value={storageItemObj.storageItemTime}
              />
            </Grid>
            <Grid xs={12} md={2}>
              <Button variant='contained' onClick={addStorageItem}>
                Add
              </Button>
            </Grid>

            {storageItems.length > 0 && (
              <Grid xs={12} md={12}>
                <StorageItemTable
                  removeStorageItem={removeStorageItem}
                  storageItems={storageItems}
                />
              </Grid>
            )}
          </Grid>
        </Scrollbar>
        <Grid container spacing={3}>
          <Grid xs={12} md={12}>
            <Stack
              direction='row'
              spacing={2}
              alignItems='center'
              justifyContent='space-between'
            >
              <SeverityPill>
                Total Storage Items: {storageItems?.length || 0}
              </SeverityPill>
              <SeverityPill color='success'>
                Total Storage Charges: ${storage?.storageTotal || 0}
              </SeverityPill>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default StorageForm
