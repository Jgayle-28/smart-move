import {
  Box,
  Card,
  Divider,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material'
import { useRef, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { EstimateSideBar } from './EstimateSideBar'
import MoveChargesForm from './services/MoveChargesForm'
import PackingForm from './services/PackingForm'
import AdditionalServicesForm from './services/AdditionalServicesForm'
import FeesForm from './services/FeesForm'
import StorageForm from './services/StorageForm'
import ServiceTotalsTable from './services/ServiceTotalsTable'
import { useSelector } from 'react-redux'

function Services({ toggleSidebar, sideBarOpen }) {
  const [currentService, setCurrentService] = useState('Move Charges')

  const { moveCharges, packing, fees } = useSelector((state) => state.estimates)

  const rootRef = useRef(null)

  const formik = useFormik({
    initialValues: {
      totalMen: moveCharges?.totalMen || '', // required
      totalTrucks: moveCharges?.totalTrucks || '', // required
      ratePerHour: moveCharges?.ratePerHour || '', // required
      driveTime: moveCharges?.driveTime || '',
      stairHours: moveCharges?.stairHours || '',
      longCarryHours: moveCharges?.longCarryHours || '',
      adjustmentTime: moveCharges?.adjustmentTime || '',
      packDate: packing?.packDate || null,
      packTime: packing?.packTime || null,
      tripFee: fees?.tripFee || 0,
      receivingFee: fees?.receivingFee || 0,
    },
    validationSchema: Yup.object({
      totalMen: Yup.string()
        .max(255)
        .required('Total number of men is required'),
      totalTrucks: Yup.string()
        .max(255)
        .required('Total number of trucks is required'),
      ratePerHour: Yup.string().max(255).required('Rate per hour is required'),
    }),
    // onSubmit: () => handleSubmit(),
  })

  console.log('formik :>> ', formik)

  return (
    <>
      <Grid container>
        <Grid
          xs={12}
          md={12}
          sx={{
            px: 3,
            mt: 3,
          }}
        >
          {/* <Card> */}
          {/* <Box
            display='flex'
            alignItems='center'
            direction='row'
            justifyContent='space-between'
            sx={{ padding: 2 }}
          > */}
          {/* <Typography sx={{ paddingLeft: 1 }} variant='h6'>
              Totals
            </Typography> */}
          {/* <Typography variant='caption' color='text.secondary'>
                WEIGHT (LBS) / VOLUME (CFT)
              </Typography> */}
          {/* </Box> */}
          {/* <Divider /> */}
          {/* <Box sx={{ p: 3 }}> */}
          <ServiceTotalsTable />
          {/* </Box> */}
          {/* </Card> */}
        </Grid>
      </Grid>
      <Box
        ref={rootRef}
        sx={{
          p: 3,
        }}
      >
        <Grid container spacing={3}>
          <Grid xs={12} md={4}>
            <EstimateSideBar
              currentTab='services'
              handleClick={setCurrentService}
              currentSelection={currentService}
              container={rootRef.current}
              onClose={toggleSidebar}
              open={sideBarOpen}
            />
          </Grid>
          <Grid xs={12} md={8}>
            <Card>
              {/* <Box
                display='flex'
                alignItems='center'
                direction='row'
                justifyContent='space-between'
                sx={{ padding: 2 }}
              >
                <div>
                  <Typography sx={{ paddingLeft: 1 }} variant='h6'>
                    Item List
                  </Typography>
                </div>
                <Stack alignItems='center' direction='row' spacing={1}>
                
                </Stack>
              </Box>
              <Divider /> */}
              <Box sx={{ padding: 2 }}>
                {currentService === 'Move Charges' && (
                  <MoveChargesForm formik={formik} />
                )}
                {currentService === 'Packing' && (
                  <PackingForm formik={formik} />
                )}
                {currentService === 'Additional Services' && (
                  <AdditionalServicesForm />
                )}
                {currentService === 'Storage' && <StorageForm />}
                {currentService === 'Fees' && <FeesForm formik={formik} />}
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Services
