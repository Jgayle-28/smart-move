import PropTypes from 'prop-types'
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined'
import {
  Box,
  Button,
  Card,
  CardActions,
  Divider,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { RouterLink } from '../router-link'

export const NewJobs = (props) => {
  const { amount } = props
  const { currentWeekJobs } = useSelector((state) => state.jobs)

  if (currentWeekJobs)
    return (
      <Card>
        <Stack
          alignItems='center'
          direction={{
            xs: 'column',
            sm: 'row',
          }}
          spacing={3}
          sx={{
            px: 4,
            py: 3,
          }}
        >
          <div>
            <img src='/assets/iconly/iconly-glass-chart.svg' width={50} />
          </div>
          <Box sx={{ flexGrow: 1 }}>
            <Typography color='text.secondary' variant='body2'>
              New Jobs
            </Typography>
            <Typography color='text.primary' variant='h4'>
              {currentWeekJobs?.length}
            </Typography>
          </Box>
        </Stack>
        <Divider />
        <CardActions>
          <Button
            component={RouterLink}
            href='/dashboard/jobs'
            color='inherit'
            endIcon={
              <SvgIcon fontSize='small'>
                <ArrowRightAltOutlinedIcon />
              </SvgIcon>
            }
            size='small'
          >
            See All Jobs
          </Button>
        </CardActions>
      </Card>
    )
}

NewJobs.propTypes = {
  amount: PropTypes.number.isRequired,
}
