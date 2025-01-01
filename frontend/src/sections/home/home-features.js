import { useState } from 'react'
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
  Fade,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { motion } from 'framer-motion'

const features = [
  {
    id: 'fast',
    title: 'Fast & Accurate Quotes',
    description:
      'Simply input your on-site estimate, and our software will instantly calculate the total cost—saving you time, reducing errors, and providing reliable, accurate quotes every time.',
    imageDark: '/assets/home-accurate-estimate.png',
    imageLight: '/assets/home-accurate-estimate.png',
  },
  {
    id: 'flexible-estimates',
    title: 'Flexible Estimates',
    description:
      "Deliverly's estimator software is designed to handle a wide range of moving and delivery services. This includes packing, Storage, Miscellaneous fees and even create custom service charges.",
    imageDark: '/assets/home-flexible-estimate.png',
    imageLight: '/assets/home-flexible-estimate.png',
  },
  {
    id: 'pdf',
    title: 'Generate Professional PDFs:',
    description:
      'Deliverly automatically generates blank (on-site) estimate forms, finalized estimates, and invoices in a professional PDF format for easy sharing and record-keeping.',
    imageDark: '/assets/home-estimate-pdf.png',
    imageLight: '/assets/home-estimate-pdf.png',
  },
  {
    id: 'management',
    title: 'Customer management:',
    description:
      'Efficiently organize and manage all your customers and moving projects in one place for quick, easy access and seamless workflow.',
    imageDark: '/assets/home-customers.png',
    imageLight: '/assets/home-customers.png',
  },
  {
    id: 'figma',
    title: 'Seamless Integration:',
    description:
      'Effortlessly manage customer details, move specifications, and costs—all in one platform. Plus, Deliverly integrates seamlessly with Google Calendar and Outlook for convenient scheduling.',
    imageDark: '/assets/home-seamless-integration.png',
    imageLight: '/assets/home-seamless-integration.png',
  },
  {
    id: 'tech',
    title: 'Flexible for Your Business:',
    description:
      "Deliverly is designed to adapt to your unique needs, whether you're handling local or long-distance moves, specialized items, or additional services—giving you the flexibility to scale your business.",
    imageDark: '/assets/home-flexible-business.png',
    imageLight: '/assets/home-flexible-business.png',
  },
  // {
  //   id: 'customize',
  //   title: 'Scale Your Operations:',
  //   description:
  //     'Delivery grows with you, handling everything from small jobs to large, complex moving and delivery projects.',
  //   imageDark: '/assets/home-features-customize-dark.png',
  //   imageLight: '/assets/home-features-customize-light.png',
  // },
]

export const HomeFeatures = () => {
  const theme = useTheme()
  const [activeFeature, setActiveFeature] = useState(0)
  const feature = features[activeFeature]
  const image =
    theme.palette.mode === 'dark' ? feature?.imageDark : feature?.imageLight

  return (
    <Box
      id='features'
      sx={{
        backgroundColor: 'neutral.800',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top center',
        backgroundImage: 'url("/assets/gradient-bg.svg")',
        color: 'common.white',
        py: '120px',
      }}
    >
      <Container maxWidth='xl'>
        <Stack spacing={2} sx={{ mb: 8 }}>
          <Typography align='center' color='inherit' variant='h3'>
            Revolutionize Your Business with Deliverly
          </Typography>
          <Typography align='center' color='inherit' variant='subtitle2'>
            More than just a set of features. Deliverly is a comprehensive
            solution designed to optimize your moving and delivery business
            operations.
          </Typography>
        </Stack>
        <Grid alignItems='center' container spacing={3}>
          <Grid xs={12} md={6}>
            <Stack spacing={1}>
              {features.map((feature, index) => {
                const isActive = activeFeature === index

                return (
                  <Box
                    key={feature.id}
                    onClick={() => setActiveFeature(index)}
                    sx={{
                      borderRadius: 2.5,
                      color: 'neutral.400',
                      cursor: 'pointer',
                      p: 3,
                      transition: (theme) =>
                        theme.transitions.create(
                          ['background-color, box-shadow', 'color'],
                          {
                            easing: theme.transitions.easing.easeOut,
                            duration: theme.transitions.duration.enteringScreen,
                          }
                        ),
                      ...(isActive && {
                        backgroundColor: 'primary.alpha12',
                        boxShadow: (theme) =>
                          `${theme.palette.primary.main} 0 0 0 1px`,
                        color: 'common.white',
                      }),
                      '&:hover': {
                        ...(!isActive && {
                          backgroundColor: 'primary.alpha4',
                          boxShadow: (theme) =>
                            `${theme.palette.primary.main} 0 0 0 1px`,
                          color: 'common.white',
                        }),
                      },
                    }}
                  >
                    <Typography color='inherit' sx={{ mb: 1 }} variant='h6'>
                      {feature.title}
                    </Typography>
                    <Typography color='inherit' variant='body2'>
                      {feature.description}
                    </Typography>
                    {/* {feature.id === 'figma' && (
                      <Box sx={{ mt: 3 }}>
                        <Button
                          color='success'
                          component='a'
                          endIcon={
                            <SvgIcon fontSize='small'>
                              
                            </SvgIcon>
                          }
                          href='https://www.figma.com/file/xrx6uDljzsWuDZiuz3ITCp/Devias-Kit-Pro-UI-6.0-Master'
                          size='small'
                          target='_blank'
                          variant='contained'
                        >
                          Preview in Figma
                        </Button>
                      </Box>
                    )} */}
                  </Box>
                )
              })}
            </Stack>
          </Grid>
          <Grid xs={12} md={6}>
            <motion.div
              key={activeFeature} // Ensures animation triggers every time a new feature is selected
              initial={{ opacity: 0 }} // Start with the image hidden
              animate={{ opacity: 1 }} // Fade-in to visible
              transition={{ duration: 1 }} // Adjust duration of the fade-in
            >
              <Box
                sx={{
                  borderRadius: 2.5,
                  overflow: 'hidden',
                  boxShadow: `0 4px 114px rgba(41, 112, 255, 0.25), 0 2px 14px rgba(41, 112, 255, 0.15)`,
                  '& img': {
                    width: '100%',
                    borderRadius: 2.5,
                  },
                }}
              >
                <img src={image} />
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
