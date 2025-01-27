import { useEffect, useState, useMemo } from 'react'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import {
  Box,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
  Alert,
  Chip,
} from '@mui/material'
import { RouterLink } from 'src/components/router-link'
import { Seo } from 'src/components/seo'
import { usePageView } from 'src/hooks/use-page-view'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import _ from 'lodash'
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import toast from 'react-hot-toast'
import Spinner from 'src/components/shared/Spinner'
import { motion } from 'framer-motion'
import {
  containerVariants,
  itemVariants,
} from 'src/constants/page-animation-variants'
import EmployeeForm from 'src/components/employees/EmployeeForm'
import { initialFormState } from 'src/constants/employees'
import {
  clearEmployees,
  createEmployee,
  deleteEmployee,
  getEmployees,
  updateEmployee,
} from 'src/store/employees/employeeSlice'

const Page = () => {
  const [employeeModalOpen, setEmployeeModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [formData, setFormData] = useState(initialFormState)
  const [deleteId, setDeleteId] = useState(null)

  const { user } = useSelector((state) => state.auth)
  const { employees, isLoading } = useSelector((state) => state.employees)

  const dispatch = useDispatch()
  usePageView()

  useEffect(() => {
    dispatch(getEmployees(user.company))
    return () => {
      dispatch(clearEmployees())
    }
  }, [user, dispatch])

  // Actions ---------------------
  const handleEmployeeModalClose = () => {
    setEmployeeModalOpen(false)
    setFormData(initialFormState)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleEmployeeSaveClick = () => {
    // Edit
    if (formData._id) {
      dispatch(updateEmployee(formData))
        .unwrap()
        .then((res) => {
          toast.success('Employee successfully updated')
          dispatch(getEmployees(user.company))
          setEmployeeModalOpen(false)
          setFormData(initialFormState)
        })
    } else {
      // Create
      const employeeData = {
        ...formData,
        company: user.company,
      }
      dispatch(createEmployee(employeeData))
        .unwrap()
        .then((res) => {
          toast.success('Employee successfully added')
          dispatch(getEmployees(user.company))
          setEmployeeModalOpen(false)
          setFormData(initialFormState)
        })
    }
  }

  const handleEmployeeEditClick = (employee) => {
    setFormData(employee)
    setEmployeeModalOpen(true)
  }

  const handleEmployeeDeleteClick = (id) => {
    setDeleteModalOpen(true)
    setDeleteId(id)
  }

  const handleDeleteConfirmClick = () => {
    dispatch(deleteEmployee(deleteId))
      .unwrap()
      .then(() => {
        handleDeleteModalClose()
        toast.success('Employee successfully deleted')
        dispatch(getEmployees(user.company))
      })
  }

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false)
    setDeleteId(null)
  }

  // Columns ---------------------
  const finalColumns = useMemo(() => [
    {
      headerName: 'Name',
      field: 'name',
      type: 'string',
      flex: 1,
    },
    {
      headerName: 'Email',
      field: 'email',
      type: 'string',
      flex: 1,
    },
    {
      headerName: 'Phone Number',
      field: 'phoneNumber',
      type: 'string',
      flex: 1,
    },
    {
      headerName: 'Status',
      field: 'status',
      type: 'string',
      flex: 1,
      renderCell: ({ value }) => {
        // Ensure value is present, fallback to "No status"
        const status = value || 'No status'

        return (
          <Chip
            label={status}
            size='small'
            variant='outlined'
            color={
              status === 'Active'
                ? 'success'
                : status === 'No Go'
                ? 'error'
                : 'warning'
            }
            sx={{
              borderColor:
                status === 'Active'
                  ? 'success.main'
                  : status === 'No Go'
                  ? 'error.main'
                  : 'warning.main',
              color:
                status === 'Active'
                  ? 'success.main'
                  : status === 'No Go'
                  ? 'error.main'
                  : 'warning.main',
            }}
          />
        )
      },
    },

    {
      headerName: 'Comments',
      field: 'comments',
      type: 'string',
      flex: 1,
    },
    {
      headerName: 'Days Available',
      field: 'daysAvailable',
      type: 'string',
      flex: 1,
      renderCell: ({ row }) => {
        const days = row.daysAvailable || []
        const allDays = [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ]

        if (days.length === 0) {
          return 'No days available'
        }

        if (
          days.length === allDays.length &&
          allDays.every((day) => days.includes(day))
        ) {
          return 'All Week'
        }

        return days.join(', ') // Display days as a comma-separated list
      },
    },
    {
      headerName: '',
      field: 'billingSameAsCustomer',
      type: 'boolean',
      disableExport: true,
      sortable: false,
      filterable: false,
      width: 50,
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <>
          <Tooltip title='Edit Employee'>
            <IconButton
              onClick={() => handleEmployeeEditClick(row)}
              size='small'
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
      field: 'jobs',
      type: 'boolean',
      disableExport: true,
      sortable: false,
      filterable: false,
      width: 50,
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <>
          <Tooltip title='Delete Employee'>
            <IconButton
              size='small'
              onClick={() => handleEmployeeDeleteClick(row._id)}
            >
              <SvgIcon fontSize='small'>
                <DeleteOutlineIcon />
              </SvgIcon>
            </IconButton>
          </Tooltip>
        </>
      ),
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
          <Tooltip title='View Details'>
            <IconButton
              component={RouterLink}
              href={`/dashboard/employees/${row._id}`}
              size='small'
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

  if (isLoading || !employees) return <Spinner />
  return (
    <>
      <Seo title='Dashboard: Employee List' />
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
            <Stack
              direction='row'
              justifyContent='space-between'
              spacing={4}
              component={motion.div}
              variants={itemVariants}
            >
              <Stack spacing={1}>
                <Typography variant='h4'>Employees</Typography>
              </Stack>
              <Stack alignItems='center' direction='row' spacing={3}>
                <Button
                  onClick={() => setEmployeeModalOpen(true)}
                  startIcon={
                    <SvgIcon>
                      <AddOutlinedIcon />
                    </SvgIcon>
                  }
                  variant='contained'
                >
                  Add Employee
                </Button>
              </Stack>
            </Stack>

            <Card
              sx={{ paddingTop: 1.5 }}
              component={motion.div}
              variants={itemVariants}
            >
              <DataGrid
                getRowId={_.property('_id')}
                loading={isLoading || !employees}
                rows={employees || []}
                columns={finalColumns}
                sx={{ height: 400 }}
                slots={{ toolbar: GridToolbar }}
                onExport={(rows, columns) => customExport(rows, columns)}
                slotProps={{
                  csvOptions: { fields: ['id', 'company', 'company'] },
                  toolbar: {
                    showQuickFilter: true,
                    printOptions: { disableToolbarButton: true },
                  },
                }}
                localeText={{
                  noRowsLabel: 'You have not added any employees yet',
                }}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
      {/* Employee Modal */}
      <Dialog
        open={employeeModalOpen}
        onClose={handleEmployeeModalClose}
        fullWidth
        maxWidth='md'
      >
        <DialogTitle sx={{ my: 2 }}>Add Employee</DialogTitle>
        <DialogContent>
          <EmployeeForm formData={formData} handleChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEmployeeModalOpen(false)} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleEmployeeSaveClick} color='primary'>
            {formData._id ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={deleteModalOpen} onClose={handleDeleteModalClose}>
        <DialogTitle>Delete Job</DialogTitle>
        <DialogContent>
          <Alert severity='error'>
            Are you sure you want to delete this Employee?
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteModalClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirmClick} color='error'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Page
