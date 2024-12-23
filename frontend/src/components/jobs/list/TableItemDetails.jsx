import {
  Button,
  CardContent,
  Divider,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import { format } from 'date-fns'
import { SeverityPill } from 'src/components/severity-pill'

function TableItemDetails({ job, toggleShowComments }) {
  return (
    <>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item md={job.estimate ? 4 : 6} xs={12}>
            <Typography variant='h6'>Job details</Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <Stack>
                  <div>
                    <Typography variant='subtitle1'>Job Date</Typography>
                    <Typography color='text.secondary' variant='caption'>
                      {job?.jobDate !== null && job?.jobDate !== undefined
                        ? format(new Date(job.jobDate), 'MM/dd/yyyy')
                        : 'TBD'}
                    </Typography>
                  </div>
                </Stack>
              </Grid>
              <Grid item md={6} xs={12}>
                <Stack>
                  <div>
                    <Typography variant='subtitle1'>Job Time</Typography>
                    <Typography color='text.secondary' variant='caption'>
                      {job?.jobStartTime !== null &&
                      job?.jobStartTime !== undefined
                        ? format(new Date(job.jobStartTime), 'hh:mm aa')
                        : 'TDB'}
                    </Typography>
                  </div>
                </Stack>
              </Grid>
              <Grid item md={6} xs={12}>
                <Stack>
                  <div>
                    <Typography variant='subtitle1'>Pick Up</Typography>
                    <Typography color='text.secondary' variant='caption'>
                      1.{' '}
                      {job?.pickUpAddress?.length > 0
                        ? job?.pickUpAddress
                        : 'TBD'}
                      {job.pickUpAddress2 && (
                        <Typography
                          component='p'
                          color='text.secondary'
                          variant='caption'
                        >
                          2.{' '}
                          {job?.pickUpAddress2?.length > 0
                            ? job?.pickUpAddress2
                            : 'TBD'}
                        </Typography>
                      )}
                    </Typography>
                  </div>
                </Stack>
              </Grid>
              <Grid item md={6} xs={12}>
                <Stack>
                  <div>
                    <Typography variant='subtitle1'>Drop Off</Typography>
                    <Typography color='text.secondary' variant='caption'>
                      1.{' '}
                      {job?.dropOffAddress?.length > 0
                        ? job?.dropOffAddress
                        : 'TBD'}
                      {job.dropOffAddress2 && (
                        <Typography
                          component='p'
                          color='text.secondary'
                          variant='caption'
                        >
                          2.{' '}
                          {job?.dropOffAddress2?.length > 0
                            ? job?.dropOffAddress2
                            : 'TBD'}
                        </Typography>
                      )}
                    </Typography>
                  </div>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={job.estimate ? 4 : 6} xs={12}>
            <Typography variant='h6'>Payment Details</Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <Stack>
                  <div>
                    <Typography variant='subtitle1'>Bill To</Typography>
                    <Typography color='text.secondary' variant='caption'>
                      {job.billingSameAsCustomer && job.customer.customerName}
                      {!job.billingSameAsCustomer &&
                        job.billTo.length > 0 &&
                        job.billTo}
                      {!job.billingSameAsCustomer &&
                        job.billTo.length === 0 &&
                        'TBD'}
                    </Typography>
                  </div>
                </Stack>
              </Grid>
              <Grid item md={6} xs={12}>
                <Stack>
                  <div>
                    <Typography variant='subtitle1'>Payment Type</Typography>
                    <Typography color='text.secondary' variant='caption'>
                      {job.paymentType.length ? job.paymentType : 'TBD'}
                    </Typography>
                  </div>
                </Stack>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                {job.jobComments && (
                  <Stack>
                    <Stack spacing={1} direction='row' alignItems='center'>
                      <Typography variant='h6'>Job Comments</Typography>
                    </Stack>
                    <Stack
                      direction='row'
                      sx={{ maxHeight: 40, overflow: 'hidden' }}
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: job.jobComments,
                        }}
                      />
                      <Tooltip title='See All Comments'>
                        <Button
                          sx={{
                            width: 'auto',
                            padding: 0,
                            '&:hover': { background: 'none', padding: 0 },
                          }}
                          color='primary'
                          size='small'
                          onClick={toggleShowComments}
                        >
                          ...
                        </Button>
                      </Tooltip>
                    </Stack>
                  </Stack>
                )}
              </Grid>
            </Grid>
          </Grid>
          {job.estimate && (
            <Grid item md={4} xs={12}>
              <Stack direction='row' alignItems='center' spacing={4}>
                <Typography variant='h6'>Estimate Details</Typography>
                <SeverityPill color='success'>
                  Total Cost: $
                  {job.estimate.moveCharges.totalMoveCost.toLocaleString()}
                </SeverityPill>
              </Stack>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <Stack>
                    {job?.estimate?.packing?.packDate && (
                      <div>
                        <Typography variant='subtitle1'>Pack Date</Typography>
                        <Typography color='text.secondary' variant='caption'>
                          {job?.estimate?.packing?.packDate !== null &&
                          job?.estimate?.packing?.packDate !== undefined
                            ? format(
                                new Date(job.estimate.packing.packDate),
                                'MM/dd/yyyy'
                              )
                            : 'TBD'}
                        </Typography>
                      </div>
                    )}
                  </Stack>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Stack>
                    {job?.estimate?.packing?.packTime && (
                      <div>
                        <Typography variant='subtitle1'>Pack Time</Typography>
                        <Typography color='text.secondary' variant='caption'>
                          {job?.estimate?.packing?.packTime !== null &&
                          job?.estimate?.packing?.packTime !== undefined
                            ? format(
                                new Date(job.estimate.packing.packTime),
                                'hh:mm aa'
                              )
                            : 'TBD'}
                        </Typography>
                      </div>
                    )}
                  </Stack>
                </Grid>
                <Grid item md={12} xs={12}>
                  <Stack>
                    <Stack spacing={1}>
                      <Typography variant='h6'>Totals</Typography>
                      <Stack direction='row' flexWrap='wrap' spacing={1}>
                        <SeverityPill>
                          Men: {job.estimate.moveCharges.totalMen}
                        </SeverityPill>
                        <SeverityPill>
                          Items: {job.estimate.totalItemCount}
                        </SeverityPill>
                        <SeverityPill>
                          Hours: {job.estimate.moveCharges.totalMoveHours}
                        </SeverityPill>
                      </Stack>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </>
  )
}

export default TableItemDetails
