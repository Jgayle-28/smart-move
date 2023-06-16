import PropTypes from 'prop-types'
import XIcon from '@untitled-ui/icons-react/build/esm/X'
import {
  Box,
  Drawer,
  IconButton,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { EstimateDetails } from './EstimateDetails.jsx'

export const EstimateDrawer = (props) => {
  const { container, onClose, open, order, estimate } = props
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'))

  let content = null

  if (estimate) {
    content = (
      <div>
        <Stack
          alignItems='center'
          direction='row'
          justifyContent='space-between'
          sx={{
            px: 3,
            py: 2,
          }}
        >
          <Typography color='inherit' variant='h6'>
            {/* {order.number} */}
          </Typography>
          <IconButton color='inherit' onClick={onClose}>
            <SvgIcon>
              <XIcon />
            </SvgIcon>
          </IconButton>
        </Stack>
        <Box
          sx={{
            px: 3,
            // py: 4,
          }}
        >
          <EstimateDetails estimate={estimate} />
        </Box>
      </div>
    )
  }

  if (lgUp) {
    return (
      <Drawer
        anchor='right'
        open={open}
        PaperProps={{
          sx: {
            position: 'relative',
            width: 500,
          },
        }}
        SlideProps={{ container }}
        variant='persistent'
      >
        {content}
      </Drawer>
    )
  }

  return (
    <Drawer
      anchor='left'
      hideBackdrop
      ModalProps={{
        container,
        sx: {
          pointerEvents: 'none',
          position: 'absolute',
        },
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          maxWidth: '100%',
          width: 400,
          pointerEvents: 'auto',
          position: 'absolute',
        },
      }}
      SlideProps={{ container }}
      variant='temporary'
    >
      {content}
    </Drawer>
  )
}

EstimateDrawer.propTypes = {
  container: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  order: PropTypes.object,
}
