import {
  Box,
  Chip,
  Container,
  Divider,
  Stack,
  Switch,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material'
import { useState } from 'react'
import { usePageView } from 'src/hooks/use-page-view'
import { PricingFaqs } from 'src/sections/pricing/pricing-faqs'
import { PricingPlan } from 'src/sections/pricing/pricing-plan'
import { PricingPlanIcon } from 'src/sections/pricing/pricing-plan-icon'
import { useNavigate } from 'react-router-dom'

const HomeKeyFeatures = () => {
  return (
    <Box component='main' sx={{ flexGrow: 1 }} id='pricing'>
      <Box
        sx={{
          pb: '120px',
          pt: '184px',
        }}
      >
        <Container maxWidth='lg'>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              mb: 4,
            }}
          >
            <Typography variant='h3'>
              Start Today. Streamline Your Moving Business!
            </Typography>
            <Typography
              color='text.secondary'
              sx={{ textAlign: 'center', my: 4 }}
              variant='body1'
            >
              Join 6,000+ moving and delivery companies transforming their
              operations with our easy-to-use estimator software. Unlock faster,
              more accurate pricing and seamless job management to elevate your
              service and boost efficiency.
            </Typography>
            <Stack alignItems='center' direction='row' spacing={1}>
              <Switch checked={isYearly} onChange={handleToggle} />
              <Typography variant='body1'>Yearly Payment</Typography>
              <Chip color='primary' label='25% OFF' size='small' />
            </Stack>
          </Box>
          <Grid container spacing={4}>
            <Grid xs={12} md={4}>
              <PricingPlan
                cta='Start Free Trial'
                currency='$'
                description='Changing the way you move'
                features={[
                  'Move Estimator Software',
                  'Invoice & Estimate PDF Creation',
                  'Google Calendar Integration',
                  'Microsoft Outlook Integration',
                  'Workload Calendar',
                ]}
                icon={<PricingPlanIcon Name='standard' />}
                name='Standard'
                popular
                price='200.00'
                sx={{
                  height: '100%',
                  maxWidth: 460,
                  mx: 'auto',
                }}
                onClick={() => handlePlanClick('standard')}
              />
            </Grid>
            <Grid xs={12} md={4}>
              <PricingPlan
                cta='Coming Soon'
                currency='$'
                description='Boost your business with quickbooks'
                features={['All previous', 'Quickbook integration']}
                icon={<PricingPlanIcon Name='business' />}
                name='Business'
                price='250.00'
                sx={{
                  height: '100%',
                  maxWidth: 460,
                  mx: 'auto',
                }}
                isComingSoon
              />
            </Grid>
            <Grid xs={12} md={4}>
              <PricingPlan
                cta='Coming Soon'
                currency='$'
                description='Take your business to the next level'
                features={['All previous', 'Analytics platform']}
                icon={<PricingPlanIcon Name='business elite' />}
                name='Business Elite'
                price='300.00'
                sx={{
                  height: '100%',
                  maxWidth: 460,
                  mx: 'auto',
                }}
                isComingSoon
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 4 }}>
            <Typography
              align='center'
              color='text.secondary'
              component='p'
              variant='caption'
            >
              30% of our income goes into Whale Charity
            </Typography>
          </Box>
        </Container>
      </Box>
      {/* <Divider /> */}
    </Box>
  )
}

export default HomeKeyFeatures
