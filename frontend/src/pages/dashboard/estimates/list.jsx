import { useCallback, useEffect, useRef, useState } from 'react'
import { Box, Button, Divider, Stack, SvgIcon, Typography } from '@mui/material'
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

  const rootRef = useRef(null)
  const dialog = useDialog()

  const { company } = useSelector((state) => state.company)
  const { estimates } = useSelector((state) => state.estimates)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  usePageView()

  useEffect(() => {
    if (user) dispatch(getEstimates(user?.company))
    return () => {
      dispatch(clearEstimates())
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

  if (!estimates || !currentEstimates) return <Spinner />
  return (
    <>
      <Seo title='Dashboard: Order List' />
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
            />
          </EstimateListContainer>
          <EstimateDrawer
            container={rootRef.current}
            onClose={dialog.handleClose}
            open={dialog.open}
            estimate={focusEstimate}
          />
        </Box>
      </Box>
    </>
  )
}

export default Page
