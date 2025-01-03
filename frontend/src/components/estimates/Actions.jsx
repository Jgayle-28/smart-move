import { Box, Button, Grid, Stack } from '@mui/material'
import { useRef } from 'react'
import { useDialog } from 'src/hooks/use-dialog'

function Actions() {
  const rootRef = useRef(null)
  const dialog = useDialog()

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
              {/* <PDFDownloadLink
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
              </PDFDownloadLink> */}
            </Stack>
            {/* <InvoicePreview
              focusJob={focusJob}
              company={company}
              focusEstimate={focusEstimate}
            /> */}
          </Box>
        </Grid>
      </Grid>
      {/* <InvoicePdfDialog onClose={dialog.handleClose} open={dialog.open} /> */}
    </>
  )
}

export default Actions
