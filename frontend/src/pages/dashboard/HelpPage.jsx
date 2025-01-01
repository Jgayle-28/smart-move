import React from 'react'
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material'
import ReactPlayer from 'react-player'
import { Seo } from 'src/components/seo'
import { usePageView } from 'src/hooks/use-page-view'
import { Container, Stack } from '@mui/system'

const videoSections = [
  {
    title: 'Basics',
    videos: [
      { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    ],
  },
  {
    title: 'Customers',
    videos: [
      { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    ],
  },
  {
    title: 'Jobs',
    videos: [
      { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    ],
  },
  {
    title: 'Estimates',
    videos: [
      { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    ],
  },
  {
    title: 'Inventory',
    videos: [
      { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    ],
  },
  {
    title: 'Calendar',
    videos: [
      { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
      { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    ],
  },
]

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
              <Button variant='contained' color='primary'>
                Contact Support
              </Button>
            </Stack>
            <Box sx={{ py: 4 }}>
              <Typography variant='body' gutterBottom>
                At Deliverly we are committed to continual improvement and we
                are always looking for ways to make our platform more
                user-friendly. We have created a series of videos to help you
                get started with Deliverly. If you have any{' '}
                <Typography
                  component='span'
                  color='primary.main'
                  variant='inherit'
                  sx={{ fontWeight: 700 }}
                >
                  suggestions
                </Typography>
                , questions or need further assistance, please don't hesitate to
                contact our support team.
              </Typography>
            </Box>
            <>
              <Box sx={{ py: 4 }}>
                {videoSections.map((section, index) => (
                  <Box key={index} sx={{ marginBottom: 6 }}>
                    <Typography variant='h6' gutterBottom>
                      {section.title}
                    </Typography>
                    {/* <Box
                      sx={{
                        display: 'flex',
                        overflowX: 'auto',
                        gap: 2,
                        padding: 1,
                      }}
                    >
                      {section.videos.map((video, idx) => (
                        <Card key={idx} sx={{ minWidth: 300,position:'relative' }}>
                          <ReactPlayer
                            url={video.url}
                            width='100%'
                            height='100%'
                            controls
                          />
                        </Card>
                      ))}
                    </Box> */}
                    <Grid container spacing={2} justifyContent='center'>
                      {section.videos.map((video, idx) => (
                        <Grid item xs={12} sm={6} md={4} key={idx}>
                          <Card>
                            <ReactPlayer
                              url={video.url}
                              width='100%'
                              height='200px'
                              controls
                            />
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                ))}
              </Box>
            </>
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default Page
