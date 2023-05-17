import PropTypes from 'prop-types'
import { PDFViewer } from '@react-pdf/renderer'
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft'
import { Box, Button, Dialog, SvgIcon } from '@mui/material'
import { InvoicePdfDocument } from './InvoicePdfDocument'
import { useSelector } from 'react-redux'

export const InvoicePdfDialog = (props) => {
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
              <SvgIcon>
                <ArrowLeftIcon />
              </SvgIcon>
            }
            onClick={onClose}
          >
            Close
          </Button>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <PDFViewer height='100%' style={{ border: 'none' }} width='100%'>
            <InvoicePdfDocument
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

InvoicePdfDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
}
