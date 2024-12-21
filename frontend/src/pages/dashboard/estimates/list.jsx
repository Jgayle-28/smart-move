import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Box,
  Button,
  Divider,
  Stack,
  SvgIcon,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from '@mui/material'
import { Seo } from 'src/components/seo'
import { useDialog } from 'src/hooks/use-dialog'
import { usePageView } from 'src/hooks/use-page-view'
import { EstimateListContainer } from 'src/components/estimates/list/EstimateListContainer'
import { EstimateDrawer } from 'src/components/estimates/list/EstimateDrawer'
import { EstimateListSearch } from 'src/components/estimates/list/EstimateListSearch'
import { EstimateListTable } from 'src/components/estimates/list/EstimateListTable'
import { clearEstimates, getEstimates } from 'src/store/estimates/estimateSlice'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from 'src/components/shared/Spinner'
import { exportToExcel } from 'src/utils/export-to-excel'
import Download01Icon from '@untitled-ui/icons-react/build/esm/Download01'
import { applyPagination } from 'src/utils/apply-pagination'
import { clearJobs, getJobs, updateJob } from 'src/store/jobs/jobSlice'
import { addEstimate } from 'src/store/estimates/estimateSlice'
import { useTheme } from '@emotion/react'
import { useRouter } from 'src/hooks/use-router'
import JobSelect from 'src/components/shared/JobSelect'
import toast from 'react-hot-toast'
import { paths } from 'src/paths'

const initialFilterState = {
  page: 0,
  rowsPerPage: 5,
  sortBy: 'createdAt',
  sortDir: 'desc',
}

const Page = () => {
  const [currentEstimates, setCurrentEstimates] = useState(null)
  const [focusEstimate, setFocusEstimate] = useState(null)
  const [filterState, setFilterState] = useState(initialFilterState)

  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('Newest')
  const [coneModalOpen, setConeModalOpen] = useState(false)
  const [jobToCloneTo, setJobToCloneTo] = useState(null)

  const rootRef = useRef(null)
  const dialog = useDialog()

  const { company } = useSelector((state) => state.company)
  const { estimates } = useSelector((state) => state.estimates)
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

  useEffect(() => {
    if (estimates) {
      handleSortEstimates(estimates)
    }
  }, [estimates])

  // Sort customers
  useEffect(() => {
    if (estimates) {
      handleSortEstimates()
    }
  }, [sortBy, estimates])

  // Filter by name
  useEffect(() => {
    if (estimates) {
      if (searchQuery.length > 0) {
        handleCustomerSearch()
      } else {
        handleSortEstimates()
      }
    }
  }, [searchQuery, estimates])

  const handleCustomerSearch = () => {
    const searchResults = estimates.filter((estimate) => {
      const customerName = estimate.customer.customerName.toLowerCase()
      const search = searchQuery.toLowerCase()
      return customerName.includes(search)
    })

    handleSortEstimates(searchResults)
  }

  const handleSortEstimates = (passedEstimates = null) => {
    // if estimates is passed in, use that instead of the state
    const objectsCopy = passedEstimates ? [...passedEstimates] : [...estimates] // Create a shallow copy of the array

    objectsCopy.sort((a, b) => {
      const dateA = new Date(a.createdAt)
      const dateB = new Date(b.createdAt)
      return sortBy === 'Newest' ? dateB - dateA : dateA - dateB // Sort depending on customer selection
    })

    setCurrentEstimates(objectsCopy)
  }

  const handleResetFilters = () => {
    setSearchQuery('')
    setSortBy('Newest')
  }

  const handlePageChange = useCallback((event, page) => {
    setFilterState((prevState) => ({
      ...prevState,
      page,
    }))
  }, [])

  const handleRowsPerPageChange = useCallback((event) => {
    setFilterState((prevState) => ({
      ...prevState,
      rowsPerPage: parseInt(event.target.value, 10),
    }))
  }, [])

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

  const exportEstimates = useCallback(() => {
    const exportEstimates = estimates.map((estimate) => {
      return {
        customer: estimate.customer?.customerName,
        totalMen: estimate.moveCharges.totalMen || 0,
        totalTrucks: estimate.moveCharges.totalTrucks || 0,
        ratePerHour: estimate.moveCharges.ratePerHour || 0,
        driveTime: estimate.moveCharges.driveTime || 0,
        stairHours: estimate.moveCharges.stairHours || 0,
        longCarryHours: estimate.moveCharges.longCarryHours || 0,
        adjustmentTime: estimate.moveCharges.adjustmentTime || 0,
        totalMoveHours: estimate.moveCharges.totalMoveHours || 0,
        packingTotal: estimate.packing?.packingTotal || 0,
        additionalServicesTotal:
          estimate.additionalServices?.additionalServicesTotal || 0,
        storage: estimate.storage?.storageTotal || 0,
        fees: estimate.fees?.feesTotal || 0,
        totalCharges: estimate.totalCharges,
        totalWeight: estimate.totalWeight,
        totalVolume: estimate.totalVolume,
        totalItemCount: estimate.totalItemCount,
        createdBy: estimate.createdBy?.name,
      }
    })
    exportToExcel(
      exportEstimates,
      `${company.companyName}-Estimates(${new Date().toLocaleDateString()})`
    )
  }, [estimates, company])

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

  if (!estimates || !currentEstimates || !jobs) return <Spinner />
  return (
    <>
      <Seo title='Dashboard: Estimate List' />
      <Divider />
      <Box
        component='main'
        ref={rootRef}
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Box
          ref={rootRef}
          sx={{
            bottom: 0,
            display: 'flex',
            left: 0,
            position: 'absolute',
            right: 0,
            top: 0,
          }}
        >
          <EstimateListContainer open={dialog.open}>
            <Box sx={{ p: 3 }}>
              <Stack
                alignItems='flex-start'
                direction='row'
                justifyContent='space-between'
                spacing={4}
              >
                <Stack spacing={1}>
                  <Typography variant='h4'>Estimates</Typography>
                  <Stack alignItems='center' direction='row' spacing={1}>
                    <Button
                      color='inherit'
                      size='small'
                      onClick={exportEstimates}
                      disabled={!estimates?.length}
                      startIcon={
                        <SvgIcon>
                          <Download01Icon />
                        </SvgIcon>
                      }
                    >
                      Export
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Box>

            <EstimateListSearch
              setSortBy={setSortBy}
              sortBy={sortBy}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleCustomerSearch={handleCustomerSearch}
              handleResetFilters={handleResetFilters}
            />
            <Divider />
            <EstimateListTable
              count={estimates.length}
              estimates={applyPagination(
                currentEstimates,
                filterState.page,
                filterState.rowsPerPage
              )}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelect={handleEstimateOpen}
              page={filterState.page}
              rowsPerPage={filterState.rowsPerPage}
              isSearching={searchQuery.length > 0}
              coneModalOpen={coneModalOpen}
              setConeModalOpen={setConeModalOpen}
            />
          </EstimateListContainer>
          <EstimateDrawer
            container={rootRef.current}
            onClose={dialog.handleClose}
            open={dialog.open}
            estimate={focusEstimate}
            coneModalOpen={coneModalOpen}
            setConeModalOpen={setConeModalOpen}
            focusEstimate={focusEstimate}
          />
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
        </Box>
      </Box>
    </>
  )
}

export default Page
