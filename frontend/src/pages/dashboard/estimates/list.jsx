import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'
import {
  Box,
  Button,
  Card,
  Divider,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material'
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined'
import { ordersApi } from 'src/api/orders'
import { Seo } from 'src/components/seo'
import { useDialog } from 'src/hooks/use-dialog'
import { useMounted } from 'src/hooks/use-mounted'
import { usePageView } from 'src/hooks/use-page-view'
import { EstimateListContainer } from 'src/components/estimates/list/EstimateListContainer'
import { EstimateDrawer } from 'src/components/estimates/list/EstimateDrawer'
import { EstimateListSearch } from 'src/components/estimates/list/EstimateListSearch'
import { EstimateListTable } from 'src/components/estimates/list/EstimateListTable'
import { clearEstimates, getEstimates } from 'src/store/estimates/estimateSlice'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from 'src/components/shared/Spinner'
import EmptyState from 'src/components/shared/EmptyState'
import { RouterLink } from 'src/components/router-link'
import { exportToExcel } from 'src/utils/export-to-excel'
import Download01Icon from '@untitled-ui/icons-react/build/esm/Download01'

const useEstimateSearch = () => {
  const [state, setState] = useState({
    filters: {
      query: undefined,
      status: undefined,
    },
    page: 0,
    rowsPerPage: 5,
    sortBy: 'createdAt',
    sortDir: 'desc',
  })

  const handleFiltersChange = useCallback((filters) => {
    setState((prevState) => ({
      ...prevState,
      filters,
    }))
  }, [])

  const handleSortChange = useCallback((sortDir) => {
    setState((prevState) => ({
      ...prevState,
      sortDir,
    }))
  }, [])

  const handlePageChange = useCallback((event, page) => {
    setState((prevState) => ({
      ...prevState,
      page,
    }))
  }, [])

  const handleRowsPerPageChange = useCallback((event) => {
    setState((prevState) => ({
      ...prevState,
      rowsPerPage: parseInt(event.target.value, 10),
    }))
  }, [])

  return {
    handleFiltersChange,
    handleSortChange,
    handlePageChange,
    handleRowsPerPageChange,
    state,
  }
}

const useOrdersStore = (searchState) => {
  const isMounted = useMounted()
  const [state, setState] = useState({
    orders: [],
    ordersCount: 0,
  })

  const handleOrdersGet = useCallback(async () => {
    try {
      const response = await ordersApi.getOrders(searchState)

      if (isMounted()) {
        setState({
          orders: response.data,
          ordersCount: response.count,
        })
      }
    } catch (err) {
      console.error(err)
    }
  }, [searchState, isMounted])

  useEffect(
    () => {
      handleOrdersGet()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchState]
  )

  return {
    ...state,
  }
}

const useCurrentOrder = (orders, orderId) => {
  return useMemo(() => {
    if (!orderId) {
      return undefined
    }

    return orders.find((order) => order.id === orderId)
  }, [orders, orderId])
}

const Page = () => {
  const [currentEstimates, setCurrentEstimates] = useState(null)
  const [focusEstimate, setFocusEstimate] = useState(null)
  const [filterState, setFilterState] = useState({
    filters: {
      query: undefined,
      status: undefined,
    },
    page: 0,
    rowsPerPage: 5,
    sortBy: 'createdAt',
    sortDir: 'desc',
  })

  const rootRef = useRef(null)
  const ordersSearch = useEstimateSearch()
  const ordersStore = useOrdersStore(ordersSearch.state)
  const dialog = useDialog()
  const currentOrder = useCurrentOrder(ordersStore.orders, dialog.data)

  const { company } = useSelector((state) => state.company)
  const { estimates } = useSelector((state) => state.estimates)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) dispatch(getEstimates(user?.company))
    return () => {
      dispatch(clearEstimates())
    }
  }, [user, dispatch])

  useEffect(() => {
    if (estimates) {
      setCurrentEstimates(estimates)
    }
  }, [estimates])

  usePageView()

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

  const handleFiltersChange = useCallback((filters) => {
    setFilterState((prevState) => ({
      ...prevState,
      filters,
    }))
  }, [])

  const handleSortChange = useCallback((sortDir) => {
    setFilterState((prevState) => ({
      ...prevState,
      sortDir,
    }))
  }, [])

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
                <div>
                  {/* <Button
                    startIcon={
                      <SvgIcon>
                        <PlusIcon />
                      </SvgIcon>
                    }
                    variant='contained'
                  >
                    Add
                  </Button> */}
                </div>
              </Stack>
            </Box>
            {/* <Divider /> */}
            {currentEstimates.length > 0 ? (
              <>
                <EstimateListSearch
                  onFiltersChange={handleFiltersChange}
                  onSortChange={handleSortChange}
                  sortBy={filterState.sortBy}
                  sortDir={filterState.sortDir}
                />
                <Divider />
                <EstimateListTable
                  count={estimates.length}
                  estimates={currentEstimates}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  onSelect={handleEstimateOpen}
                  page={filterState.page}
                  rowsPerPage={filterState.rowsPerPage}
                />
              </>
            ) : (
              <EmptyState
                title='Looks like you have not created any estimates yet.'
                subtitle='Create your first job to add an estimate'
                action={
                  <Box display='flex' justifyContent='center'>
                    <Button
                      component={RouterLink}
                      href='/dashboard/jobs/create'
                      startIcon={
                        <SvgIcon>
                          <AddLocationAltOutlinedIcon />
                        </SvgIcon>
                      }
                      variant='contained'
                      size='small'
                    >
                      Add Job
                    </Button>
                  </Box>
                }
              />
            )}
          </EstimateListContainer>
          <EstimateDrawer
            container={rootRef.current}
            onClose={dialog.handleClose}
            open={dialog.open}
            order={currentOrder}
            estimate={focusEstimate}
          />
        </Box>
      </Box>
    </>
  )
}

export default Page
