import { useCallback, useEffect, useState } from 'react'

import { Box, Card, Container, Stack } from '@mui/material'
import { Seo } from 'src/components/seo'
import { usePageView } from 'src/hooks/use-page-view'
import { useSelection } from 'src/hooks/use-selection'
import { CustomerListSearch } from 'src/components/customers/customer-list-search'
import { CustomerListTable } from 'src/components/customers/customer-list-table'
import CustomerPageHeader from '../../../components/customers/CustomerPageHeader'
import { useCustomersSearch } from 'src/hooks/use-customer-search'
import { useCustomersStore } from 'src/hooks/use-customer-store'
import { useCustomersIds } from 'src/hooks/use-customer-ids'
import { useDispatch } from 'react-redux'
import { getCustomers, clearCustomers } from 'src/store/customers/customerSlice'
import { useAuth } from 'src/hooks/use-auth'
import { useSelector } from 'react-redux'
import Spinner from 'src/components/shared/Spinner'
import { applyPagination } from 'src/utils/apply-pagination'
import { filter } from 'lodash'

const initialFilterState = {
  filters: {
    name: undefined,
    category: [],
    status: [],
    inStock: undefined,
    searchDate: null,
  },
  page: 0,
  rowsPerPage: 5,
}

const Page = () => {
  const [currentCustomers, setCurrentCustomers] = useState(null)
  const [filterState, setFilterState] = useState({
    ...initialFilterState,
  })

  const [searchQuery, setSearchQuery] = useState('')

  const customersSearch = useCustomersSearch()
  const customersStore = useCustomersStore(customersSearch.state)
  const customersIds = useCustomersIds(customersStore.customers)
  const customersSelection = useSelection(customersIds)

  const dispatch = useDispatch()
  const { user } = useAuth()
  const { customers, isLoading } = useSelector((state) => state.customers)
  usePageView()

  useEffect(() => {
    fetchCustomers()
    return () => dispatch(clearCustomers())
  }, [])

  useEffect(() => {
    if (customers !== null && !isLoading) setCurrentCustomers(customers)
  }, [customers, isLoading])

  const fetchCustomers = () => {
    dispatch(getCustomers(user.company))
  }

  // const handleFilterJobs = useCallback(() => {
  //   const filteredJobs = filterJobs(filterState, jobs || [], searchQuery)
  //   setCurrentJobs(filteredJobs)
  // }, [filterState, currentJobs])

  const handleResetFilters = () => {
    setFilterState(initialFilterState)
  }

  const handleFiltersChange = useCallback((filters) => {
    setFilterState((prevState) => ({
      ...prevState,
      filters,
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

  return (
    <>
      <Seo title='Dashboard: Customers' />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth='xl'>
          {/* Header */}
          <Stack spacing={4}>
            <CustomerPageHeader customers={customers} />
            <Card>
              {isLoading || !customers || !currentCustomers ? (
                <Spinner />
              ) : (
                <>
                  <CustomerListSearch
                    onFiltersChange={customersSearch.handleFiltersChange}
                    onSortChange={customersSearch.handleSortChange}
                    sortBy={customersSearch.state.sortBy}
                    sortDir={customersSearch.state.sortDir}
                  />
                  <CustomerListTable
                    count={currentCustomers.length || 0}
                    customers={applyPagination(
                      currentCustomers,
                      filterState.page,
                      filterState.rowsPerPage
                    )}
                    onDeselectAll={customersSelection.handleDeselectAll}
                    onDeselectOne={customersSelection.handleDeselectOne}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    onSelectAll={customersSelection.handleSelectAll}
                    onSelectOne={customersSelection.handleSelectOne}
                    page={filterState.page}
                    rowsPerPage={filterState.rowsPerPage}
                    selected={customersSelection.selected}
                  />
                </>
              )}
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default Page
