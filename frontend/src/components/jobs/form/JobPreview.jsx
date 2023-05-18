import CheckIcon from '@untitled-ui/icons-react/build/esm/Check'
import { Avatar, Button, Card, Stack, SvgIcon, Typography } from '@mui/material'
import { SeverityPill } from 'src/components/severity-pill'
import { RouterLink } from 'src/components/router-link'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'

export const JobPreview = ({ selectedCustomer, formik }) => {
  const { createdJob } = useSelector((state) => state.jobs)
  console.log('createdJob :>> ', createdJob)

  const getJobPillLabel = () => {
    switch (formik.values.jobType) {
      case 'move':
        return 'Move'
      case 'delivery':
        return 'Delivery'
      case 'other':
        return 'Other'
      case 'pu_do':
        return 'Pick Up and Drop Off'
      default:
        return 'Move'
    }
  }

  return (
    <Stack spacing={2}>
      <div>
        <Stack spacing={2} direction='row' alignItems='center'>
          <Avatar
            sx={{
              backgroundColor: 'success.main',
              color: 'success.contrastText',
              height: 40,
              width: 40,
            }}
          >
            <SvgIcon>
              <CheckIcon />
            </SvgIcon>
          </Avatar>
          <div>
            <Typography variant='h6'>All done!</Typography>
            <Typography color='text.secondary' variant='body2'>
              Here’s a preview of your newly created job
            </Typography>
          </div>
        </Stack>
      </div>
      <Card variant='outlined'>
        <Stack
          alignItems='flex-start'
          direction='row'
          flexWrap='wrap'
          justifyContent='space-between'
          sx={{
            px: 2,
            py: 1.5,
          }}
        >
          <div>
            <Stack spacing={2} direction='row' alignItems='center'>
              <Typography variant='subtitle1'>
                {formik.values.jobTitle}
              </Typography>
              <SeverityPill color='primary'>{getJobPillLabel()}</SeverityPill>
            </Stack>

            <Typography color='text.secondary' variant='caption'>
              Customer: {selectedCustomer}
            </Typography>
          </div>
          <div>
            <Stack
              alignItems='center'
              direction='row'
              justifyContent='space-between'
              spacing={3}
            >
              <Typography color='text.secondary' variant='caption'>
                Job Date:{' '}
                {createdJob?.jobDate
                  ? format(new Date(createdJob?.jobDate), 'MM/dd/yyyy')
                  : 'TBD'}
              </Typography>

              <Typography color='text.secondary' variant='caption'>
                Job Time:{' '}
                {createdJob?.jobStartTime
                  ? format(new Date(createdJob?.jobStartTime), 'hh:mm aa')
                  : 'TBD'}
              </Typography>
            </Stack>

            <Stack alignItems='center' direction='row' spacing={3}>
              <Typography color='text.secondary' variant='caption'>
                Estimate Date:{' '}
                {createdJob?.estimateDate
                  ? format(new Date(createdJob?.estimateDate), 'MM/dd/yyyy')
                  : 'TBD'}
              </Typography>

              <Typography color='text.secondary' variant='caption'>
                Estimate Time:{' '}
                {createdJob?.estimateTime
                  ? format(new Date(createdJob?.estimateTime), 'hh:mm aa')
                  : 'TBD'}
              </Typography>
            </Stack>
          </div>
        </Stack>
      </Card>
      <Stack
        alignItems='center'
        justifyContent='flex-end'
        direction='row'
        spacing={2}
      >
        <Button
          component={RouterLink}
          href={`/dashboard/jobs/${createdJob._id}`}
          variant='text'
          size='small'
        >
          View Details
        </Button>
        <Button
          component={RouterLink}
          href={`/dashboard/estimates/${createdJob._id}/create`}
          variant='contained'
          size='small'
        >
          Create Estimate
        </Button>
      </Stack>
    </Stack>
  )
}
