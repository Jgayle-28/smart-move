import PropTypes from 'prop-types'
import { Box, IconButton, Stack, SvgIcon, Typography } from '@mui/material'
import { usePopover } from 'src/hooks/use-popover'
import { TenantPopover } from './tenant-popover'
import { useSelector } from 'react-redux'

const tenants = ['Devias', 'Acme Corp']

export const TenantSwitch = (props) => {
  const popover = usePopover()
  const { company } = useSelector((state) => state.company)

  return (
    <>
      <Stack alignItems='center' direction='row' spacing={2} {...props}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography color='inherit' variant='h6'>
            {company && company.companyName}
          </Typography>
          <Typography color='neutral.400' variant='body2'>
            {company && company.companyEmail}
          </Typography>
        </Box>
        {/* <IconButton
          onClick={popover.handleOpen}
          ref={popover.anchorRef}
        >
          <SvgIcon sx={{ fontSize: 16 }}>
            <ChevronDownIcon />
          </SvgIcon>
        </IconButton> */}
      </Stack>
      {/* <TenantPopover
        anchorEl={popover.anchorRef.current}
        onChange={popover.handleClose}
        onClose={popover.handleClose}
        open={popover.open}
        tenants={tenants}
      /> */}
    </>
  )
}

TenantSwitch.propTypes = {
  sx: PropTypes.object,
}
