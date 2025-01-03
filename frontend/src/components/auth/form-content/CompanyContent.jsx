import { Typography, Box, Stack } from '@mui/material'

function CompanyContent() {
  return (
    <Box
      sx={{
        alignItems: 'center',
        backgroundColor: 'neutral.800',
        backgroundImage: 'url("/assets/gradient-bg.svg")',
        backgroundPosition: 'top center',
        backgroundRepeat: 'no-repeat',
        color: 'common.white',
        display: 'flex',
        flex: {
          xs: '0 0 auto',
          md: '1 1 auto',
        },
        justifyContent: 'center',
        p: {
          xs: 4,
          md: 8,
        },
      }}
    >
      <Box maxWidth='md'>
        <Typography sx={{ mb: 1 }} variant='h4'>
          Deliverly Help With More Than Data
        </Typography>
        <Typography color='text.secondary' sx={{ mb: 1 }}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem
          quaerat ipsum obcaecati voluptatibus nihil possimus perspiciatis,
          provident eligendi adipisci doloremque consequuntur itaque minus illum
          unde deleniti tempore sed blanditiis quam vitae nam aspernatur
          repellat culpa ipsa debitis! Quam, et mollitia? Dicta libero porro non
          eaque eius amet voluptatibus, nobis at?
        </Typography>
        <Typography variant='subtitle2' sx={{ mb: 2 }}>
          Join 6,000+ forward-thinking companies:
        </Typography>
        <Stack
          alignItems='center'
          direction='row'
          flexWrap='wrap'
          gap={4}
          sx={{
            color: 'text.primary',
            '& > *': {
              color: 'neutral.400',
              flex: '0 0 auto',
            },
          }}
        ></Stack>
      </Box>
    </Box>
  )
}

export default CompanyContent
