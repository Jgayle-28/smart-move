import { motion } from 'framer-motion'
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded'
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined'
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Grid2 as Grid,
  Dialog,
} from '@mui/material'
import { Seo } from 'src/components/seo'
import { usePageView } from 'src/hooks/use-page-view'
import { useSettings } from 'src/hooks/use-settings'
import { Layout as DashboardLayout } from 'src/layouts/dashboard'
import { NewClients } from 'src/components/dashboard/NewClients'
import { NewEstimates } from 'src/components/dashboard/NewEstimates'
import { OverviewTotalJobsPerMonth } from 'src/sections/dashboard/monthly-job-overview'
import { OverviewHelp } from 'src/sections/dashboard/overview-help'
import { NewJobs } from 'src/components/dashboard/NewJobs'
import { RouterLink } from 'src/components/router-link'
import { useDispatch, useSelector } from 'react-redux'
import { RecentCustomers } from 'src/components/dashboard/RecentCustomers'
import Spinner from 'src/components/shared/Spinner'
import { RecentJobs } from 'src/components/dashboard/RecentJobs'
import {
  containerVariants,
  itemVariants,
} from 'src/constants/page-animation-variants'
import { CustomerForm } from 'src/components/customers/CustomerForm'
import { useState } from 'react'
import {
  getCurrentWeekCustomers,
  getCustomers,
} from 'src/store/customers/customerSlice'

const now = new Date()

const Page = () => {
  // State ------------------------------------------------------
  const [customerModalOpen, setCustomerModalOpen] = useState(false)
  // Hooks -------------------------------------------------------------------
  const settings = useSettings()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { company } = useSelector((state) => state.company)
  const { customers } = useSelector((state) => state.customers)
  const { currentWeekJobs, annualJobs } = useSelector((state) => state.jobs)
  const { currentWeekEstimates } = useSelector((state) => state.estimates)

  usePageView()

  // Handlers ----------------------------------------------------
  const fetchCustomers = async () => {
    dispatch(getCustomers(user?.company))
      .unwrap()
      .then(() => {
        setCustomerModalOpen(false)
      })
      .catch((err) => console.error(err))
  }

  const fetchCurrentWeekCustomers = async () => {
    dispatch(getCurrentWeekCustomers(user?.company))
      .unwrap()
      .then(() => {
        setCustomerModalOpen(false)
      })
      .catch((err) => console.error(err))
  }

  const addCustomerCallback = async () => {
    try {
      await fetchCustomers()
      await fetchCurrentWeekCustomers()
      setCustomerModalOpen(false)
    } catch (error) {
      console.error('Error adding customer:', error)
      setCustomerModalOpen(false)
    }
  }

  if (
    !user ||
    !company ||
    !customers ||
    !currentWeekJobs ||
    !annualJobs ||
    !currentWeekEstimates
  ) {
    return <Spinner />
  }
  return (
    <>
      <Seo title='Dashboard' />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container
          maxWidth={settings.stretch ? false : 'xl'}
          component={motion.div}
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          <Grid
            container
            disableEqualOverflow
            spacing={{
              xs: 3,
              lg: 4,
            }}
          >
            {/* Header & title */}
            <Grid
              size={{ xs: 12 }}
              component={motion.div}
              variants={itemVariants}
            >
              <Stack direction='row' justifyContent='space-between' spacing={4}>
                <div>
                  <Typography variant='h4'>Dashboard</Typography>
                </div>
                <div>
                  <Stack direction='row' spacing={2}>
                    <Button
                      onClick={() => setCustomerModalOpen(true)}
                      startIcon={
                        <SvgIcon>
                          <PersonAddAlt1RoundedIcon />
                        </SvgIcon>
                      }
                      variant='outlined'
                      size='small'
                    >
                      Add Customer
                    </Button>
                    <Button
                      component={RouterLink}
                      href='/dashboard/jobs/create'
                      startIcon={
                        <SvgIcon>
                          <AddLocationAltOutlinedIcon />
                        </SvgIcon>
                      }
                      variant='contained'
                      size='small'
                    >
                      Add Job
                    </Button>
                  </Stack>
                </div>
              </Stack>
            </Grid>

            {/* Stat Cards */}
            <Grid
              size={{ xs: 12, md: 4 }}
              component={motion.div}
              variants={itemVariants}
            >
              <NewClients amount={31} />
            </Grid>
            <Grid
              size={{ xs: 12, md: 4 }}
              component={motion.div}
              variants={itemVariants}
            >
              <NewJobs amount={5} />
            </Grid>
            <Grid
              size={{ xs: 12, md: 4 }}
              component={motion.div}
              variants={itemVariants}
            >
              <NewEstimates amount={12} />
            </Grid>

            {/* Overview */}
            <Grid
              size={{ xs: 12, md: 7 }}
              component={motion.div}
              variants={itemVariants}
            >
              <RecentJobs />
            </Grid>
            <Grid
              size={{ xs: 12, md: 5 }}
              component={motion.div}
              variants={itemVariants}
            >
              <RecentCustomers customers={customers} />
            </Grid>
            <Grid
              size={{ xs: 12 }}
              component={motion.div}
              variants={itemVariants}
            >
              <OverviewTotalJobsPerMonth />
            </Grid>
            <Grid xs={12} md={5} component={motion.div} variants={itemVariants}>
              <OverviewHelp />
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* Customer Modal ---------------------------- */}
      <Dialog
        open={customerModalOpen}
        onClose={() => setCustomerModalOpen(false)}
      >
        <CustomerForm
          isEdit={false}
          onClose={() => setCustomerModalOpen(false)}
          callBack={addCustomerCallback}
        />
      </Dialog>
    </>
  )
}

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Page
