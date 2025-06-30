import { Box, Button, Container, Stack, Typography } from '@mui/material'
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
const buttonVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.4 } },
}
export const HomeCta = () => {
  const handleClick = (pageId = 'pricing') => {
    if (pageId) {
      const targetElement = document.getElementById(pageId)
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth', // Smooth scroll
          block: 'start', // Scroll to the top of the element
        })
      }
    }
  }
  return (
    <Box
      sx={{
        backgroundColor: 'neutral.800',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top center',
        backgroundImage: 'url("/assets/gradient-bg.svg")',
        color: 'neutral.100',
        py: '120px',
      }}
    >
      <Container maxWidth='lg'>
        <Stack spacing={2}>
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
            variants={textVariant}
          >
            <Typography align='center' color='inherit' variant='h3'>
              Ready to Streamline Your Moving Estimates?
            </Typography>
          </motion.div>
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
            variants={textVariant2}
          >
            <Typography align='center' color='inherit' variant='subtitle2'>
              Start a free trial today and see how Deliverly can help you
              generate faster, more accurate quotes—every time!
            </Typography>
          </motion.div>
        </Stack>
        <Stack
          alignItems='center'
          direction='row'
          justifyContent='center'
          spacing={2}
          sx={{ mt: 3 }}
        >
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
            variants={buttonVariant}
          >
            <Button onClick={() => handleClick('pricing')} variant='contained'>
              Start Free Trial
            </Button>
          </motion.div>
        </Stack>
      </Container>
    </Box>
  )
}
