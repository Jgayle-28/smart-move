import {
  Box,
  Chip,
  Container,
  Divider,
  Stack,
  Switch,
  Typography,
  Grid2 as Grid,
} from '@mui/material'
import { useState } from 'react'
import { usePageView } from 'src/hooks/use-page-view'
import { PricingFaqs } from 'src/sections/pricing/pricing-faqs'
import { PricingPlan } from 'src/sections/pricing/pricing-plan'
import { PricingPlanIcon } from 'src/sections/pricing/pricing-plan-icon'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

// Animation variants
const textVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
}
const textVariant2 = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } },
}

const priceVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.4 } },
}
const priceVariant2 = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5 } },
}
const priceVariant3 = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.6 } },
}

const HomePricing = () => {
  const [isYearly, setIsYearly] = useState(false)
  usePageView()
  const navigate = useNavigate()
  const handleToggle = () => {
    setIsYearly((prev) => !prev)
  }
  const handlePlanClick = (plan) => {
    navigate(`/register`, {
      state: { isYearly, plan: plan },
    })
  }

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
            <motion.div
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.2 }}
              variants={textVariant}
            >
              <Typography variant='h3'>
                Start Today. Streamline Your Moving Business!
              </Typography>
            </motion.div>
            <motion.div
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.2 }}
              variants={textVariant2}
            >
              <Typography
                color='text.secondary'
                sx={{ textAlign: 'center', my: 4 }}
                variant='body1'
              >
                Join 6,000+ moving and delivery companies transforming their
                operations with our easy-to-use estimator software. Unlock
                faster, more accurate pricing and seamless job management to
                elevate your service and boost efficiency.
              </Typography>
            </motion.div>
            <motion.div
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.2 }}
              variants={textVariant2}
            >
              <Stack alignItems='center' direction='row' spacing={1}>
                <Switch checked={isYearly} onChange={handleToggle} />
                <Typography variant='body1'>Yearly Payment</Typography>
                <Chip color='primary' label='25% OFF' size='small' />
              </Stack>
            </motion.div>
          </Box>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <motion.div
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.2 }}
                variants={priceVariant}
              >
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
              </motion.div>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <motion.div
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.2 }}
                variants={priceVariant2}
                style={{ height: '100%' }}
              >
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
              </motion.div>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <motion.div
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.2 }}
                variants={priceVariant3}
                style={{ height: '100%' }}
              >
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
              </motion.div>
            </Grid>
          </Grid>
          <Box sx={{ mt: 4 }}>
            {/* <Typography
              align='center'
              color='text.secondary'
              component='p'
              variant='caption'
            >
              30% of our income goes into Whale Charity
            </Typography> */}
          </Box>
        </Container>
      </Box>
      {/* <Divider /> */}
    </Box>
  )
}

export default HomePricing
