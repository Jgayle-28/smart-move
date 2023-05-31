import { Popover, Stack, Typography, Box, Divider } from '@mui/material'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import { format } from 'date-fns'

function EventDetailPopper({
  eventPopperOpen,
  eventAnchor,
  handleEventHoverToggle,
  currentEvent,
}) {
  const getIcon = () => {
    switch (currentEvent?.type) {
      case 'packing':
        return <Inventory2OutlinedIcon fontSize='small' />
      case 'estimate':
        return <InventoryOutlinedIcon fontSize='small' />
      case 'job':
        return <LocalShippingOutlinedIcon fontSize='small' />
      default:
        return <LocalShippingOutlinedIcon fontSize='small' />
    }
  }
  return (
    <>
      <Popover
        id='mouse-over-popover'
        sx={{
          pointerEvents: 'none',
        }}
        open={eventPopperOpen}
        anchorEl={eventAnchor}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        onClose={handleEventHoverToggle}
        disableRestoreFocus
      >
        <Box sx={{ minWidth: 300 }}>
          <Box sx={{ p: 1 }}>
            <Stack direction='row' alignItems='center' spacing={1}>
              {getIcon()}
              <Typography
                sx={{ textTransform: 'capitalize' }}
                variant='subtitle2'
              >
                {currentEvent?.type}
              </Typography>
            </Stack>
          </Box>
          <Divider sx={{ mb: 1 }} />
          <Box sx={{ p: 1 }}>
            <Stack direction='column' spacing={1}>
              <Typography variant='caption'>
                Customer: {currentEvent?.title}
              </Typography>
              <Typography variant='caption'>
                Date:{' '}
                {currentEvent && currentEvent?.start !== null
                  ? format(new Date(currentEvent?.start), 'MM/dd/yyyy')
                  : 'TBD'}
              </Typography>
              <Typography variant='caption'>
                Time:{' '}
                {currentEvent && currentEvent?.jobTime !== null
                  ? format(new Date(currentEvent?.jobTime), 'hh:mm aa')
                  : 'TBD'}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Popover>
    </>
  )
}

export default EventDetailPopper
