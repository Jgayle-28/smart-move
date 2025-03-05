import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  Grid2 as Grid,
  Box,
  Typography,
  Divider,
} from '@mui/material'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Scrollbar } from 'src/components/scrollbar'
import { Tip } from 'src/components/tip'
import FeesItemTable from './FeesItemTable'
import { updateFees } from 'src/store/estimates/estimateSlice'
import { SeverityPill } from 'src/components/severity-pill'

const initialValues = { feeName: '', feeAmount: '' }

function FeesForm({ formik }) {
  const [feeItems, setFeeItems] = useState([])
  const [feeObj, setFeeObj] = useState(initialValues)

  const { fees } = useSelector((state) => state.estimates)
  const dispatch = useDispatch()

  useEffect(() => {
    if (fees?.additionalFees?.length > 0) {
      setFeeItems(fees.additionalFees)
    }
  }, [fees])

  useEffect(() => {
    const { tripFee, receivingFee } = formik.values
    const tempFeeTotal =
      feeItems.reduce((a, b) => a + parseFloat(b.feeAmount), 0) +
      parseFloat(tripFee) +
      parseFloat(receivingFee)

    const feesObj = {
      tripFee: tripFee,
      receivingFee: receivingFee,
      additionalFees: feeItems,
      feesTotal: tempFeeTotal,
    }
    dispatch(updateFees(feesObj))
  }, [feeItems, formik.values])

  const handleChange = (e) => {
    setFeeObj({ ...feeObj, [e.target.name]: e.target.value })
  }

  const handleAddFeeItem = () => {
    setFeeItems([...feeItems, feeObj])
    setFeeObj(initialValues)
  }

  const handleRemoveFeeItem = (index) => {
    const updatedFeeItems = feeItems.filter((_, i) => i !== index)
    setFeeItems(updatedFeeItems)
  }

  const calculateTotalFeeItems = () => {
    let totalFeeItems = 0
    totalFeeItems = feeItems?.length
    if (formik.values.tripFee !== 0) {
      totalFeeItems += 1
    }
    if (formik.values.receivingFee !== 0) {
      totalFeeItems += 1
    }
    return totalFeeItems
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
            <Grid size={{ xs: 12, md: 12 }}>
              <Tip message='Add any additional fees here.' />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                label='Trip Fee'
                name='tripFee'
                variant='standard'
                size='small'
                type='number'
                onChange={formik.handleChange}
                value={formik.values.tripFee}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                label='Receiving Fee'
                name='receivingFee'
                variant='standard'
                size='small'
                type='number'
                onChange={formik.handleChange}
                value={formik.values.receivingFee}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
              <Divider />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                label='Fee'
                name='feeName'
                variant='standard'
                size='small'
                onChange={handleChange}
                value={feeObj.feeName}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                label='Amount'
                name='feeAmount'
                variant='standard'
                size='small'
                type='number'
                onChange={handleChange}
                value={feeObj.feeAmount}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <Button variant='contained' onClick={handleAddFeeItem}>
                Add Fee
              </Button>
            </Grid>
            {feeItems.length > 0 && (
              <Grid size={{ xs: 12, md: 12 }}>
                <FeesItemTable
                  feeItems={feeItems}
                  removeFeeItem={handleRemoveFeeItem}
                />
              </Grid>
            )}
          </Grid>
        </Scrollbar>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 12 }}>
            <Stack
              direction='row'
              spacing={2}
              alignItems='center'
              justifyContent='space-between'
            >
              <SeverityPill>
                Total Fee Items: {calculateTotalFeeItems() || 0}
              </SeverityPill>
              <SeverityPill color='success'>
                Total Fee Charges: ${fees?.feesTotal || 0}
              </SeverityPill>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default FeesForm
