import { useCallback, useEffect, useState } from 'react'
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft'
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown'
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02'
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Link,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material'
import { customersApi } from 'src/api/customers'
import { RouterLink } from 'src/components/router-link'
import { Seo } from 'src/components/seo'
import { useMounted } from 'src/hooks/use-mounted'
import { usePageView } from 'src/hooks/use-page-view'
import { paths } from 'src/paths'
import { CustomerBasicDetails } from 'src/sections/dashboard/customer/customer-basic-details'
import { CustomerDataManagement } from 'src/sections/dashboard/customer/customer-data-management'
import { CustomerEmailsSummary } from 'src/sections/dashboard/customer/customer-emails-summary'
import { CustomerInvoices } from 'src/sections/dashboard/customer/customer-invoices'
import { CustomerPayment } from 'src/sections/dashboard/customer/customer-payment'
import { CustomerLogs } from 'src/sections/dashboard/customer/customer-logs'
import { getInitials } from 'src/utils/get-initials'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {
  clearCustomer,
  getCustomer,
  getCustomerEstimates,
  getCustomerJobs,
} from 'src/store/customers/customerSlice'
import { useParams } from 'react-router'
import Spinner from 'src/components/shared/Spinner'
import CustomerEditPageHeader from 'src/components/customers/CustomerEditPageHeader'
import CustomerJobs from 'src/components/customers/CustomerJobs'
import CustomerEstimates from 'src/components/customers/CustomerEstimates'

const tabs = [
  { label: 'Details', value: 'details' },
  { label: 'Jobs', value: 'invoices' },
]

const useCustomer = () => {
  const isMounted = useMounted()
  const [customer, setCustomer] = useState(null)

  const handleCustomerGet = useCallback(async () => {
    try {
      const response = await customersApi.getCustomer()

      if (isMounted()) {
        setCustomer(response)
      }
    } catch (err) {
      console.error(err)
    }
  }, [isMounted])

  useEffect(
    () => {
      handleCustomerGet()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return customer
}

const useInvoices = () => {
  const isMounted = useMounted()
  const [invoices, setInvoices] = useState([])

  const handleInvoicesGet = useCallback(async () => {
    try {
      const response = await customersApi.getInvoices()

      if (isMounted()) {
        setInvoices(response)
      }
    } catch (err) {
      console.error(err)
    }
  }, [isMounted])

  useEffect(
    () => {
      handleInvoicesGet()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return invoices
}

const Page = () => {
  const [currentTab, setCurrentTab] = useState('details')
  const customer = useCustomer()
  const invoices = useInvoices()

  const { customerId } = useParams()
  const dispatch = useDispatch()
  const { isLoading, focusCustomer, customerJobs, customerEstimates } =
    useSelector((state) => state.customers)

  useEffect(() => {
    if (customerId) fetchCustomer()
    return () => {
      dispatch(clearCustomer())
    }
  }, [customerId])

  const fetchCustomer = () => {
    dispatch(getCustomer(customerId))
    dispatch(getCustomerJobs(customerId))
    dispatch(getCustomerEstimates(customerId))
  }

  usePageView()

  const handleTabsChange = useCallback((event, value) => {
    setCurrentTab(value)
  }, [])

  if (!customer) {
    return null
  }

  if (isLoading || !fetchCustomer || !customerJobs || !customerEstimates)
    return <Spinner />
  return (
    <>
      <Seo title='Dashboard: Customer Details' />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        {isLoading || focusCustomer === null ? (
          <Spinner />
        ) : (
          <Container maxWidth='xl'>
            <Stack spacing={4}>
              <Stack spacing={4}>
                <CustomerEditPageHeader
                  customer={focusCustomer}
                  isDetails={true}
                />
                {/* <div>
                  <Tabs
                    indicatorColor='primary'
                    onChange={handleTabsChange}
                    scrollButtons='auto'
                    sx={{ mt: 3 }}
                    textColor='primary'
                    value={currentTab}
                    variant='scrollable'
                  >
                    {tabs.map((tab) => (
                      <Tab
                        key={tab.value}
                        label={tab.label}
                        value={tab.value}
                      />
                    ))}
                  </Tabs>
                </div> */}
                {/* <Divider /> */}
              </Stack>
              {currentTab === 'details' && (
                <div>
                  <Grid container spacing={4}>
                    <Grid xs={12} lg={4}>
                      <CustomerBasicDetails
                        address1={customer.address1}
                        address2={customer.address2}
                        country={customer.country}
                        email={customer.email}
                        isVerified={!!customer.isVerified}
                        phone={customer.phone}
                        state={customer.state}
                        customer={focusCustomer}
                      />
                    </Grid>
                    <Grid xs={12} lg={8}>
                      <Stack spacing={4}>
                        <CustomerJobs customerJobs={customerJobs} />
                        <CustomerEstimates
                          customerEstimates={customerEstimates}
                        />
                        {/* <CustomerDataManagement /> */}
                      </Stack>
                    </Grid>
                  </Grid>
                </div>
              )}
              {currentTab === 'jobs' && (
                <CustomerInvoices invoices={invoices} />
              )}
            </Stack>
          </Container>
        )}
      </Box>
    </>
  )
}

export default Page
