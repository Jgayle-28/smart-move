import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import {
  Button,
  Card,
  CardContent,
  Divider,
  Unstable_Grid2 as Grid,
  Stack,
  Typography,
} from '@mui/material'
import { PropertyList } from 'src/components/property-list'
import { PropertyListItem } from 'src/components/property-list-item'
import { SeverityPill } from 'src/components/severity-pill'
import { format } from 'date-fns'
import { RouterLink } from 'src/components/router-link'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { BlankEstimatePdf } from 'src/components/estimates/blank-estimate-pdf/BlankEstimatePdf'
import { InvoicePdfDocument } from 'src/components/estimates/invoice/InvoicePdfDocument'
import { EstimatePdfDocument } from 'src/components/estimates/review/EstimatePdfDocument'
import { updateJob } from 'src/store/jobs/jobSlice'
import { toast } from 'react-hot-toast'
import AddToGoogleButton from 'src/components/shared/AddToGoogleButton'

export const JobOverview = (props) => {
  const { focusJob } = useSelector((state) => state.jobs)
  const { company } = useSelector((state) => state.company)

  const dispatch = useDispatch()

  const getJobPillLabel = () => {
    switch (focusJob.jobType) {
      case 'move':
        return 'Move'
      case 'delivery':
        return 'Delivery'
      case 'other':
        return 'Other'
      case 'pu_do':
        return 'Pick Up and Drop Off'
      default:
        return 'Move'
    }
  }

  const handleToggleJobPaid = () => {
    const paidStatus = !focusJob.isPaid
    const updatedJob = { ...focusJob, isPaid: paidStatus }

    dispatch(updateJob(updatedJob))
      .unwrap()
      .then(() => {
        toast.success('Job successfully updated')
      })
  }

  const goggleCalendarEvent = {
    title: focusJob.jobTitle,
    description: focusJob.jobComments,
    location: focusJob.pickUpAddress || focusJob.dropOffAddress,
    startDate: focusJob.jobDate,
    startTime: focusJob.jobStartTime,
    endDate: focusJob.jobDate,
    endTime: focusJob.jobStartTime,
  }

  // TODO: should I add the customer to the estimate event?

  const goggleCalendarEstimateEvent = {
    title: `Estimate for ${focusJob.customer.customerName}`,
    description: focusJob.jobComments,
    location: focusJob.pickUpAddress || focusJob.dropOffAddress,
    startDate: focusJob.estimateDate,
    startTime: focusJob.estimateTime,
    endDate: focusJob.estimateDate,
    endTime: focusJob.estimateTime,
  }

  if (focusJob !== null)
    return (
      <>
        <Grid container spacing={4}>
          <Grid xs={12}></Grid>
          <Grid xs={12}></Grid>
        </Grid>
        <Card>
          <CardContent>
            <PropertyList>
              <PropertyListItem
                align='vertical'
                label='Job Type'
                sx={{
                  px: 0,
                  py: 1,
                }}
              >
                <SeverityPill color='info'>
                  {focusJob && getJobPillLabel()}
                </SeverityPill>
              </PropertyListItem>
              <PropertyListItem
                align='vertical'
                label='Payment Status'
                sx={{
                  px: 0,
                  py: 1,
                }}
              >
                {focusJob?.isPaid ? (
                  <SeverityPill color='success'>Paid</SeverityPill>
                ) : (
                  <SeverityPill color='warning'>Not Paid</SeverityPill>
                )}
              </PropertyListItem>
              <PropertyListItem
                align='vertical'
                label='Created On'
                sx={{
                  px: 0,
                  py: 1,
                }}
              >
                {focusJob && format(new Date(focusJob.createdAt), 'MM/dd/yyyy')}
              </PropertyListItem>
              <PropertyListItem
                align='vertical'
                label='Created By'
                sx={{
                  px: 0,
                  py: 1,
                }}
              >
                <Typography>{focusJob?.createdBy?.name || ''}</Typography>
              </PropertyListItem>
            </PropertyList>

            {focusJob && !focusJob.estimate && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography
                  color='text.secondary'
                  component='p'
                  sx={{ mb: 2 }}
                  variant='overline'
                >
                  Next Steps
                </Typography>
                <Stack spacing={2}>
                  <PDFDownloadLink
                    document={
                      <BlankEstimatePdf focusJob={focusJob} company={company} />
                    }
                    fileName={`${focusJob?.customer?.customerName}-blank-estimate-sheet.pdf`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Button fullWidth variant='outlined' size='small'>
                      Print Blank Estimate Pdf
                    </Button>
                  </PDFDownloadLink>

                  <Button
                    component={RouterLink}
                    href={`/dashboard/estimates/${focusJob._id}/create`}
                    variant='contained'
                    size='small'
                  >
                    Create Estimate
                  </Button>
                </Stack>
              </>
            )}
            {focusJob && focusJob.estimate && (
              <>
                <Divider sx={{ my: 2 }} />
                <Stack spacing={2}>
                  <PDFDownloadLink
                    document={
                      <InvoicePdfDocument
                        focusJob={focusJob}
                        company={company}
                        focusEstimate={focusJob.estimate}
                      />
                    }
                    fileName={`${focusJob?.customer?.customerName}-invoice.pdf`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Button fullWidth variant='outlined' size='small'>
                      Print Invoice
                    </Button>
                  </PDFDownloadLink>
                  <PDFDownloadLink
                    document={
                      <EstimatePdfDocument
                        focusJob={focusJob}
                        company={company}
                        focusEstimate={focusJob.estimate}
                      />
                    }
                    fileName={`${focusJob?.customer?.customerName}-estimate.pdf`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Button fullWidth variant='contained' size='small'>
                      Print Estimate
                    </Button>
                  </PDFDownloadLink>
                  <Button
                    fullWidth
                    component={RouterLink}
                    href={`/dashboard/estimates/${focusJob?._id}/edit/${focusJob?.estimate._id}`}
                    variant='contained'
                    size='small'
                    color='secondary'
                  >
                    View Estimate
                  </Button>
                  <Button
                    fullWidth
                    variant='contained'
                    size='small'
                    color={focusJob?.isPaid ? 'warning' : 'success'}
                    onClick={handleToggleJobPaid}
                  >
                    {focusJob?.isPaid
                      ? 'Mark Job As Not Paid'
                      : 'Mark Job As Paid'}
                  </Button>
                </Stack>
              </>
            )}
            <Stack sx={{ marginTop: 2 }} spacing={2}>
              {focusJob && focusJob.jobDate && focusJob.jobStartTime && (
                <AddToGoogleButton
                  eventDetails={goggleCalendarEvent}
                  type='Move'
                />
              )}
              {focusJob && focusJob.estimateDate && focusJob.estimateTime && (
                <AddToGoogleButton
                  eventDetails={goggleCalendarEstimateEvent}
                  type='Estimate'
                />
              )}
            </Stack>
          </CardContent>
        </Card>
      </>
    )
}

JobOverview.propTypes = {
  job: PropTypes.object.isRequired,
}
