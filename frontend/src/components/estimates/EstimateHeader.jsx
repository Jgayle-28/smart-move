import { PDFDownloadLink } from '@react-pdf/renderer'
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined'
import { Avatar, Button, Stack, SvgIcon, Typography } from '@mui/material'
import { InvoicePdfDocument } from 'src/sections/dashboard/invoice/invoice-pdf-document'
import { getInitials } from 'src/utils/get-initials'
import { useRouter } from 'src/hooks/use-router'
import { format } from 'date-fns'

function EstimateHeader({
  job,
  handleSaveEstimate,
  handleDeleteEstimate,
  disableDelete,
}) {
  const router = useRouter()
  return (
    <>
      <Stack spacing={4}>
        <Stack
          alignItems='flex-start'
          direction='row'
          justifyContent='space-between'
          spacing={4}
        >
          <div>
            <Button
              color='inherit'
              sx={{
                alignItems: 'center',
                display: 'inline-flex',
              }}
              onClick={() => router.back()}
              startIcon={
                <SvgIcon fontSize='small'>
                  <KeyboardBackspaceOutlinedIcon />
                </SvgIcon>
              }
            >
              <Typography variant='subtitle2'>Go Back</Typography>
            </Button>
          </div>
          <Stack alignItems='center' direction='row' spacing={2}>
            <Button
              color='error'
              onClick={handleDeleteEstimate}
              disabled={disableDelete}
            >
              delete Estimate
            </Button>
            {/* <PDFDownloadLink
              document={<InvoicePdfDocument invoice={invoice} />}
              fileName='invoice'
              style={{ textDecoration: 'none' }}
            >
              <Button size='small' color='success' variant='contained'>
                Save Estimate
              </Button>
            </PDFDownloadLink> */}
            <Button
              size='small'
              color='success'
              variant='contained'
              onClick={handleSaveEstimate}
            >
              Save Estimate
            </Button>
          </Stack>
        </Stack>
        <Stack
          alignItems='flex-start'
          direction='row'
          justifyContent='space-between'
          spacing={4}
        >
          <Stack alignItems='center' direction='row' spacing={2}>
            <Avatar
              sx={{
                height: 42,
                width: 42,
              }}
            >
              {getInitials(job.customer.customerName)}
            </Avatar>
            <div>
              <Typography variant='h4'>{job.jobTitle} Estimate</Typography>
              <Stack direction='row' spacing={2}>
                <Typography color='text.secondary' variant='body2'>
                  Customer: {job.customer.customerName}
                </Typography>
                <Typography color='text.secondary' variant='body2'>
                  Phone: {job.customer.customerPhoneNumber}
                </Typography>
                <Typography color='text.secondary' variant='body2'>
                  Email: {job.customer.customerEmail}
                </Typography>
                <Typography color='text.secondary' variant='body2'>
                  Job Date:{' '}
                  {job.jobDate !== null
                    ? format(new Date(job.jobDate), 'MM/dd/yyyy')
                    : 'TBD'}
                </Typography>
              </Stack>
            </div>
          </Stack>
          {/* {isEdit && (
            <>
              <Stack alignItems='center' direction='row' spacing={2}>
                <Button color='inherit' onClick={dialog.handleOpen}>
                  Preview
                </Button>
                <PDFDownloadLink
                  document={<InvoicePdfDocument invoice={invoice} />}
                  fileName='invoice'
                  style={{ textDecoration: 'none' }}
                >
                  <Button size='small' color='success' variant='contained'>
                    Download
                  </Button>
                </PDFDownloadLink>
              </Stack>
            </>
          )} */}
        </Stack>
      </Stack>
    </>
  )
}

export default EstimateHeader
