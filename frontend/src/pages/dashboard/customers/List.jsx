import { useCallback, useEffect, useState } from 'react'
import { Box, Card, Container, Stack } from '@mui/material'
import { Seo } from 'src/components/seo'
import { usePageView } from 'src/hooks/use-page-view'
import { useSelection } from 'src/hooks/use-selection'
import { CustomerListSearch } from 'src/components/customers/CustomerListSearch'
import { CustomerListTable } from 'src/components/customers/CustomerListTable'
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

const initialFilterState = {
  filters: {
    name: undefined,
    category: [],
    status: [],
    inStock: undefined,
    searchDate: null,
  },
  page: 0,
  rowsPerPage: 25,
}

const Page = () => {
  const [currentCustomers, setCurrentCustomers] = useState(null)
  const [filterState, setFilterState] = useState({
    ...initialFilterState,
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('Newest')

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
    if (customers !== null && !isLoading) handleSortCustomers(customers)
  }, [customers, isLoading])

  // Sort customers
  useEffect(() => {
    if (customers) {
      handleSortCustomers()
    }
  }, [sortBy, customers])

  // Filter by name
  useEffect(() => {
    if (customers) {
      if (searchQuery.length > 0) {
        handleCustomerSearch()
      } else {
        handleSortCustomers()
      }
    }
  }, [searchQuery, customers])

  const handleCustomerSearch = () => {
    const searchResults = customers.filter((customer) => {
      const customerName = customer.customerName.toLowerCase()
      const search = searchQuery.toLowerCase()
      return customerName.includes(search)
    })

    handleSortCustomers(searchResults)
  }

  const handleSortCustomers = (passedCustomers = null) => {
    // if customers is passed in, use that instead of the state
    const objectsCopy = passedCustomers ? [...passedCustomers] : [...customers] // Create a shallow copy of the array

    objectsCopy.sort((a, b) => {
      const dateA = new Date(a.createdAt)
      const dateB = new Date(b.createdAt)
      return sortBy === 'Newest' ? dateB - dateA : dateA - dateB // Sort depending on customer selection
    })

    setCurrentCustomers(objectsCopy)
  }

  const fetchCustomers = () => {
    dispatch(getCustomers(user.company))
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
                    setSortBy={setSortBy}
                    sortBy={sortBy}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    handleCustomerSearch={handleCustomerSearch}
                    handleResetFilters={handleResetFilters}
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
                    isSearching={searchQuery.length > 0}
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
