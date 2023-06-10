import { Box, Card, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

function EmptyState({ title = '', subtitle = '', styles = {} }) {
  // const theme = useTheme()
  // const themeMode = theme.palette.mode
  return (
    <Box sx={{ mt: 3, p: 6 }} {...styles}>
      <Card variant='outlined'>
        <Stack spacing={1} sx={{ px: 2, py: 1.5 }}>
          {/* <img src='/assets/empty-state.svg' /> */}
          <Typography textAlign='center'>{title}</Typography>
          {subtitle && subtitle.length > 0 && (
            <Typography
              textAlign='center'
              variant='caption'
              color='text.secondary'
            >
              {subtitle}
            </Typography>
          )}
        </Stack>
      </Card>
    </Box>
  )
}

export default EmptyState
