import PropTypes from 'prop-types'
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
import { useSelector } from 'react-redux'
import { RouterLink } from 'src/components/router-link'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { BlankEstimatePdf } from 'src/components/estimates/blank-estimate-pdf/BlankEstimatePdf'

export const JobOverview = (props) => {
  const { focusJob } = useSelector((state) => state.jobs)
  const { company } = useSelector((state) => state.company)

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
            {/* Add check for estimate to display quick actions */}

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
          </CardContent>
        </Card>
      </>
    )
}

JobOverview.propTypes = {
  job: PropTypes.object.isRequired,
}
