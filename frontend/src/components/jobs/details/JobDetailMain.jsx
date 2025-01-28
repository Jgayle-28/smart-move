import {
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material'
import { useCallback, useState } from 'react'
import JobDetailHeader from './JobDetailHeader'
import { CompanyActivity } from 'src/sections/dashboard/jobs/company-activity'
import { CompanyAssets } from 'src/sections/dashboard/jobs/company-assets'
import { JobDetailDisplay } from 'src/components/jobs/details/JobDetailDisplay'
import { CompanyReviews } from 'src/sections/dashboard/jobs/company-reviews'
import { CompanyTeam } from 'src/sections/dashboard/jobs/company-team'
import Spinner from 'src/components/shared/Spinner'
import Edit from '@mui/icons-material/Edit'
import RemoveCircleOutline from '@mui/icons-material/RemoveCircleOutline'
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined'
import JobEstimateDetail from './JobEstimateDetail'
import { useRouter } from 'src/hooks/use-router'

const tabs = [
  { label: 'Overview', value: 'overview' },
  { label: 'Estimate', value: 'estimate' },
  // { label: 'Reviews', value: 'reviews' },
  // { label: 'Activity', value: 'activity' },
  // { label: 'Team', value: 'team' },
  // { label: 'Assets', value: 'assets' },
]

function JobDetailMain({
  company,
  focusJob,
  isLoading,
  handleToggleEdit,
  handleJobDeleteClick,
}) {
  const [currentTab, setCurrentTab] = useState('overview')

  const router = useRouter()

  const handleTabsChange = useCallback((event, value) => {
    setCurrentTab(value)
  }, [])

  if (isLoading || focusJob === null) return <Spinner />
  return (
    <>
      <Grid container spacing={4} sx={{ mb: 1 }}>
        <Grid xs={6}>
          <div>
            <Button
              onClick={() => router.back()}
              sx={{
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <SvgIcon sx={{ mr: 1 }} fontSize='small'>
                <KeyboardBackspaceOutlinedIcon />
              </SvgIcon>
              <Typography variant='subtitle2'>Go Back</Typography>
            </Button>
          </div>
        </Grid>
        <Grid xs={6}>
          <Stack direction='row' justifyContent='flex-end' spacing={2}>
            <Button
              size='small'
              startIcon={
                <SvgIcon fontSize='small'>
                  <Edit />
                </SvgIcon>
              }
              onClick={handleToggleEdit}
            >
              Edit Job
            </Button>
            <Button
              color='error'
              size='small'
              startIcon={
                <SvgIcon fontSize='small'>
                  <RemoveCircleOutline />
                </SvgIcon>
              }
              onClick={handleJobDeleteClick}
            >
              Delete Job
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <Card>
        <JobDetailHeader />
        <Tabs
          indicatorColor='primary'
          onChange={handleTabsChange}
          scrollButtons='auto'
          sx={{ px: 3 }}
          textColor='primary'
          value={currentTab}
          variant='scrollable'
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
        <Divider />
        <CardContent>
          {currentTab === 'overview' && (
            <JobDetailDisplay focusJob={focusJob} />
          )}
          {currentTab === 'estimate' && (
            <JobEstimateDetail focusJob={focusJob} />
          )}
          {currentTab === 'reviews' && (
            <CompanyReviews
              reviews={company.reviews || []}
              averageRating={company.averageRating}
            />
          )}
          {currentTab === 'activity' && (
            <CompanyActivity activities={company.activities || []} />
          )}
          {currentTab === 'team' && (
            <CompanyTeam members={company.members || []} />
          )}
          {currentTab === 'assets' && (
            <CompanyAssets assets={company.assets || []} />
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default JobDetailMain
