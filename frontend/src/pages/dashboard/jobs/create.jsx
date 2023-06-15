import { Box, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material'
import { Seo } from 'src/components/seo'
import { usePageView } from 'src/hooks/use-page-view'
import { JobCreateForm } from 'src/components/jobs/form/JobCreateForm'
import { useLocation } from 'react-router-dom'

const Page = () => {
  const location = useLocation()
  const { state } = location
  console.log('state ----->', state)

  usePageView()

  return (
    <>
      <Seo title='Dashboard: Job Create' />
      <Box
        component='main'
        sx={{
          display: 'flex',
          flexGrow: 1,
        }}
      >
        <Grid container sx={{ flexGrow: 1 }}>
          {/* Side image */}
          <Grid
            xs={12}
            sm={4}
            sx={{
              backgroundImage: (theme) =>
                `url(/assets/${
                  theme.palette.mode === 'dark' ? 'job-form' : 'job-form-light'
                }.png)`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              display: {
                xs: 'none',
                md: 'block',
              },
            }}
          />
          <Grid
            xs={12}
            md={8}
            sx={{
              p: {
                xs: 4,
                sm: 6,
                md: 8,
              },
            }}
          >
            <Stack maxWidth='sm' spacing={3}>
              <Typography variant='h4'>
                Add A New Job{' '}
                {state?.customer
                  ? ` For ${state?.customer?.customerName.replace(/ .*/, '')}`
                  : ''}
              </Typography>
              <JobCreateForm />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Page
