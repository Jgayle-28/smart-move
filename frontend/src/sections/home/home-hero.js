import { Box, Container, Typography, useTheme } from '@mui/material'
import { motion } from 'framer-motion'

export const HomeHero = () => {
  const theme = useTheme()

  // Animation variants for typography
  const textVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }
  const textVariant2 = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  }

  // Animation variants for the image
  const imageVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.4 } },
  }

  return (
    <Box
      sx={{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top center',
        backgroundImage: 'url("/assets/gradient-bg.svg")',
        pt: '120px',
      }}
    >
      <Container maxWidth='xl'>
        <Box maxWidth='sm'>
          <motion.div initial='hidden' animate='visible' variants={textVariant}>
            <Typography variant='h1' sx={{ mb: 4 }}>
              Let Deliverly Pro worry about the{' '}
              <Typography
                component='span'
                color='primary.main'
                variant='inherit'
              >
                heavy lifting.
              </Typography>
            </Typography>
          </motion.div>
          <motion.div
            initial='hidden'
            animate='visible'
            variants={textVariant2}
          >
            <Typography
              color='text.secondary'
              sx={{
                fontSize: 20,
                fontWeight: 500,
                marginBottom: 2,
              }}
            >
              Empower your team with an easy-to-use professional tool that turns
              your on-site estimates into accurate total costs in minutes.
            </Typography>
            <Typography
              color='text.secondary'
              sx={{
                fontSize: 20,
                fontWeight: 500,
              }}
            >
              Let Deliverly help you manage your clients, your clients
              inventory, and move/delivery estimates, more.
            </Typography>
          </motion.div>
        </Box>
        <Box
          sx={{
            pt: '120px',
            position: 'relative',
          }}
        >
          <motion.div
            initial='hidden'
            animate='visible'
            variants={imageVariants}
            style={{
              overflow: 'hidden',
              width: '90%',
              margin: '0 auto',
              paddingTop: '10px',
            }}
          >
            <img
              src={
                theme.palette.mode === 'dark'
                  ? '/assets/dashboard-top.png'
                  : '/assets/dashboard-top.png'
              }
              style={{
                borderTopLeftRadius: '15px',
                borderTopRightRadius: '15px',
                boxShadow: theme.shadows[16],
                width: '100%',
                marginBottom: -6,
              }}
              alt='Dashboard'
            />
          </motion.div>
        </Box>
      </Container>
    </Box>
  )
}

// import {
//   Box,
//   Button,
//   Container,
//   Rating,
//   Stack,
//   SvgIcon,
//   Typography,
// } from '@mui/material'
// import { useTheme } from '@mui/material/styles'
// import { RouterLink } from 'src/components/router-link'
// import { paths } from 'src/paths'
// import { HomeCodeSamples } from './home-code-samples'
// import zIndex from '@mui/material/styles/zIndex'

// export const HomeHero = () => {
//   const theme = useTheme()

//   return (
//     <Box
//       sx={{
//         backgroundRepeat: 'no-repeat',
//         backgroundPosition: 'top center',
//         backgroundImage: 'url("/assets/gradient-bg.svg")',
//         pt: '120px',
//       }}
//     >
//       <Container maxWidth='xl'>
//         <Box maxWidth='sm'>
//           <Typography variant='h1' sx={{ mb: 4 }}>
//             Let Deliverly Pro worry about the &nbsp;
//             <Typography component='span' color='primary.main' variant='inherit'>
//               heavy lifting.
//             </Typography>
//             {/* , you
//             <Typography component='span' color='primary.main' variant='inherit'>

//               focus
//             </Typography>
//             on what you do best. */}
//           </Typography>
//           <Typography
//             color='text.secondary'
//             sx={{
//               fontSize: 20,
//               fontWeight: 500,
//               marginBottom: 2,
//             }}
//           >
//             Empower your team with an easy-to-use professional tool that turns
//             your on-site estimates into accurate total costs in minutes.
//             {/* A professional ready to use use system that brings a fresh view to
//             the industry. */}
//           </Typography>
//           <Typography
//             color='text.secondary'
//             sx={{
//               fontSize: 20,
//               fontWeight: 500,
//             }}
//           >
//             Let Deliverly help you manage your clients, your clients inventory
//             and move / delivery estimates, more.
//           </Typography>
//           {/* <Stack
//             alignItems='center'
//             direction='row'
//             flexWrap='wrap'
//             spacing={1}
//             sx={{ my: 3 }}
//           >
//             <Rating readOnly value={4.7} precision={0.1} max={5} />
//             <Typography
//               color='text.primary'
//               variant='caption'
//               sx={{ fontWeight: 700 }}
//             >
//               4.7/5
//             </Typography>
//             <Typography color='text.secondary' variant='caption'>
//               based on (70+ reviews)
//             </Typography>
//           </Stack> */}
//           {/* <Stack alignItems='center' direction='row' spacing={2}>
//             <Button
//               component={RouterLink}
//               href={paths.dashboard.index}
//               startIcon={
//                 <SvgIcon fontSize='small'>
//                   <EyeIcon />
//                 </SvgIcon>
//               }
//               sx={(theme) =>
//                 theme.palette.mode === 'dark'
//                   ? {
//                       backgroundColor: 'neutral.50',
//                       color: 'neutral.900',
//                       '&:hover': {
//                         backgroundColor: 'neutral.200',
//                       },
//                     }
//                   : {
//                       backgroundColor: 'neutral.900',
//                       color: 'neutral.50',
//                       '&:hover': {
//                         backgroundColor: 'neutral.700',
//                       },
//                     }
//               }
//               variant='contained'
//             >
//               Live Demo
//             </Button>
//             <Button
//               color='inherit'
//               component={RouterLink}
//               href={paths.components.index}
//               startIcon={
//                 <SvgIcon fontSize='small'>
//                   <LayoutBottomIcon />
//                 </SvgIcon>
//               }
//             >
//               Components
//             </Button>
//           </Stack> */}
//         </Box>
//         <Box
//           sx={{
//             pt: '120px',
//             position: 'relative',
//           }}
//         >
//           <Box
//             sx={{
//               overflow: 'hidden',
//               width: '90%',
//               fontSize: 0,
//               mt: -2,
//               mx: -2,
//               pt: 2,
//               px: 2,
//               '& img': {
//                 borderTopLeftRadius: '15px',
//                 borderTopRightRadius: '15px',
//                 boxShadow: 16,
//                 width: '100%',
//               },
//             }}
//           >
//             <img
//               src={
//                 theme.palette.mode === 'dark'
//                   ? '/assets/dashboard-top.png'
//                   : '/assets/dashboard-top.png'
//               }
//             />
//           </Box>
//           <Box
//             sx={{
//               maxHeight: '100%',
//               maxWidth: '100%',
//               overflow: 'hidden',
//               position: 'absolute',
//               right: 0,
//               top: 40,
//               '& > div': {
//                 height: 460,
//                 width: 560,
//               },
//             }}
//           >
//             {/* <img src='/assets/dashboard-right.png' /> */}
//             {/* <HomeCodeSamples /> */}
//           </Box>
//         </Box>
//       </Container>
//     </Box>
//   )
// }
