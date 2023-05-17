import { useRef } from 'react'
import { Box, Button, Grid, Stack } from '@mui/material'
import { EstimatePreview } from './review/EstimatePreview'
import { useSelector } from 'react-redux'
import { useDialog } from 'src/hooks/use-dialog'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { InvoicePdfDocument } from './review/InvoicePdfDocument'

function Review() {
  const rootRef = useRef(null)
  const dialog = useDialog()
  const { focusJob } = useSelector((state) => state.jobs)
  const { company } = useSelector((state) => state.company)
  const { focusEstimate } = useSelector((state) => state.estimates)
  return (
    <>
      <Grid container spacing={3}>
        <Grid
          xs={12}
          md={12}
          sx={{
            pl: 3,
            mt: 3,
          }}
        >
          <Box
            ref={rootRef}
            sx={{
              p: 3,
            }}
          >
            <Stack
              justifyContent='flex-end'
              alignItems='center'
              direction='row'
              spacing={2}
              sx={{ mb: 3 }}
            >
              <Button color='inherit' onClick={dialog.handleOpen}>
                Preview
              </Button>
              <PDFDownloadLink
                document={
                  <InvoicePdfDocument
                    focusJob={focusJob}
                    company={company}
                    focusEstimate={focusEstimate}
                  />
                }
                fileName={`${focusEstimate?.customer?.customerName}-${focusEstimate?.invoiceId}.pdf`}
                style={{ textDecoration: 'none' }}
              >
                <Button color='primary' variant='contained'>
                  Download
                </Button>
              </PDFDownloadLink>
            </Stack>
            <EstimatePreview />
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default Review
