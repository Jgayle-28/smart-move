import { useEffect } from 'react'
import { addDays, subDays, subHours, subMinutes } from 'date-fns'
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded'
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined'
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material'
import { Seo } from 'src/components/seo'
import { usePageView } from 'src/hooks/use-page-view'
import { useSettings } from 'src/hooks/use-settings'
import { Layout as DashboardLayout } from 'src/layouts/dashboard'
import { OverviewBanner } from 'src/sections/dashboard/overview/overview-banner'
import { NewClients } from 'src/components/dashboard/NewClients'
import { OverviewEvents } from 'src/sections/dashboard/overview/overview-events'
import { OverviewInbox } from 'src/sections/dashboard/overview/overview-inbox'
import { OverviewTransactions } from 'src/sections/dashboard/overview/overview-transactions'
import {
  NewEstimates,
  OverviewPendingIssues,
} from 'src/components/dashboard/NewEstimates'
import { OverviewSubscriptionUsage } from 'src/sections/dashboard/overview/overview-subscription-usage'
import { OverviewHelp } from 'src/sections/dashboard/overview/overview-help'
import { OverviewJobs } from 'src/sections/dashboard/overview/overview-jobs'
import { NewJobs } from 'src/components/dashboard/NewJobs'
import { OverviewTips } from 'src/sections/dashboard/overview/overview-tips'
import { RouterLink } from 'src/components/router-link'
import { useDispatch, useSelector } from 'react-redux'
import { getCompany } from 'src/store/company/companySlice'
import { RecentCustomers } from 'src/components/dashboard/RecentCustomers'
import {
  clearCustomers,
  getCurrentWeekCustomers,
  getCustomers,
} from 'src/store/customers/customerSlice'
import Spinner from 'src/components/shared/Spinner'
import { getAnnualJobs, getCurrentWeekJobs } from 'src/store/jobs/jobSlice'
import { getCurrentWeekEstimates } from 'src/store/estimates/estimateSlice'

const now = new Date()

const Page = () => {
  // Hooks -------------------------------------------------------------------
  const settings = useSettings()
  const { user } = useSelector((state) => state.auth)
  const { company } = useSelector((state) => state.company)
  const { customers } = useSelector((state) => state.customers)
  const { currentWeekJobs, annualJobs } = useSelector((state) => state.jobs)
  const { currentWeekEstimates } = useSelector((state) => state.estimates)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!company) {
      dispatch(getCompany(user?.company))
    }
    if (!customers) {
      dispatch(getCustomers(user?.company))
    }
    // Get dashboard stat data
    if (user) {
      getDashboardData()
    }

    return () => {
      dispatch(clearCustomers())
    }
  }, [company, user])

  usePageView()

  const getDashboardData = async () => {
    dispatch(getCurrentWeekJobs(user?.company))
    dispatch(getCurrentWeekEstimates(user?.company))
    dispatch(getCurrentWeekCustomers(user?.company))
    dispatch(getAnnualJobs(user?.company))
  }

  if (
    !user ||
    !company ||
    !customers ||
    !currentWeekJobs ||
    !annualJobs ||
    !currentWeekEstimates
  )
    return <Spinner />
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
        <Container maxWidth={settings.stretch ? false : 'xl'}>
          <Grid
            container
            disableEqualOverflow
            spacing={{
              xs: 3,
              lg: 4,
            }}
          >
            {/*----- Header & title -----*/}
            <Grid xs={12}>
              <Stack direction='row' justifyContent='space-between' spacing={4}>
                <div>
                  <Typography variant='h4'>Dashboard</Typography>
                </div>
                <div>
                  <Stack direction='row' spacing={2}>
                    <Button
                      component={RouterLink}
                      href='/dashboard/customers/add'
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
            {/*----- Stat Cards -----*/}
            <Grid xs={12} md={4}>
              <NewClients amount={31} />
            </Grid>
            <Grid xs={12} md={4}>
              <NewJobs amount={5} />
            </Grid>
            <Grid xs={12} md={4}>
              <NewEstimates amount={12} />
            </Grid>

            {/*------ Overview *------*/}
            <Grid xs={12} md={7}>
              <OverviewSubscriptionUsage />
            </Grid>
            {/*------ Recent Customers ------*/}
            <Grid xs={12} md={5}>
              <RecentCustomers />
            </Grid>
            {/* <Grid xs={12} md={7}>
              <OverviewTransactions
                transactions={[
                  {
                    id: 'd46800328cd510a668253b45',
                    amount: 25000,
                    createdAt: now.getTime(),
                    currency: 'usd',
                    sender: 'Devias',
                    status: 'on_hold',
                    type: 'receive',
                  },
                  {
                    id: 'b4b19b21656e44b487441c50',
                    amount: 6843,
                    createdAt: subDays(now, 1).getTime(),
                    currency: 'usd',
                    sender: 'Zimbru',
                    status: 'confirmed',
                    type: 'send',
                  },
                  {
                    id: '56c09ad91f6d44cb313397db',
                    amount: 91823,
                    createdAt: subDays(now, 1).getTime(),
                    currency: 'usd',
                    sender: 'Vertical Jelly',
                    status: 'failed',
                    type: 'send',
                  },
                  {
                    id: 'aaeb96c5a131a55d9623f44d',
                    amount: 49550,
                    createdAt: subDays(now, 3).getTime(),
                    currency: 'usd',
                    sender: 'Devias',
                    status: 'confirmed',
                    type: 'receive',
                  },
                ]}
              />
            </Grid> */}
            {/* <Grid xs={12} md={5}>
              <OverviewEvents
                events={[
                  {
                    id: '3bfa0bc6cbc99bf747c94d51',
                    createdAt: addDays(now, 1),
                    description: '17:00 to 18:00',
                    title: 'Meeting with Partners',
                  },
                  {
                    id: 'dd6c8ce8655ac222b01f24f9',
                    createdAt: addDays(now, 4),
                    description: '17:00 to 18:00',
                    title: 'Weekly Meeting',
                  },
                  {
                    id: 'f274902e2bf226865b3cf947',
                    createdAt: addDays(now, 4),
                    description: '17:00 to 18:00',
                    title: 'Weekly Meeting',
                  },
                  {
                    id: 'd2a66e24110f52acb0cd0b9f',
                    createdAt: addDays(now, 7),
                    description: '17:00 to 18:00',
                    title: 'Weekly Meeting',
                  },
                ]}
              />
            </Grid> */}
            {/*----- Help -----*/}
            {/* <Grid xs={12} md={7}>
              <OverviewBanner />
            </Grid> */}
            {/* <Grid xs={12} md={5}>
              <OverviewTips
                sx={{ height: '100%' }}
                tips={[
                  {
                    title: 'New fresh design.',
                    content:
                      'Your favorite template has a new trendy look, more customization options, screens & more.',
                  },
                  {
                    title: 'Tip 2.',
                    content: 'Tip content',
                  },
                  {
                    title: 'Tip 3.',
                    content: 'Tip content',
                  },
                ]}
              />
            </Grid> */}
            {/* <Grid xs={6}>
              <OverviewJobs />
            </Grid> */}
            <Grid xs={12} md={5}>
              <OverviewHelp />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Page
