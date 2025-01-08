import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  IconButton,
  Card,
} from '@mui/material'
import { Seo } from 'src/components/seo'
import { useDialog } from 'src/hooks/use-dialog'
import { usePageView } from 'src/hooks/use-page-view'
import { EstimateDrawer } from 'src/components/estimates/list/EstimateDrawer'
import { clearEstimates, getEstimates } from 'src/store/estimates/estimateSlice'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from 'src/components/shared/Spinner'
import { clearJobs, getJobs, updateJob } from 'src/store/jobs/jobSlice'
import { addEstimate } from 'src/store/estimates/estimateSlice'
import { useTheme } from '@emotion/react'
import { useRouter } from 'src/hooks/use-router'
import JobSelect from 'src/components/shared/JobSelect'
import toast from 'react-hot-toast'
import { paths } from 'src/paths'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import _ from 'lodash'
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined'
import { SeverityPill } from 'src/components/severity-pill'
import { Container } from '@mui/system'
import { defaultDataGridStyles } from 'src/constants/data-grid-styles'

const Page = () => {
  const [focusEstimate, setFocusEstimate] = useState(null)
  const [coneModalOpen, setConeModalOpen] = useState(false)
  const [jobToCloneTo, setJobToCloneTo] = useState(null)

  const rootRef = useRef(null)
  const dialog = useDialog()

  const { estimates, isLoading } = useSelector((state) => state.estimates)
  const { jobs } = useSelector((state) => state.jobs)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const router = useRouter()
  usePageView()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    if (user) dispatch(getEstimates(user?.company))
    return () => {
      dispatch(clearEstimates())
    }
  }, [user, dispatch])

  useEffect(() => {
    dispatch(getJobs(user.company))
    return () => {
      dispatch(clearJobs())
    }
  }, [user, dispatch])

  const handleEstimateOpen = useCallback(
    (estimate) => {
      // Close drawer if is the same order
      if (dialog.open && estimate._id === focusEstimate._id) {
        dialog.handleClose()
        return
      }

      dialog.handleOpen(estimate._id)
      setFocusEstimate(estimate)
    },
    [dialog]
  )

  const handleCloneClick = () => {
    const job = jobs.find((job) => job._id === jobToCloneTo)
    // Clone estimate to job
    const estimateData = {
      ...focusEstimate,
      job: job._id,
      company: job.company,
      customer: job.customer._id,
      createdBy: user._id,
    }
    // delete estimate id to prevent duplicate
    delete estimateData._id
    dispatch(addEstimate(estimateData))
      .unwrap()
      .then((res) => {
        if (res) {
          dispatch(updateJob({ ...job, estimate: res._id }))
        }
        toast.success('Estimate successfully cloned')
        router.push(
          `${paths.dashboard.estimates.index}/${job._id}/edit/${res._id}`
        )
      })
    setConeModalOpen(false)
  }

  // Columns ---------------------
  const finalColumns = useMemo(() => [
    {
      headerName: 'Customer Name',
      field: 'customer',
      type: 'string',
      flex: 1,
      valueGetter: ({ customerName }) => customerName,
    },
    {
      headerName: 'Estimate Total',
      field: 'totalCharges',
      type: 'string',
      flex: 1,
      renderCell: (row) => {
        return `$${row.row.totalCharges}`
      },
    },
    {
      headerName: 'Date Created',
      field: 'createdAt',
      type: 'date',
      flex: 1,
      valueFormatter: (date) => new Date(date).toLocaleDateString(),
    },
    {
      headerName: 'Type',
      field: 'job',
      type: 'string',
      flex: 1,
      renderCell: (row) => {
        return (
          <SeverityPill color='primary'>{row.row.job?.jobType}</SeverityPill>
        )
      },
    },
    {
      headerName: `Created By`,
      field: 'createdBy',
      type: 'string',
      flex: 1,
      valueGetter: ({ name }) => name,
    },

    {
      headerName: '',
      field: 'itemRoom',
      type: 'boolean',
      disableExport: true,
      sortable: false,
      filterable: false,
      width: 50,
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <>
          <IconButton onClick={() => handleEstimateOpen(row)}>
            <OpenInNewOutlinedIcon fontSize='small' />
          </IconButton>
        </>
      ),
    },
  ])

  if (!estimates || !jobs) return <Spinner />
  return (
    <>
      <Seo title='Dashboard: Estimate List' />
      <Divider />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth='xl'>
          <Stack
            alignItems='flex-start'
            direction='row'
            justifyContent='space-between'
            spacing={1}
          >
            <Stack spacing={1}>
              <Typography variant='h4'>Estimates</Typography>
            </Stack>
          </Stack>
          <Card sx={{ my: 8, paddingTop: 1.5 }}>
            <DataGrid
              getRowId={_.property('_id')}
              loading={isLoading || !estimates}
              rows={estimates || []}
              columns={finalColumns}
              sx={{ ...defaultDataGridStyles }}
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  printOptions: { disableToolbarButton: true },
                },
              }}
              localeText={{
                noRowsLabel: 'You have not added any estimates yet',
              }}
            />
          </Card>
          <EstimateDrawer
            container={rootRef.current}
            onClose={dialog.handleClose}
            open={dialog.open}
            estimate={focusEstimate}
            coneModalOpen={coneModalOpen}
            setConeModalOpen={setConeModalOpen}
            focusEstimate={focusEstimate}
          />
          {/* Clone Dialog */}
          <Dialog
            fullScreen={fullScreen}
            size='md'
            open={coneModalOpen}
            onClose={() => setConeModalOpen(false)}
            aria-labelledby='responsive-dialog-title'
            PaperProps={{
              sx: {
                height: '300px',
                overflow: 'visible',
              },
            }}
          >
            <DialogTitle id='responsive-dialog-title'>
              {'Select a Job to Clone estimate to'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                In order to clone this estimate to a job, you must select a job
                from the list below.
              </DialogContentText>
              <Box sx={{ mt: 2 }}>
                <JobSelect onChange={setJobToCloneTo} />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                autoFocus
                onClick={() => setConeModalOpen(false)}
                color='primary'
              >
                Cancel
              </Button>
              <Button
                onClick={handleCloneClick}
                autoFocus
                variant='contained'
                color='primary'
              >
                Clone
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </>
  )
}

export default Page
