import PropTypes from 'prop-types'
import { Box, Divider, Card, Stack, Typography } from '@mui/material'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'

export const JobDetailDisplay = (props) => {
  const { focusJob } = useSelector((state) => state.jobs)
  if (focusJob)
    return (
      <div>
        <div>
          <Typography variant='h5'>{focusJob.jobTitle}</Typography>
        </div>
        {/* Job Date & Time */}

        {/* TODO -> Add check for date -> IF  no date show TBD*/}
        <Box sx={{ mt: 3 }}>
          <Card variant='outlined'>
            <Stack divider={<Divider />}>
              <Stack
                sx={{
                  px: 2,
                  py: 1.5,
                }}
              >
                <div>
                  <Typography variant='subtitle1'>Job Date</Typography>
                  <Typography color='text.secondary' variant='caption'>
                    {focusJob.jobDate !== null
                      ? format(new Date(focusJob.jobDate), 'MM/dd/yyyy')
                      : 'TBD'}
                  </Typography>
                </div>
              </Stack>
              <Stack
                sx={{
                  px: 2,
                  py: 1.5,
                }}
              >
                <div>
                  <Typography variant='subtitle1'>Job Time</Typography>
                  <Typography color='text.secondary' variant='caption'>
                    {focusJob.jobStartTime !== null
                      ? format(new Date(focusJob.jobStartTime), 'hh:mm aa')
                      : 'TDB'}
                  </Typography>
                </div>
              </Stack>
            </Stack>
          </Card>
        </Box>

        {/* Addresses */}
        <Box sx={{ mt: 3 }}>
          <Card variant='outlined'>
            <Stack divider={<Divider />}>
              <Stack
                sx={{
                  px: 2,
                  py: 1.5,
                }}
              >
                <div>
                  <Typography variant='subtitle1'>Pick Up</Typography>
                  <Typography color='text.secondary' variant='caption'>
                    1. {focusJob.pickUpAddress || 'TBD'}
                    {focusJob.pickUpAddress2 && (
                      <Typography
                        component='p'
                        color='text.secondary'
                        variant='caption'
                      >
                        2. {focusJob.pickUpAddress2}
                      </Typography>
                    )}
                  </Typography>
                </div>
              </Stack>
              <Stack
                sx={{
                  px: 2,
                  py: 1.5,
                }}
              >
                <div>
                  <Typography variant='subtitle1'>Drop Off</Typography>
                  <Typography color='text.secondary' variant='caption'>
                    1. {focusJob.dropOffAddress || 'TBD'}
                    {focusJob.dropOffAddress2 && (
                      <Typography
                        component='p'
                        color='text.secondary'
                        variant='caption'
                      >
                        2. {focusJob.dropOffAddress2}
                      </Typography>
                    )}
                  </Typography>
                </div>
              </Stack>
            </Stack>
          </Card>
        </Box>

        {/* comments */}
        {focusJob.jobComments && (
          <Box sx={{ mt: 3 }}>
            <Card variant='outlined'>
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant='h6'>Job Comments</Typography>
                {/* <Divider sx={{ marginTop: 1.5 }} /> */}
                <Box sx={{ mt: 3 }}>
                  <div
                    dangerouslySetInnerHTML={{ __html: focusJob.jobComments }}
                  />
                </Box>
              </Box>
            </Card>
          </Box>
        )}
        {/* Billing */}
        <Box sx={{ mt: 3 }}>
          <Card variant='outlined'>
            <Stack divider={<Divider />}>
              <Stack
                sx={{
                  px: 2,
                  py: 1.5,
                }}
              >
                <div>
                  <Typography variant='subtitle1'>Bill To</Typography>
                  <Typography color='text.secondary' variant='caption'>
                    {focusJob.billingSameAsCustomer &&
                      focusJob.customer.customerName}
                    {!focusJob.billingSameAsCustomer &&
                      focusJob.billTo.length > 0 &&
                      focusJob.billTo}
                    {!focusJob.billingSameAsCustomer &&
                      focusJob.billTo.length === 0 &&
                      'TBD'}
                  </Typography>
                </div>
              </Stack>
              <Stack
                sx={{
                  px: 2,
                  py: 1.5,
                }}
              >
                <div>
                  <Typography variant='subtitle1'>Payment Type</Typography>
                  <Typography color='text.secondary' variant='caption'>
                    {focusJob.paymentType.length ? focusJob.paymentType : 'TBD'}
                  </Typography>
                </div>
              </Stack>
            </Stack>
          </Card>
        </Box>
      </div>
    )
}

JobDetailDisplay.propTypes = {
  focusJob: PropTypes.object.isRequired,
}
