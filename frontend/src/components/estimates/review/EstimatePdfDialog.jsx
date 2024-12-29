import PropTypes from 'prop-types'
import { PDFViewer } from '@react-pdf/renderer'
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined'
import { Box, Button, Dialog, SvgIcon } from '@mui/material'
import { EstimatePdfDocument } from './EstimatePdfDocument'
import { useSelector } from 'react-redux'

export const EstimatePdfDialog = (props) => {
  const { onClose, open = false, ...other } = props
  const { focusJob } = useSelector((state) => state.jobs)
  const { company } = useSelector((state) => state.company)
  const { focusEstimate } = useSelector((state) => state.estimates)

  if (!focusEstimate || !focusJob || !company) {
    return null
  }

  return (
    <Dialog fullScreen open={open} {...other}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'background.paper',
            p: 2,
          }}
        >
          <Button
            color='inherit'
            startIcon={
              <SvgIcon fontSize='small'>
                <KeyboardBackspaceOutlinedIcon />
              </SvgIcon>
            }
            onClick={onClose}
          >
            Close
          </Button>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <PDFViewer height='100%' style={{ border: 'none' }} width='100%'>
            <EstimatePdfDocument
              focusJob={focusJob}
              company={company}
              focusEstimate={focusEstimate}
            />
          </PDFViewer>
        </Box>
      </Box>
    </Dialog>
  )
}

EstimatePdfDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
}
