import { useEffect, useMemo, useState } from 'react'
import {
  Box,
  Card,
  Container,
  Dialog,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
} from '@mui/material'
import { Seo } from 'src/components/seo'
import { usePageView } from 'src/hooks/use-page-view'
import CustomerPageHeader from '../../../components/customers/CustomerPageHeader'
import { useDispatch } from 'react-redux'
import { getCustomers, clearCustomers } from 'src/store/customers/customerSlice'
import { useAuth } from 'src/hooks/use-auth'
import { useSelector } from 'react-redux'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import _ from 'lodash'
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined'
import { RouterLink } from 'src/components/router-link'
import { useNavigate } from 'react-router-dom'
import { CustomerForm } from 'src/components/customers/CustomerForm'
import { motion } from 'framer-motion'
import {
  containerVariants,
  itemVariants,
} from 'src/constants/page-animation-variants'
import Spinner from 'src/components/shared/Spinner'

const Page = () => {
  const [customerModalOpen, setCustomerModalOpen] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useAuth()
  const { customers, isLoading } = useSelector((state) => state.customers)
  usePageView()

  useEffect(() => {
    fetchCustomers()
    return () => dispatch(clearCustomers())
  }, [])

  const fetchCustomers = () => {
    dispatch(getCustomers(user.company))
  }

  const addCustomerCallback = () => {
    setCustomerModalOpen(false)
  }

  // Columns ---------------------
  const finalColumns = useMemo(() => [
    {
      headerName: 'Customer Name',
      field: 'customerName',
      type: 'string',
      flex: 1,
    },
    {
      headerName: 'Email',
      field: 'customerEmail',
      type: 'string',
      flex: 1,
    },
    {
      headerName: 'Phone',
      field: 'customerPhoneNumber',
      type: 'string',
      flex: 1,
    },
    {
      headerName: 'Address',
      field: 'customerAddress',
      type: 'string',
      flex: 1,
    },
    {
      headerName: 'Date Created',
      field: 'createdAt',
      type: 'date',
      flex: 1,
      valueFormatter: (date) => new Date(date).toLocaleDateString(),
    },
    {
      headerName: '',
      field: '_id',
      type: 'boolean',
      disableExport: true,
      sortable: false,
      filterable: false,
      width: 50,
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <>
          <Tooltip title='Edit Customer'>
            <IconButton
              component={RouterLink}
              href={`/dashboard/customers/${row._id}/edit`}
            >
              <SvgIcon fontSize='small'>
                <EditOutlinedIcon />
              </SvgIcon>
            </IconButton>
          </Tooltip>
        </>
      ),
    },
    {
      headerName: '',
      field: 'referredBy',
      type: 'boolean',
      disableExport: true,
      sortable: false,
      filterable: false,
      width: 50,
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <>
          <Tooltip title='Create job for customer'>
            <IconButton
              onClick={() =>
                navigate(`/dashboard/jobs/create`, {
                  state: { customer: row },
                })
              }
            >
              <SvgIcon fontSize='small'>
                <PostAddOutlinedIcon />
              </SvgIcon>
            </IconButton>
          </Tooltip>
        </>
      ),
    },
    {
      headerName: '',
      field: 'altCustomerPhoneNumber',
      type: 'boolean',
      disableExport: true,
      sortable: false,
      filterable: false,
      width: 50,
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <>
          <Tooltip title='View Details'>
            <IconButton
              component={RouterLink}
              href={`/dashboard/customers/${row._id}`}
            >
              <SvgIcon fontSize='small'>
                <OpenInNewOutlinedIcon />
              </SvgIcon>
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ])

  if (!customers || isLoading) return <Spinner />
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
        <Container
          maxWidth='xl'
          component={motion.div}
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          <Stack spacing={4} component={motion.div} variants={itemVariants}>
            <CustomerPageHeader
              customers={customers}
              setCustomerModalOpen={setCustomerModalOpen}
            />
            <Card
              sx={{ paddingTop: 1.5 }}
              component={motion.div}
              variants={itemVariants}
            >
              <DataGrid
                getRowId={_.property('_id')}
                loading={isLoading || !customers}
                rows={customers || []}
                columns={finalColumns}
                sx={{ minHeight: 400 }}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                  toolbar: {
                    showQuickFilter: true,
                    printOptions: { disableToolbarButton: true },
                  },
                }}
                localeText={{
                  noRowsLabel: 'You have not added any customers yet',
                }}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
      <Dialog
        open={customerModalOpen}
        onClose={() => setCustomerModalOpen(false)}
      >
        <CustomerForm
          isEdit={false}
          onClose={() => setCustomerModalOpen(false)}
          callBack={addCustomerCallback}
        />
      </Dialog>
    </>
    // <>
    //   <Seo title='Dashboard: Customers' />
    //   <Box
    //     component='main'
    //     sx={{
    //       flexGrow: 1,
    //       py: 8,
    //     }}
    //   >
    //     <Container maxWidth='xl'>
    //       <Stack spacing={4}>
    //         <CustomerPageHeader
    //           customers={customers}
    //           setCustomerModalOpen={setCustomerModalOpen}
    //         />
    //         <Card sx={{ paddingTop: 1.5 }}>
    //           <>
    //             <DataGrid
    //               getRowId={_.property('_id')}
    //               loading={isLoading || !customers}
    //               rows={customers || []}
    //               columns={finalColumns}
    //               sx={{ ...defaultDataGridStyles }}
    //               slots={{ toolbar: GridToolbar }}
    //               slotProps={{
    //                 toolbar: {
    //                   showQuickFilter: true,
    //                   printOptions: { disableToolbarButton: true },
    //                 },
    //               }}
    //               localeText={{
    //                 noRowsLabel: 'You have not added any customers yet',
    //               }}
    //             />
    //           </>
    //         </Card>
    //       </Stack>
    //     </Container>
    //   </Box>
    //   <Dialog
    //     open={customerModalOpen}
    //     onClose={() => setCustomerModalOpen(false)}
    //   >
    //     <CustomerForm
    //       isEdit={false}
    //       onClose={() => setCustomerModalOpen(false)}
    //       callBack={addCustomerCallback}
    //     />
    //   </Dialog>
    // </>
  )
}

export default Page
