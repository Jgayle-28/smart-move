import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

function Spinner() {
  return (
    <Box
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        width: '100%',
        height: '80vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      // sx={{
      //   display: 'flex',
      //   justifyContent: 'center',
      //   alignItems: 'center',
      //   height: '80vh',
      // }}
    >
      <CircularProgress sx={{ height: 70, width: 70 }} />
    </Box>
  )
}

export default Spinner
