import { Avatar, CardHeader, Divider, Typography, Stack } from '@mui/material'
import { useSelector } from 'react-redux'
import { getInitials } from 'src/utils/get-initials'

function JobDetailHeader() {
  const { focusJob } = useSelector((state) => state.jobs)
  if (focusJob)
    return (
      <>
        <CardHeader
          disableTypography
          title={
            <Stack alignItems='flex-start' direction='row' spacing={2}>
              <Avatar
                variant='rounded'
                sx={(theme) => ({
                  bgcolor: theme.palette.primary.main,
                })}
              >
                {getInitials(focusJob?.customer?.customerName)}
              </Avatar>
              <Stack spacing={1}>
                <Typography variant='h6'>
                  {focusJob?.customer?.customerName}
                </Typography>
                <Typography
                  sx={{ marginTop: 0 }}
                  variant='body2'
                  color='text.secondary'
                >
                  email: {focusJob?.customer?.customerEmail}
                  <Typography component='span' sx={{ marginLeft: 2 }}>
                    tel: {focusJob?.customer?.customerPhoneNumber}
                  </Typography>
                </Typography>
              </Stack>
            </Stack>
          }
        />
        <Divider />
      </>
    )
}

export default JobDetailHeader
