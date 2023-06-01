import PropTypes from 'prop-types'
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

export const NewClients = () => {
  const { currentWeekCustomers } = useSelector((state) => state.customers)
  if (currentWeekCustomers)
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
            <img src='/assets/iconly/iconly-glass-tick.svg' width={40} />
          </div>
          <Box sx={{ flexGrow: 1 }}>
            <Typography color='text.secondary' variant='body2'>
              New Customers
            </Typography>
            <Typography color='text.primary' variant='h4'>
              {currentWeekCustomers.length}
            </Typography>
          </Box>
        </Stack>
        <Divider />
        <CardActions>
          <Button
            color='inherit'
            endIcon={
              <SvgIcon>
                <ArrowRightIcon />
              </SvgIcon>
            }
            size='small'
          >
            See all customers
          </Button>
        </CardActions>
      </Card>
    )
}

NewClients.propTypes = {
  amount: PropTypes.number.isRequired,
}
