import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Rating,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material'
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

const QuotesIcon = () => (
  <svg
    fill='none'
    height='79'
    viewBox='0 0 105 79'
    width='105'
    xmlns='http://www.w3.org/2000/svg'
  >
    <g clipPath='url(#clip0_17690_94764)'>
      <path
        d='M25.086 78.1818C20.265 78.1818 15.971 76.9768 12.204 74.5658C8.437 72.0048 5.424 68.4638 3.164 63.9438C1.054 59.4238 0 54.3008 0 48.5758C0 43.3028 0.904 38.1798 2.712 33.2078C4.671 28.2358 7.458 23.6408 11.074 19.4218C14.6576 15.0819 18.8433 11.2767 23.504 8.12177C28.325 4.80677 33.599 2.39677 39.324 0.889771L50.398 14.6758C43.919 17.2368 38.721 20.6268 34.804 24.8458C31.037 29.0648 29.154 32.6808 29.154 35.6938C29.154 37.0498 29.531 38.5568 30.284 40.2138C31.188 41.7208 32.921 43.3028 35.482 44.9598C39.249 47.3698 41.81 49.9318 43.166 52.6438C44.673 55.2048 45.426 58.1438 45.426 61.4578C45.426 66.5808 43.467 70.6478 39.55 73.6618C35.783 76.6748 30.962 78.1818 25.086 78.1818V78.1818ZM79.326 78.1818C74.505 78.1818 70.211 76.9768 66.444 74.5658C62.677 72.0048 59.664 68.4638 57.404 63.9438C55.294 59.4238 54.24 54.3008 54.24 48.5758C54.24 43.3028 55.144 38.1798 56.952 33.2078C58.911 28.2358 61.698 23.6408 65.314 19.4218C68.8976 15.0819 73.0833 11.2767 77.744 8.12177C82.565 4.80677 87.839 2.39677 93.564 0.889771L104.638 14.6758C98.159 17.2368 92.961 20.6268 89.044 24.8458C85.277 29.0648 83.394 32.6808 83.394 35.6938C83.394 37.0498 83.771 38.5568 84.524 40.2138C85.428 41.7208 87.161 43.3028 89.722 44.9598C93.489 47.3698 96.05 49.9318 97.406 52.6438C98.913 55.2048 99.666 58.1438 99.666 61.4578C99.666 66.5808 97.707 70.6478 93.79 73.6618C90.023 76.6748 85.202 78.1818 79.326 78.1818V78.1818Z'
        fill='black'
        fillOpacity='0.04'
      />
    </g>
    <defs>
      <clipPath id='clip0_17690_94764'>
        <rect
          fill='white'
          height='78.0005'
          transform='translate(0 0.889771)'
          width='105'
        />
      </clipPath>
    </defs>
  </svg>
)

const reviews = [
  {
    author: 'Jessica L.',
    message:
      "Deliverly has completely transformed the way we manage our moving and delivery operations. The software is intuitive, fast, and easy to use. We've been able to generate accurate quotes in seconds, and the customer management features are a huge time-saver. Highly recommended!",
    stars: 5,
  },
  {
    author: 'Carlos M.',
    message:
      "I can't believe how much time we've saved since using Deliverly. The integration with Google Calendar and Outlook for scheduling is a game-changer. It's a seamless, all-in-one platform that's helped us improve our workflow and accuracy. Fantastic tool for any moving business!",
    stars: 5,
  },
  {
    author: 'Sophie W.',
    message:
      "Deliverly is everything we needed and more. From quick and reliable quotes to detailed customer management, this software has helped us scale our business effortlessly. The simplicity of the platform doesn't sacrifice its power—it’s everything we were looking for!",
    stars: 5,
  },
  // {
  //   author: 'Ruthy G.',
  //   message:
  //     'I received a kind, considerate and immediate response, thank you very much!',
  //   stars: 5,
  // },
  // {
  //   author: 'Dean H.',
  //   message:
  //     'While many templates are next.js, the support is quick and AMAZING and I was able to port this to using react-router v6. Very happy with the quality of everything!!!',
  //   stars: 5,
  // },
  // {
  //   author: 'Cole S.',
  //   message:
  //     'Great template and great customer support. Easy to customize, code is easy to read, documentation is good. Very happy!',
  //   stars: 5,
  // },
]

export const HomeReviews = () => (
  <div>
    <Container maxWidth='lg'>
      {/* <Stack
        justifyContent="center"
        spacing={3}
        sx={{ py: 3 }}
      >
        <Typography
          align="center"
          color="text.secondary"
          variant="body2"
        >
          Used by companies like:
        </Typography>
        <Stack
          alignItems="center"
          direction="row"
          flexWrap="wrap"
          gap={4}
          justifyContent="center"
          sx={{
            color: 'action.active',
            '& > *': {
              flex: '0 0 auto'
            }
          }}
        >
          <LogoSamsung />
          <LogoVisma />
          <LogoBolt />
          <LogoAws />
          <LogoAccenture />
          <LogoAtt />
        </Stack>
      </Stack> */}
      <Stack spacing={8} sx={{ py: '120px' }}>
        <Stack spacing={2}>
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
            variants={textVariant}
          >
            <Typography align='center' variant='h3'>
              Trusted by Moving & Delivery Companies Large and Small
            </Typography>
          </motion.div>
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
            variants={textVariant2}
          >
            <Typography
              align='center'
              color='text.secondary'
              variant='subtitle1'
            >
              Deliverly is designed for simplicity, making it easy for
              businesses to streamline their operations. No unnecessary
              complexities—just the powerful features you need to get the job
              done, effortlessly.
            </Typography>
          </motion.div>
        </Stack>
        <Grid container spacing={3}>
          {reviews.map((review, index) => (
            <Grid key={index} xs={12} md={6} lg={4}>
              <motion.div
                key={review.author}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.2 }} // Trigger when the feature comes into view
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.15,
                      delay: index * 0.2, // Delay each item based on its index
                    },
                  },
                }}
              >
                <Card sx={{ height: '100%' }}>
                  <CardContent
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      height: '100%',
                    }}
                  >
                    <Box sx={{ position: 'absolute' }}>
                      <QuotesIcon />
                    </Box>
                    <div>
                      <Rating
                        readOnly
                        sx={{ color: 'success.main' }}
                        value={review.stars}
                      />
                    </div>
                    <Typography
                      sx={{
                        flexGrow: 1,
                        mt: 2,
                      }}
                    >
                      {review.message}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography color='text.secondary'>
                      {review.author}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  </div>
)
