import PropTypes from 'prop-types'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'
import {
  Box,
  Button,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  SvgIcon,
  Typography,
} from '@mui/material'
import { RouterLink } from 'src/components/router-link'
import { useRouter } from 'src/hooks/use-router'
import { paths } from 'src/paths'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from 'src/store/auth/authSlice'

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open, ...other } = props
  const router = useRouter()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logoutUser())
    router.push('/login')
  }

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'bottom',
      }}
      disableScrollLock
      onClose={onClose}
      open={!!open}
      PaperProps={{ sx: { width: 200 } }}
      {...other}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant='body1'>{user && user.name}</Typography>
        <Typography color='text.secondary' variant='body2'>
          {user && user.email}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 1 }}>
        {/* <ListItemButton
          component={RouterLink}
          href={paths.dashboard.social.profile}
          onClick={onClose}
          sx={{
            borderRadius: 1,
            px: 1,
            py: 0.5,
          }}
        >
          <ListItemIcon>
            <SvgIcon fontSize='small'>
              <User03Icon />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant='body1'>Profile</Typography>}
          />
        </ListItemButton> */}
        <ListItemButton
          component={RouterLink}
          href={paths.dashboard.account}
          onClick={onClose}
          sx={{
            borderRadius: 1,
            px: 1,
            py: 0.5,
          }}
        >
          <ListItemIcon>
            <SvgIcon fontSize='small'>
              <TuneOutlinedIcon />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant='body1'>Account</Typography>}
          />
        </ListItemButton>
        {/* <ListItemButton
          component={RouterLink}
          href={paths.dashboard.index}
          onClick={onClose}
          sx={{
            borderRadius: 1,
            px: 1,
            py: 0.5,
          }}
        >
          <ListItemIcon>
            <SvgIcon fontSize='small'>
              <CreditCard01Icon />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant='body1'>Billing</Typography>}
          />
        </ListItemButton> */}
      </Box>
      <Divider sx={{ my: '0 !important' }} />
      <Box
        sx={{
          display: 'flex',
          p: 1,
          justifyContent: 'center',
        }}
      >
        <Button color='inherit' onClick={handleLogout} size='small'>
          Logout
        </Button>
      </Box>
    </Popover>
  )
}

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
}
