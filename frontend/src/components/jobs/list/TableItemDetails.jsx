import {
  Button,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { format } from 'date-fns'
import Collapse from '@mui/material/Collapse'

function TableItemDetails({ job, toggleShowComments }) {
  return (
    <>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <Typography variant='h6'>Job details</Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <Stack>
                  <div>
                    <Typography variant='subtitle1'>Job Date</Typography>
                    <Typography color='text.secondary' variant='caption'>
                      {job.jobDate !== null
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
                      {job.jobStartTime !== null
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
                      1. {job.pickUpAddress || 'TBD'}
                      {job.pickUpAddress2 && (
                        <Typography
                          component='p'
                          color='text.secondary'
                          variant='caption'
                        >
                          2. {job.pickUpAddress2}
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
                      1. {job.dropOffAddress || 'TBD'}
                      {job.dropOffAddress2 && (
                        <Typography
                          component='p'
                          color='text.secondary'
                          variant='caption'
                        >
                          2. {job.dropOffAddress2}
                        </Typography>
                      )}
                    </Typography>
                  </div>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} xs={12}>
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
                    <Stack spacing={3} direction='row' alignItems='center'>
                      <Typography variant='h6'>Job Comments</Typography>
                      <Button
                        sx={{ padding: 0 }}
                        color='primary'
                        size='small'
                        onClick={toggleShowComments}
                      >
                        View All Comments
                      </Button>
                    </Stack>
                    <Collapse in={false} collapsedSize={40}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: job.jobComments,
                        }}
                      />
                    </Collapse>
                  </Stack>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </>
  )
}

export default TableItemDetails
