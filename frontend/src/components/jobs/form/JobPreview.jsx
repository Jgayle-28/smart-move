import CheckIcon from '@untitled-ui/icons-react/build/esm/Check'
import { Avatar, Button, Card, Stack, SvgIcon, Typography } from '@mui/material'
import { SeverityPill } from 'src/components/severity-pill'
import { RouterLink } from 'src/components/router-link'
import { useSelector } from 'react-redux'

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
          alignItems='center'
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
          <Stack alignItems='center' direction='row' spacing={2}>
            <Button
              component={RouterLink}
              href={`/dashboard/jobs/${createdJob._id}`}
              variant='text'
              size='small'
            >
              View Details
            </Button>
            <Button variant='contained' size='small'>
              Create Estimate
            </Button>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  )
}
