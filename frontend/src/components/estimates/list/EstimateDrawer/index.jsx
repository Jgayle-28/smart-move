import PropTypes from 'prop-types'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
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
  const { container, onClose, open, estimate, setConeModalOpen } = props
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
          <Typography color='inherit' variant='h6'></Typography>
          <IconButton color='inherit' onClick={onClose}>
            <SvgIcon fontSize='small'>
              <CloseOutlinedIcon />
            </SvgIcon>
          </IconButton>
        </Stack>
        <Box
          sx={{
            px: 3,
          }}
        >
          <EstimateDetails
            estimate={estimate}
            setConeModalOpen={setConeModalOpen}
          />
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
            width: 500,
          },
        }}
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
