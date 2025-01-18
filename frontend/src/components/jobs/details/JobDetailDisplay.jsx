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
        {/*----- Job Date & Time -----*/}
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

        {/*----- Addresses -----*/}
        {/*----- Addresses -----*/}
        <Box sx={{ mt: 3 }}>
          <Card variant='outlined'>
            <Stack divider={<Divider />}>
              {/* Pickup Addresses */}
              <Stack
                sx={{
                  px: 2,
                  py: 1.5,
                }}
              >
                <div>
                  <Typography variant='subtitle1' sx={{ marginBottom: 1 }}>
                    Pick Up
                  </Typography>
                  {focusJob.pickUpAddresses?.length > 0 ? (
                    focusJob.pickUpAddresses.map((pickup, index) => (
                      <Typography
                        key={`pickup-${index}`}
                        color='text.secondary'
                        variant='caption'
                        sx={{ display: 'block', mt: index > 0 ? 0.5 : 0 }}
                      >
                        {index + 1}. {pickup.address || 'TBD'}
                        {pickup.details && (
                          <Typography
                            component='span'
                            color='text.secondary'
                            variant='caption'
                            sx={{ display: 'block', ml: 2 }}
                          >
                            Details: {pickup.details}
                          </Typography>
                        )}
                      </Typography>
                    ))
                  ) : (
                    <Typography color='text.secondary' variant='caption'>
                      TBD
                    </Typography>
                  )}
                </div>
              </Stack>

              {/* Drop Off Addresses */}
              <Stack
                sx={{
                  px: 2,
                  py: 1.5,
                }}
              >
                <div>
                  <Typography variant='subtitle1' sx={{ marginBottom: 1 }}>
                    Drop Off
                  </Typography>
                  {focusJob.dropOffAddresses?.length > 0 ? (
                    focusJob.dropOffAddresses.map((dropoff, index) => (
                      <Typography
                        key={`dropoff-${index}`}
                        color='text.secondary'
                        variant='caption'
                        sx={{ display: 'block', mt: index > 0 ? 0.5 : 0 }}
                      >
                        {index + 1}. {dropoff.address || 'TBD'}
                        {dropoff.details && (
                          <Typography
                            component='span'
                            color='text.secondary'
                            variant='caption'
                            sx={{ display: 'block', ml: 2 }}
                          >
                            Details: {dropoff.details}
                          </Typography>
                        )}
                      </Typography>
                    ))
                  ) : (
                    <Typography color='text.secondary' variant='caption'>
                      TBD
                    </Typography>
                  )}
                </div>
              </Stack>
            </Stack>
          </Card>
        </Box>

        {/* <Box sx={{ mt: 3 }}>
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
                        2. {focusJob.pickUpAddress2 || ''}
                      </Typography>
                    )}
                    {focusJob.pickUpAddress3 && (
                      <Typography
                        component='p'
                        color='text.secondary'
                        variant='caption'
                      >
                        3. {focusJob.pickUpAddress3 || ''}
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
                        2. {focusJob.dropOffAddress2 || ''}
                      </Typography>
                    )}
                    {focusJob.dropOffAddress3 && (
                      <Typography
                        component='p'
                        color='text.secondary'
                        variant='caption'
                      >
                        3. {focusJob.dropOffAddress3 || ''}
                      </Typography>
                    )}
                  </Typography>
                </div>
              </Stack>
            </Stack>
          </Card>
        </Box> */}

        {/*----- Job Comments -----*/}
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

        {/*----- Estimate Date & Time -----*/}
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
                  <Typography variant='subtitle1'>Estimate Date</Typography>
                  <Typography color='text.secondary' variant='caption'>
                    {focusJob.estimateDate && focusJob.estimateDate !== null
                      ? format(new Date(focusJob.estimateDate), 'MM/dd/yyyy')
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
                  <Typography variant='subtitle1'>Estimate Time</Typography>
                  <Typography color='text.secondary' variant='caption'>
                    {focusJob.estimateTime && focusJob.estimateTime !== null
                      ? format(new Date(focusJob.estimateTime), 'hh:mm aa')
                      : 'TDB'}
                  </Typography>
                </div>
              </Stack>
            </Stack>
          </Card>
        </Box>

        {/*----- Estimate Comments -----*/}
        {/* {focusJob.estimateComments && (
          <Box sx={{ mt: 3 }}>
            <Card variant='outlined'>
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant='h6'>Estimate Comments</Typography>
                <Box sx={{ mt: 3 }}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: focusJob.estimateComments,
                    }}
                  />
                </Box>
              </Box>
            </Card>
          </Box>
        )} */}

        {/*----- Billing -----*/}
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
