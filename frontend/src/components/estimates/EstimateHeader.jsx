import { PDFDownloadLink } from '@react-pdf/renderer'
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft'
import { Avatar, Button, Stack, SvgIcon, Typography } from '@mui/material'
import { InvoicePdfDocument } from 'src/sections/dashboard/invoice/invoice-pdf-document'
import { getInitials } from 'src/utils/get-initials'
import { useRouter } from 'src/hooks/use-router'
import { format } from 'date-fns'

function EstimateHeader({ job, isEdit, invoice, dialog, handleSaveEstimate }) {
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
              // component={RouterLink}
              // href={paths.dashboard.invoices.index}
              sx={{
                alignItems: 'center',
                display: 'inline-flex',
              }}
              // underline='hover'
              onClick={() => router.back()}
              startIcon={
                <SvgIcon>
                  <ArrowLeftIcon />
                </SvgIcon>
              }
            >
              <Typography variant='subtitle2'>Go Back</Typography>
            </Button>
          </div>
          <Stack alignItems='center' direction='row' spacing={2}>
            <Button color='error' onClick={dialog.handleOpen}>
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
