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
  Divider,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
  Alert,
} from '@mui/material'
import { RouterLink } from 'src/components/router-link'
import { Seo } from 'src/components/seo'
import { usePageView } from 'src/hooks/use-page-view'
import { paths } from 'src/paths'
import { useDispatch } from 'react-redux'
import { clearJobs, getJobs, addJob, deleteJob } from 'src/store/jobs/jobSlice'
import { useSelector } from 'react-redux'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import _, { pick } from 'lodash'
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { BlankEstimatePdf } from 'src/components/estimates/blank-estimate-pdf/BlankEstimatePdf'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import PostAddIcon from '@mui/icons-material/PostAdd'
import DescriptionIcon from '@mui/icons-material/Description'
import FileOpenIcon from '@mui/icons-material/FileOpen'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import toast from 'react-hot-toast'
import Spinner from 'src/components/shared/Spinner'
import { motion } from 'framer-motion'
import {
  containerVariants,
  itemVariants,
} from 'src/constants/page-animation-variants'

const Page = () => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [isInitialLoad, setInitialLoad] = useState(true)

  const { company } = useSelector((state) => state.company)
  const { user } = useSelector((state) => state.auth)
  const { jobs, isLoading } = useSelector((state) => state.jobs)

  const dispatch = useDispatch()
  usePageView()

  useEffect(() => {
    fetchJobs()
    return () => {
      dispatch(clearJobs())
    }
  }, [user, dispatch])

  // Actions ---------------------
  const fetchJobs = () => {
    dispatch(getJobs(user.company))
      .unwrap()
      .then(() => {
        if (isInitialLoad) {
          setInitialLoad(false)
        }
      })
      .catch((err) => console.error(err))
  }
  const handleJobDeleteClick = (id) => {
    setDeleteModalOpen(true)
    setDeleteId(id)
  }

  const handleDeleteConfirmClick = () => {
    dispatch(deleteJob(deleteId))
      .unwrap()
      .then(() => {
        handleDeleteModalClose()
        toast.success('Job successfully deleted')
        dispatch(getJobs(user.company))
      })
  }

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false)
    setDeleteId(null)
  }

  const handleJobCloneClick = (job) => {
    console.log(job)
    const newJob = {
      ...job,
      createdBy: user._id,
      jobDate: null,
      jobTime: null,
      estimateDate: null,
      estimateTime: null,
      isPaid: false,
      jobTitle: `${job.jobTitle} (Clone)`,
      pickUpAddresses: [{ ...job.dropOffAddresses[0] }],
      dropOffAddresses: [{ address: '...', details: '' }],
    }
    delete newJob._id
    delete newJob.createdAt
    delete newJob.updatedAt

    dispatch(addJob(newJob))
      .unwrap()
      .then((res) => {
        toast.success('Job successfully cloned')
        dispatch(getJobs(user.company))
      })
  }

  // Columns ---------------------
  const finalColumns = useMemo(() => [
    {
      headerName: 'Customer Name',
      field: 'customer',
      valueGetter: (row) => row.customerName || '',
      flex: 1,
    },
    {
      headerName: 'Customer Phone',
      field: 'customerPhone',
      renderCell: ({ row }) => {
        return row.customer.customerPhoneNumber
      },
      flex: 1,
    },
    {
      headerName: 'Estimate',
      field: 'dropOffAddress2',
      type: 'string',
      flex: 1,
      disableExport: true,
      renderCell: ({ row }) => {
        return (
          <>
            <Stack
              divider={<Divider orientation='vertical' flexItem />}
              direction='row'
              spacing={1}
              alignItems='center'
            >
              <PDFDownloadLink
                document={<BlankEstimatePdf focusJob={row} company={company} />}
                fileName={`${row?.customer?.customerName}-blank-estimate-sheet.pdf`}
                style={{ textDecoration: 'none' }}
              >
                <Tooltip title='Print Blank Estimate Sheet'>
                  <IconButton color='primary'>
                    <SvgIcon>
                      <FileOpenIcon fontSize='small' />
                    </SvgIcon>
                  </IconButton>
                </Tooltip>
              </PDFDownloadLink>

              {row.estimate ? (
                <Tooltip title='View Created Estimate'>
                  <IconButton
                    component={RouterLink}
                    href={`/dashboard/estimates/${row._id}/edit/${row.estimate._id}`}
                    color='primary'
                    size='small'
                  >
                    <SvgIcon>
                      <DescriptionIcon fontSize='small' />
                    </SvgIcon>
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title='Created New Estimate'>
                  <IconButton
                    component={RouterLink}
                    href={`/dashboard/estimates/${row._id}/create`}
                    color='primary'
                    size='small'
                  >
                    <SvgIcon>
                      <PostAddIcon fontSize='small' />
                    </SvgIcon>
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          </>
        )
      },
    },
    {
      headerName: 'Status',
      field: 'isPaid',
      type: 'string',
      flex: 1,
      valueGetter: (row) => (row.isPaid ? 'Paid' : 'Unpaid'),
    },
    {
      headerName: 'Type',
      field: 'jobType',
      type: 'string',
      flex: 1,
      valueGetter: (row) =>
        row?.charAt(0).toUpperCase() + row.slice(1).toLowerCase() || '',
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
      field: 'billingSameAsCustomer',
      type: 'boolean',
      disableExport: true,
      sortable: false,
      filterable: false,
      width: 50,
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <>
          <Tooltip title='Edit Job'>
            <IconButton
              component={RouterLink}
              href={`/dashboard/jobs/${row._id}/edit`}
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
      field: 'company',
      type: 'boolean',
      disableExport: true,
      sortable: false,
      filterable: false,
      width: 50,
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <>
          <Tooltip title='Clone Job'>
            <IconButton size='small' onClick={() => handleJobCloneClick(row)}>
              <SvgIcon fontSize='small'>
                <FileCopyIcon />
              </SvgIcon>
            </IconButton>
          </Tooltip>
        </>
      ),
    },
    {
      headerName: '',
      field: 'paymentType',
      type: 'boolean',
      disableExport: true,
      sortable: false,
      filterable: false,
      width: 50,
      disableColumnMenu: true,
      renderCell: ({ row }) => (
        <>
          <Tooltip title='Delete Job'>
            <IconButton
              size='small'
              onClick={() => handleJobDeleteClick(row._id)}
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
      field: 'estimateTime',
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
              href={`/dashboard/jobs/${row._id}`}
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

  if (!jobs || (isLoading && isInitialLoad)) return <Spinner />
  return (
    <>
      <Seo title='Dashboard: Job List' />
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
                <Typography variant='h4'>Jobs</Typography>
              </Stack>
              <Stack alignItems='center' direction='row' spacing={3}>
                <Button
                  component={RouterLink}
                  href={paths.dashboard.jobs.create}
                  startIcon={
                    <SvgIcon>
                      <AddOutlinedIcon />
                    </SvgIcon>
                  }
                  variant='contained'
                >
                  Add New Job
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
                loading={isLoading || !jobs}
                rows={jobs || []}
                columns={finalColumns}
                sx={{ minHeight: 400 }}
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
                  noRowsLabel: 'You have not added any jobs yet',
                }}
              />
            </Card>
          </Stack>
        </Container>
      </Box>

      {/* Delete Modal */}
      <Dialog
        open={deleteModalOpen}
        onClose={handleDeleteModalClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Delete Job</DialogTitle>
        <DialogContent>
          <Alert severity='error'>
            Are you sure you want to delete this job? This will delete the job &
            the associated estimate if there is one. This action cannot be
            undone.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteModalClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirmClick} color='primary'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Page
