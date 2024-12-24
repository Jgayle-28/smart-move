import React, { useState } from 'react'
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
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
import { useTheme } from '@emotion/react'
import { useGoogleCalendar } from 'src/hooks/use-google-calendar'

export const JobOverview = (props) => {
  const { focusJob } = useSelector((state) => state.jobs)
  const { company } = useSelector((state) => state.company)
  const [eventType, setEventType] = useState('Move')
  const [modalOpen, setModalOpen] = useState(false)

  const dispatch = useDispatch()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const {
    generateGoogleCalendarEstimateEvent,
    generateGoogleCalendarMoveEvent,
  } = useGoogleCalendar()

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
  // TODO: should I add the customer to the estimate event?

  const googleMoveEvent = generateGoogleCalendarMoveEvent(focusJob)
  const googleEstimateEvent = generateGoogleCalendarEstimateEvent(focusJob)

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
              <Button
                fullWidth
                variant='outlined'
                size='small'
                disabled={
                  !focusJob || !focusJob.jobDate || !focusJob.jobStartTime
                }
                onClick={() => {
                  setEventType('Move')
                  setModalOpen(true)
                }}
              >
                Add Move Calendar
              </Button>
              <Button
                fullWidth
                variant='outlined'
                size='small'
                disabled={
                  !focusJob || !focusJob.estimateDate || !focusJob.estimateTime
                }
                onClick={() => {
                  setEventType('Estimate')
                  setModalOpen(true)
                }}
              >
                Add Estimate To Calendar
              </Button>
              {/* {focusJob && focusJob.jobDate && focusJob.jobStartTime && (
                <AddToGoogleButton
                  eventDetails={goggleCalendarEvent}
                  type='Move'
                />
              )} */}
              {/* {focusJob && focusJob.estimateDate && focusJob.estimateTime && (
                <AddToGoogleButton
                  eventDetails={goggleCalendarEstimateEvent}
                  type='Estimate'
                />
              )} */}
            </Stack>
          </CardContent>
        </Card>
        <Dialog
          fullScreen={fullScreen}
          size='md'
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          aria-labelledby='responsive-dialog-title'
          PaperProps={{
            sx: {
              height: '300px',
              overflow: 'visible',
            },
          }}
        >
          <DialogTitle id='responsive-dialog-title'>
            {`What Calendar Would You Like To Add This ${eventType} To?`}
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} direction='column' sx={{ mt: 2 }}>
              <AddToGoogleButton
                eventDetails={
                  eventType === 'Move' ? googleMoveEvent : googleEstimateEvent
                }
                type={eventType}
                callBack={() => setModalOpen(false)}
              />
              <AddToGoogleButton
                eventDetails={
                  eventType === 'Move' ? googleMoveEvent : googleEstimateEvent
                }
                type={eventType}
                callBack={() => setModalOpen(false)}
              />
            </Stack>
            {/* <DialogContentText sx={{ mb: 2, fontSize: '0.875rem' }}>
              Select the calendar you would like to add this {eventType} to.
            </DialogContentText> */}
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={() => setModalOpen(false)}
              color='primary'
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
}

JobOverview.propTypes = {
  job: PropTypes.object.isRequired,
}
