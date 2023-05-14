import {
  Button,
  Stack,
  TextField,
  Unstable_Grid2 as Grid,
  Box,
  Divider,
} from '@mui/material'
import { MobileDatePicker, MobileTimePicker } from '@mui/x-date-pickers'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Scrollbar } from 'src/components/scrollbar'
import { Tip } from 'src/components/tip'
import {
  addPackingItem,
  calculateTotalPackingFees,
  removePackingItem,
} from 'src/utils/services/packing'
import PackingItemsTable from './PackingItemsTable'
import { useSelector, useDispatch } from 'react-redux'
import { SeverityPill } from 'src/components/severity-pill'
import { updatePacking } from 'src/store/estimates/estimateSlice'

const initialItemValues = {
  packingItem: '',
  packingItemQty: '',
  packingItemPrice: '',
}

function PackingForm({ formik }) {
  const [packingItems, setPackingItems] = useState([])
  const [packingObj, setPackingObj] = useState(initialItemValues)
  const { packingItem, packingItemQty, packingItemPrice } = packingObj

  const { packing } = useSelector((state) => state.estimates)
  const dispatch = useDispatch()

  useEffect(() => {
    if (packing?.packingItems.length > 0) {
      setPackingItems(packing.packingItems)
    }
  }, [packing])

  useEffect(() => {
    const packingObj = {
      packDate: formik.values.packDate,
      packTime: formik.values.packTime,
      packingItems,
      packingTotal: packingItems.reduce(
        (a, b) => a + parseFloat(b.packingTotalItemAmt),
        0
      ),
    }
    dispatch(updatePacking(packingObj))
  }, [formik.values, packingItems])

  const handleChange = (field, value) => {
    formik.setFieldValue(field, value)
  }

  const updatePackingItem = (e) => {
    const { value, name } = e.target
    setPackingObj((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const updatePackingItems = () => {
    // Make sure all fields are filled out
    if (
      !packingItem.length ||
      !packingItemQty.length ||
      !packingItemPrice.length
    ) {
      return toast.error('Please fill out all fields')
    }
    const updatedItems = addPackingItem(packingItems, packingObj)
    setPackingItems(updatedItems)
    setPackingObj(initialItemValues)
  }

  const deletePackingItem = (item) => {
    const updatedItems = removePackingItem(packingItems, item)
    setPackingItems(updatedItems)
    setPackingObj(initialItemValues)
  }

  return (
    <>
      <Box>
        <Scrollbar
          sx={{
            maxHeight: 500,
          }}
        >
          <Grid container spacing={3}>
            <Grid xs={12} md={12}>
              <Tip message='If you plan on using any purchased materials add them hear.' />
            </Grid>
            <Grid xs={6} md={6}>
              <MobileDatePicker
                name='packDate'
                label='Pack Date'
                inputFormat='MM/dd/yyyy'
                onChange={(date) => handleChange('packDate', date)}
                renderInput={(inputProps) => <TextField {...inputProps} />}
                value={
                  formik.values.packDate !== null
                    ? formik.values.packDate
                    : new Date()
                }
              />
            </Grid>
            <Grid xs={6} md={6}>
              <MobileTimePicker
                name='packTime'
                label='Pack Time'
                inputFormat='hh:mm aa'
                renderInput={(inputProps) => <TextField {...inputProps} />}
                onChange={(time) => handleChange('packTime', time)}
                value={
                  formik.values.packTime !== null
                    ? formik.values.packTime
                    : new Date()
                }
              />
            </Grid>
            <Grid xs={12} md={12}>
              <Divider />
            </Grid>
            <Grid xs={12} md={3}>
              <TextField
                fullWidth
                label='Material'
                name='packingItem'
                variant='standard'
                size='small'
                onChange={updatePackingItem}
                value={packingObj.packingItem}
              />
            </Grid>
            <Grid xs={12} md={3}>
              <TextField
                fullWidth
                label='Item Quantity'
                name='packingItemQty'
                type='number'
                variant='standard'
                size='small'
                onChange={updatePackingItem}
                value={packingObj.packingItemQty}
              />
            </Grid>
            <Grid xs={12} md={3}>
              <TextField
                fullWidth
                label='Item Price'
                name='packingItemPrice'
                type='number'
                variant='standard'
                size='small'
                onChange={updatePackingItem}
                value={packingObj.packingItemPrice}
              />
            </Grid>
            <Grid xs={12} md={2}>
              <Button variant='contained' onClick={updatePackingItems}>
                Add
              </Button>
            </Grid>

            {packingItems.length > 0 && (
              <Grid xs={12} md={12}>
                <PackingItemsTable
                  removePackingItem={deletePackingItem}
                  packingItems={packingItems}
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
                Total Packing Items: {packingItems.length || 0}
              </SeverityPill>
              <SeverityPill color='success'>
                Total Packing Charges: ${packing?.packingTotal || 0}
              </SeverityPill>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default PackingForm
