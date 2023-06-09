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
                <div>
                  <Typography variant='h4'>Estimates</Typography>
                </div>
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
              <Box sx={{ mt: 3, p: 6 }}>
                <Card variant='outlined'>
                  <Stack spacing={1} sx={{ px: 2, py: 1.5 }}>
                    <Typography textAlign='center'>
                      Looks like you have not created any estimates yet.
                    </Typography>
                    <Typography
                      textAlign='center'
                      variant='caption'
                      color='text.secondary'
                    >
                      Create your first job to add an estimate
                    </Typography>
                  </Stack>
                </Card>
              </Box>
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
