import { Box, Card, Container, Stack, Typography } from '@mui/material'
import { Seo } from 'src/components/seo'
import { usePageView } from 'src/hooks/use-page-view'

import _ from 'lodash'

const Page = () => {
  usePageView()

  return (
    <>
      <Seo title='Dashboard: Help Center' />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth='xl'>
          <Stack spacing={4}>
            <Stack direction='row' justifyContent='space-between' spacing={4}>
              <Stack spacing={1}>
                <Typography variant='h4'>Help</Typography>
              </Stack>
            </Stack>
            <>
              <Card>
                <h1>Help</h1>
              </Card>
            </>
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default Page
