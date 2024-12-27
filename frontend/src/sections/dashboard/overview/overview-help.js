import InfoCircleIcon from '@untitled-ui/icons-react/build/esm/InfoCircle'
import Link01Icon from '@untitled-ui/icons-react/build/esm/Link01'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  SvgIcon,
  Typography,
} from '@mui/material'

export const OverviewHelp = (props) => (
  <Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <SvgIcon color='primary'>
          <InfoCircleIcon />
        </SvgIcon>
        <Typography color='primary.main' sx={{ pl: 1 }} variant='subtitle2'>
          Help Center
        </Typography>
      </Box>
      <Typography sx={{ mt: 2 }} variant='h6'>
        Need help figuring things out?
      </Typography>
      <Typography color='text.secondary' sx={{ mt: 1 }} variant='body2'>
        Check out our Youtube channel for tutorials and how-to videos.
        <br />
        Still need help? Contact us at{' '}
        <a href='mailto:jerehme.gayle@gmail.com'>support@deliverlypro.com</a>
      </Typography>
    </CardContent>
    <Divider />
    <CardActions>
      <Button
        color='inherit'
        endIcon={
          <SvgIcon>
            <Link01Icon />
          </SvgIcon>
        }
        size='small'
      >
        Help Center
      </Button>
    </CardActions>
  </Card>
)
