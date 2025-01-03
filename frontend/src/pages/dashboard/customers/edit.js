import { Box, Container, Stack, Typography } from '@mui/material'
import { Seo } from 'src/components/seo'
import { usePageView } from 'src/hooks/use-page-view'
import { CustomerForm } from 'src/components/customers/CustomerForm'
import CustomerEditPageHeader from 'src/components/customers/CustomerEditPageHeader'
import { useLocation, useParams } from 'react-router'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { clearCustomer, getCustomer } from 'src/store/customers/customerSlice'
import Spinner from 'src/components/shared/Spinner'
import { useSelector } from 'react-redux'

/**
 *
 * @returns Add customer and edit customer page & form
 */

const Page = () => {
  const { pathname } = useLocation()
  const { customerId } = useParams()
  const { isLoading, focusCustomer } = useSelector((state) => state.customers)
  const dispatch = useDispatch()

  const isEdit = pathname.includes('edit')

  useEffect(() => {
    if (isEdit && customerId) fetchCustomer()
    return () => dispatch(clearCustomer())
  }, [isEdit])

  const fetchCustomer = () => {
    dispatch(getCustomer(customerId))
  }

  usePageView()

  if (!focusCustomer) {
    return null
  }

  return (
    <>
      <Seo title='Dashboard: Customer' />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth='lg'>
          <Stack spacing={4}>
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                {pathname && isEdit ? (
                  <CustomerEditPageHeader customer={focusCustomer} />
                ) : (
                  <Stack spacing={1}>
                    <Typography variant='h4'>Add Customer</Typography>
                  </Stack>
                )}
                <CustomerForm customer={focusCustomer} isEdit={isEdit} />
              </>
            )}
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default Page
