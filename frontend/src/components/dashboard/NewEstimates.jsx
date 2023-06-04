import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight'
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

export const NewEstimates = () => {
  const { currentWeekEstimates } = useSelector((state) => state.estimates)
  if (currentWeekEstimates)
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
            <img src='/assets/iconly/iconly-glass-paper.svg' width={40} />
            {/* <img src='/assets/iconly/iconly-glass-info.svg' width={48} /> */}
          </div>
          <Box sx={{ flexGrow: 1 }}>
            <Typography color='text.secondary' variant='body2'>
              New Estimates
            </Typography>
            <Typography color='text.primary' variant='h4'>
              {currentWeekEstimates.length}
            </Typography>
          </Box>
        </Stack>
        <Divider />
        <CardActions>
          <Button
            component={RouterLink}
            href='/dashboard/estimates'
            color='inherit'
            endIcon={
              <SvgIcon>
                <ArrowRightIcon />
              </SvgIcon>
            }
            size='small'
          >
            See All Estimates
          </Button>
        </CardActions>
      </Card>
    )
}
