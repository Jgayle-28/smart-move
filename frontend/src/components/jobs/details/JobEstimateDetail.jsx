import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import {
  Box,
  Divider,
  Card,
  Stack,
  Typography,
  Grid2 as Grid,
} from '@mui/material'
import Spinner from 'src/components/shared/Spinner'
import InventoryAccordion from './InventoryAccordion'
import { SeverityPill } from 'src/components/severity-pill'

function JobEstimateDetail() {
  const { focusJob } = useSelector((state) => state.jobs)

  // Memoize values even if not immediately needed
  const estimateSummary = useMemo(() => {
    if (!focusJob.estimate) return null
    return {
      totalMoveHours: focusJob?.estimate?.moveCharges?.totalMoveHours || 0,
      totalWeight: focusJob?.estimate?.totalWeight || 0,
      totalVolume: focusJob?.estimate?.totalVolume || 0,
      totalItemCount: focusJob?.estimate?.totalItemCount || 0,
      totalCharges: focusJob.estimate.totalCharges || 0,
    }
  }, [focusJob])

  // Early return for no estimate, after Hooks are declared
  if (!focusJob.estimate)
    return (
      <Box sx={{ mt: 3 }}>
        <Card variant='outlined'>
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography textAlign='center' color='text.secondary'>
              Looks like you have not created an estimate for this job yet.
            </Typography>
          </Box>
        </Card>
      </Box>
    )

  return (
    <>
      <Grid container spacing={2} sx={{ p: 0, m: 0 }}>
        {/* Top */}
        <Grid item size={{ xs: 12 }}>
          <Stack direction='row' spacing={2}>
            <SeverityPill>
              Total Hours: {estimateSummary.totalMoveHours}
            </SeverityPill>
            <SeverityPill>
              Total Weight: {estimateSummary.totalWeight}
            </SeverityPill>
            <SeverityPill>
              Total Volume: {estimateSummary.totalVolume}
            </SeverityPill>
            <SeverityPill>
              Total Items: {estimateSummary.totalItemCount}
            </SeverityPill>
          </Stack>
        </Grid>
        {/* Left */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card variant='outlined'>
            <Box sx={{ p: 2 }}>
              <Typography variant='h6'>Total Charges</Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant='body2' color='text.secondary'>
                  Move Charges: $
                  {focusJob?.estimate?.moveCharges?.totalMoveCost?.toLocaleString() ||
                    0}
                </Typography>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ my: 1 }}
                >
                  Packing Charges: $
                  {focusJob?.estimate?.packing?.packingTotal?.toLocaleString() ||
                    0}
                </Typography>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ my: 1 }}
                >
                  Additional Services: $
                  {focusJob?.estimate?.additionalServices?.additionalServicesTotal?.toLocaleString() ||
                    0}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Storage Charges: $
                  {focusJob?.estimate?.storage?.storageTotal?.toLocaleString() ||
                    0}
                </Typography>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ my: 1 }}
                >
                  Fees: $
                  {focusJob?.estimate?.fees?.feesTotal?.toLocaleString() || 0}
                </Typography>
                <Divider />
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ my: 1 }}
                >
                  Move Total: ${estimateSummary?.totalCharges}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        {/* Right */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card variant='outlined'>
            <Box sx={{ p: 2 }}>
              <Typography variant='h6'>Inventory</Typography>
              <Box sx={{ mt: 2 }}>
                {focusJob?.estimate?.inventory?.map((room, i) => (
                  <InventoryAccordion room={room} key={i} />
                ))}
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default JobEstimateDetail

// import { useEffect } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import PropTypes from 'prop-types'
// import {
//   Box,
//   Divider,
//   Card,
//   Stack,
//   Typography,
//   Grid2 as Grid,
// } from '@mui/material'
// import { format } from 'date-fns'
// import Spinner from 'src/components/shared/Spinner'
// import { getEstimate } from 'src/store/estimates/estimateSlice'
// import InventoryAccordion from './InventoryAccordion'
// import { SeverityPill } from 'src/components/severity-pill'

// function JobEstimateDetail() {
//   const { focusJob } = useSelector((state) => state.jobs)
//   console.log('focusJob :>> ', focusJob)

//   // No estimate
//   if (!focusJob.estimate)
//     return (
//       <Box sx={{ mt: 3 }}>
//         <Card variant='outlined'>
//           <Box sx={{ px: 2, py: 1.5 }}>
//             <Typography textAlign='center' color='text.secondary'>
//               Looks like you have not created an estimate for this job yet.
//             </Typography>
//           </Box>
//         </Card>
//       </Box>
//     )
//   return (
//     <>
//       <Grid container spacing={2} sx={{ p: 0, m: 0 }}>
//         {/* Top */}
//         <Grid item xs={12}>
//           <Stack direction='row' spacing={2}>
//             <SeverityPill>
//               Total Hours: {focusJob?.estimate?.moveCharges?.totalMoveHours}
//             </SeverityPill>
//             <SeverityPill>
//               Total Weight: {focusJob?.estimate?.totalWeight}
//             </SeverityPill>
//             <SeverityPill>
//               Total Volume: {focusJob?.estimate?.totalVolume}
//             </SeverityPill>
//             <SeverityPill>
//               Total Items: {focusJob?.estimate?.totalItemCount}
//             </SeverityPill>
//           </Stack>
//         </Grid>
//         {/* Left */}
//         <Grid xs={12} lg={4}>
//           {/*----- Totals -----*/}
//           <Card variant='outlined'>
//             <Box sx={{ p: 2 }}>
//               <Typography variant='h6'>Total Charges</Typography>
//               <Box sx={{ mt: 2 }}>
//                 <Typography variant='body2' color='text.secondary'>
//                   Move Charges: $
//                   {focusJob?.estimate?.moveCharges?.totalMoveCost.toLocaleString() ||
//                     0}
//                 </Typography>
//                 <Typography
//                   variant='body2'
//                   color='text.secondary'
//                   sx={{ my: 1 }}
//                 >
//                   Packing Charges: $
//                   {focusJob?.estimate?.packing?.packingTotal.toLocaleString() ||
//                     0}
//                 </Typography>
//                 <Typography
//                   variant='body2'
//                   color='text.secondary'
//                   sx={{ my: 1 }}
//                 >
//                   Additional Services: $
//                   {focusJob?.estimate?.additionalServices?.additionalServicesTotal.toLocaleString() ||
//                     0}
//                 </Typography>
//                 <Typography variant='body2' color='text.secondary'>
//                   Storage Charges: $
//                   {focusJob?.estimate?.storage?.storageTotal.toLocaleString() ||
//                     0}
//                 </Typography>
//                 <Typography
//                   variant='body2'
//                   color='text.secondary'
//                   sx={{ my: 1 }}
//                 >
//                   Storage Charges: $
//                   {focusJob?.estimate?.fees?.feesTotal.toLocaleString() || 0}
//                 </Typography>
//                 <Divider />
//                 <Typography
//                   variant='body2'
//                   color='text.secondary'
//                   sx={{ my: 1 }}
//                 >
//                   Move Total: ${focusJob.estimate.totalCharges}
//                 </Typography>
//               </Box>
//             </Box>
//           </Card>
//         </Grid>
//         {/* Right */}
//         <Grid xs={12} lg={8}>
//           <Card variant='outlined'>
//             <Box sx={{ p: 2 }}>
//               <Typography variant='h6'>Inventory</Typography>
//               <Box sx={{ mt: 2 }}>
//                 {focusJob?.estimate?.inventory?.map((room, i) => (
//                   <InventoryAccordion room={room} key={i} />
//                 ))}
//               </Box>
//             </Box>
//           </Card>
//         </Grid>
//       </Grid>
//     </>
//   )
// }

// export default JobEstimateDetail
