import { useEffect } from 'react'
import { Stack, TextField, Unstable_Grid2 as Grid, Box } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { Scrollbar } from 'src/components/scrollbar'
import { SeverityPill } from 'src/components/severity-pill'
import { Tip } from 'src/components/tip'
import { updateMoveCharges } from 'src/store/estimates/estimateSlice'
import {
  calculateMoveHours,
  calculateTotalHours,
  calculateTotalMoveCharges,
} from 'src/utils/services/move-charges'

function MoveChargesForm({ formik }) {
  const { moveCharges, totalWeight } = useSelector((state) => state.estimates)

  const dispatch = useDispatch()

  useEffect(() => {
    // Determine which part of estimate to update in redux
    if (
      formik.values.totalMen !== formik.initialValues.totalMen ||
      formik.values.totalTrucks !== formik.initialValues.totalTrucks ||
      formik.values.ratePerHour !== formik.initialValues.ratePerHour ||
      formik.values.driveTime !== formik.initialValues.driveTime ||
      formik.values.stairHours !== formik.initialValues.stairHours ||
      formik.values.longCarryHours !== formik.initialValues.longCarryHours ||
      formik.values.adjustmentTime !== formik.initialValues.adjustmentTime
    ) {
      // If criteria for generating move hours are met calculate hours and cost
      if (
        totalWeight &&
        formik.values.totalMen !== '' &&
        formik.values.totalTrucks !== '' &&
        formik.values.ratePerHour !== ''
      ) {
        // Calculate totals
        const moveHours = calculateMoveHours(
          totalWeight,
          formik.values.totalMen
        )
        const totalMoveHours = calculateTotalHours(
          moveHours,
          formik.values.driveTime !== '' ? formik.values.driveTime : 0,
          formik.values.stairHours !== '' ? formik.values.stairHours : 0,
          formik.values.longCarryHours !== ''
            ? formik.values.longCarryHours
            : 0,
          formik.values.adjustmentTime !== '' ? formik.values.adjustmentTime : 0
        )
        const totalMoveCost = calculateTotalMoveCharges(
          totalMoveHours,
          formik.values.ratePerHour
        )

        dispatch(
          updateMoveCharges({
            totalMen: formik.values.totalMen,
            totalTrucks: formik.values.totalTrucks,
            ratePerHour: formik.values.ratePerHour,
            driveTime: formik.values.driveTime,
            stairHours: formik.values.stairHours,
            longCarryHours: formik.values.longCarryHours,
            adjustmentTime: formik.values.adjustmentTime,
            moveHours,
            totalMoveHours,
            totalMoveCost,
          })
        )
      } else {
        dispatch(
          updateMoveCharges({
            totalMen: formik.values.totalMen,
            totalTrucks: formik.values.totalTrucks,
            ratePerHour: formik.values.ratePerHour,
            driveTime: formik.values.driveTime,
            stairHours: formik.values.stairHours,
            longCarryHours: formik.values.longCarryHours,
            adjustmentTime: formik.values.adjustmentTime,
            moveHours: '',
            totalMoveHours: '',
            totalMoveCost: '',
          })
        )
      }
    }
  }, [formik.values, totalWeight])

  return (
    <Box>
      <Scrollbar
        sx={{
          height: 400,
        }}
      >
        <Grid container spacing={3}>
          <Grid xs={12} md={12}>
            <Tip message='Make sure to add additional time for drive time, stairs, etc...' />
          </Grid>
          <Grid xs={12} md={6}>
            <TextField
              fullWidth
              label='Number Of Men'
              name='totalMen'
              variant='standard'
              type='number'
              error={!!(formik.touched.totalMen && formik.errors.totalMen)}
              helperText={formik.touched.totalMen && formik.errors.totalMen}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              required
              value={formik.values.totalMen}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <TextField
              fullWidth
              label='Number of Trucks'
              name='totalTrucks'
              variant='standard'
              type='number'
              error={
                !!(formik.touched.totalTrucks && formik.errors.totalTrucks)
              }
              helperText={
                formik.touched.totalTrucks && formik.errors.totalTrucks
              }
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              required
              value={formik.values.totalTrucks}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <TextField
              fullWidth
              label='Rate Per Hour'
              name='ratePerHour'
              variant='standard'
              type='number'
              error={
                !!(formik.touched.ratePerHour && formik.errors.ratePerHour)
              }
              helperText={
                formik.touched.ratePerHour && formik.errors.ratePerHour
              }
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.ratePerHour}
              required
            />
          </Grid>
          <Grid xs={12} md={6}>
            <TextField
              fullWidth
              label='Drive Time'
              name='driveTime'
              variant='standard'
              type='number'
              onChange={formik.handleChange}
              value={formik.values.driveTime}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <TextField
              fullWidth
              label='Stair Hours'
              name='stairHours'
              variant='standard'
              type='number'
              onChange={formik.handleChange}
              value={formik.values.stairHours}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <TextField
              fullWidth
              label='Long Carry Hours'
              name='longCarryHours'
              variant='standard'
              type='number'
              onChange={formik.handleChange}
              value={formik.values.longCarryHours}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <TextField
              fullWidth
              label='Adjustment Time'
              name='adjustmentTime'
              variant='standard'
              type='number'
              onChange={formik.handleChange}
              value={formik.values.adjustmentTime}
            />
          </Grid>
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
            <Stack direction='row' spacing={2}>
              <SeverityPill>
                Move Hours: {moveCharges?.moveHours ? moveCharges.moveHours : 0}
              </SeverityPill>
              <SeverityPill>
                Total Move Hours:{' '}
                {moveCharges?.totalMoveHours ? moveCharges.totalMoveHours : 0}
              </SeverityPill>
            </Stack>
            <SeverityPill color='success'>
              Total Move Charges:{' '}
              {moveCharges?.totalMoveCost
                ? `$${moveCharges.totalMoveCost.toLocaleString()}`
                : 0}
            </SeverityPill>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default MoveChargesForm
