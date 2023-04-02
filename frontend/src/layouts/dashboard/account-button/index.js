import { Avatar, Box, ButtonBase, SvgIcon } from '@mui/material'
import { usePopover } from 'src/hooks/use-popover'
import { AccountPopover } from './account-popover'
import { stringToColor } from 'src/utils/string-to-color'
import { useAuth } from 'src/hooks/use-auth'

export const AccountButton = () => {
  const popover = usePopover()
  const { user } = useAuth()

  return (
    <>
      <Box
        component={ButtonBase}
        onClick={popover.handleOpen}
        ref={popover.anchorRef}
        sx={{
          alignItems: 'center',
          display: 'flex',
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: 'divider',
          height: 40,
          width: 40,
          borderRadius: '50%',
        }}
      >
        <Avatar
          sx={{
            height: 32,
            width: 32,
            bgcolor: stringToColor(user ? user.name : 'temp'),
          }}
        >
          {(user && user.name.charAt(0)) || ''}
        </Avatar>
      </Box>
      <AccountPopover
        anchorEl={popover.anchorRef.current}
        onClose={popover.handleClose}
        open={popover.open}
      />
    </>
  )
}
