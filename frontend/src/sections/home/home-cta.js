import { Box, Button, Container, Stack, Typography } from '@mui/material'

export const HomeCta = () => (
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
        <Typography align='center' color='inherit' variant='h3'>
          Ready to Streamline Your Moving Estimates?
        </Typography>
        <Typography align='center' color='inherit' variant='subtitle2'>
          Start a free trial today and see how Deliverly can help you generate
          faster, more accurate quotes—every time!
        </Typography>
      </Stack>
      <Stack
        alignItems='center'
        direction='row'
        justifyContent='center'
        spacing={2}
        sx={{ mt: 3 }}
      >
        <Button
          component='a'
          href='https://mui.com/store/items/devias-kit-pro'
          target='_blank'
          variant='contained'
        >
          Start Free Trial
        </Button>
      </Stack>
    </Container>
  </Box>
)
