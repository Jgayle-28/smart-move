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
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined'
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined'
import { RouterLink } from 'src/components/router-link'
import { paths } from 'src/paths'

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
          <ContactSupportOutlinedIcon />
        </SvgIcon>
        <Typography color='primary.main' sx={{ pl: 1 }} variant='subtitle2'>
          Help Center
        </Typography>
      </Box>
      <Typography sx={{ mt: 2 }} variant='h6'>
        Need help figuring things out?
      </Typography>
      <Typography color='text.secondary' sx={{ mt: 1 }} variant='body2'>
        Check out our{' '}
        <a href='www.youtube.com' target='_blank'>
          {' '}
          Youtube channel
        </a>{' '}
        for tutorials and how-to videos.
        <br />
        Still need help? Contact us at{' '}
        <a href='mailto:jerehme.gayle@gmail.com'>support@deliverlypro.com</a>
      </Typography>
    </CardContent>
    <Divider />
    <CardActions>
      <Button
        component={RouterLink}
        href={paths.dashboard.help}
        color='inherit'
        endIcon={
          <SvgIcon>
            <OpenInNewOutlinedIcon />{' '}
          </SvgIcon>
        }
        size='small'
      >
        Help Center
      </Button>
    </CardActions>
  </Card>
)
