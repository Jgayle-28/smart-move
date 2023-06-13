import { useEffect } from 'react'

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

const Page = () => {
  const customersSearch = useCustomersSearch()
  const customersStore = useCustomersStore(customersSearch.state)
  const customersIds = useCustomersIds(customersStore.customers)
  const customersSelection = useSelection(customersIds)

  const dispatch = useDispatch()
  const { user } = useAuth()
  const { customers, isLoading } = useSelector((state) => state.customers)

  useEffect(() => {
    fetchCustomers()
    return () => dispatch(clearCustomers())
  }, [])

  const fetchCustomers = () => {
    dispatch(getCustomers(user.company))
  }

  usePageView()

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
              {isLoading || customers === null ? (
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
                    count={customersStore.customersCount}
                    customers={customers}
                    onDeselectAll={customersSelection.handleDeselectAll}
                    onDeselectOne={customersSelection.handleDeselectOne}
                    onPageChange={customersSearch.handlePageChange}
                    onRowsPerPageChange={
                      customersSearch.handleRowsPerPageChange
                    }
                    onSelectAll={customersSelection.handleSelectAll}
                    onSelectOne={customersSelection.handleSelectOne}
                    page={customersSearch.state.page}
                    rowsPerPage={customersSearch.state.rowsPerPage}
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
