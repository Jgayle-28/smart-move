import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  Unstable_Grid2 as Grid,
  Box,
  Typography,
} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { Scrollbar } from 'src/components/scrollbar'
import { SeverityPill } from 'src/components/severity-pill'
import { Tip } from 'src/components/tip'
import AdditionalServicesTable from './AdditionalServicesTable'
import {
  addServiceItem,
  removeServiceItem,
} from 'src/utils/services/additional-services'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { updateAdditionalServices } from 'src/store/estimates/estimateSlice'

const initialValues = { serviceName: '', serviceAmount: '' }

function AdditionalServicesForm() {
  const [services, setServices] = useState([])
  const [serviceObj, setServiceObj] = useState(initialValues)

  const { additionalServices } = useSelector((state) => state.estimates)
  const dispatch = useDispatch()

  useEffect(() => {
    if (additionalServices?.services?.length > 0) {
      setServices(additionalServices.services)
    }
  }, [additionalServices])

  useEffect(() => {
    const additionalServicesObj = {
      services,
      additionalServicesTotal: services.reduce(
        (a, b) => a + parseFloat(b.serviceAmount),
        0
      ),
    }
    dispatch(updateAdditionalServices(additionalServicesObj))
  }, [services])

  const handleChange = (e) => {
    setServiceObj({ ...serviceObj, [e.target.name]: e.target.value })
  }

  const addService = () => {
    if (!serviceObj.serviceName || !serviceObj.serviceAmount) {
      toast.error('Please enter a service name and amount.')
      return
    }
    const updatedServices = addServiceItem(services, serviceObj)
    setServices(updatedServices)
    setServiceObj(initialValues)
  }

  const removeService = (serviceName) => {
    const updatedServices = removeServiceItem(services, serviceName)
    setServices(updatedServices)
    setServiceObj(initialValues)
  }

  return (
    <>
      <Box>
        <Scrollbar
          sx={{
            minHeight: 400,
            maxHeight: 500,
          }}
        >
          <Grid container spacing={3}>
            <Grid xs={12} md={12}>
              <Tip message='Add any services that you will perform here.' />
            </Grid>
            <Grid xs={12} md={3}>
              <TextField
                fullWidth
                label='Service'
                name='serviceName'
                variant='standard'
                size='small'
                value={serviceObj.serviceName}
                onChange={handleChange}
              />
            </Grid>
            <Grid xs={12} md={3}>
              <TextField
                fullWidth
                label='Amount'
                name='serviceAmount'
                variant='standard'
                size='small'
                value={serviceObj.serviceAmount}
                onChange={handleChange}
              />
            </Grid>
            <Grid xs={12} md={3}>
              <Button variant='contained' onClick={addService}>
                Add Service
              </Button>
            </Grid>

            {services.length > 0 && (
              <Grid xs={12} md={12}>
                <AdditionalServicesTable
                  services={services}
                  removeService={removeService}
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
                Total Additional Fees: {services?.length || 0}
              </SeverityPill>
              <SeverityPill color='success'>
                Total Packing Charges: $
                {additionalServices?.additionalServicesTotal || 0}
              </SeverityPill>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default AdditionalServicesForm
