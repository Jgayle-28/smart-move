import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material'
import { Seo } from 'src/components/seo'
import { usePageView } from 'src/hooks/use-page-view'
import { useDispatch } from 'react-redux'
import { clearJobs, getJobs } from 'src/store/jobs/jobSlice'
import { useSelector } from 'react-redux'
import Spinner from 'src/components/shared/Spinner'
import EmptyState from 'src/components/shared/EmptyState'
import { exportToExcel } from 'src/utils/export-to-excel'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import { DataGrid } from '@mui/x-data-grid'
import {
  addInventoryItem,
  clearInventoryItems,
  getInventoryItems,
} from 'src/store/inventory/inventorySlice'
import toast from 'react-hot-toast'
import _ from 'lodash'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { AddOutlined } from '@mui/icons-material'

const initialValues = {
  itemName: '',
  itemWeight: '',
  itemVolume: '',
  itemRoom: '',
}

const Page = () => {
  const [currentJobs, setCurrentJobs] = useState([])
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [newItem, setNewItem] = useState(initialValues)
  const [anchorEl, setAnchorEl] = useState(null)

  const { company } = useSelector((state) => state.company)
  const { user } = useSelector((state) => state.auth)
  const { inventoryItems, isLoading } = useSelector((state) => state.inventory)
  console.log(inventoryItems)

  const dispatch = useDispatch()
  // usePageView()

  useEffect(() => {
    dispatch(getInventoryItems(user.company))
    return () => {
      dispatch(clearInventoryItems())
    }
  }, [user, dispatch])

  // useEffect(() => {
  //   if (jobs !== null && !isLoading) setCurrentJobs(jobs)
  // }, [jobs, isLoading])

  // TODO: update fields to match inventory
  const exportInventory = useCallback(() => {
    const exportInventory = currentJobs.map((job) => {
      return {
        customer: job.customer?.customerName,
        jobDate: new Date(job.jobDate).toLocaleDateString(),
        jobType: job.jobType,
        pickUpAddress: job.pickUpAddress || '',
        dropOffAddress: job.dropOffAddress || '',
        isPaid: job.isPaid,
        estimateTotal: job.estimate.totalCharges,
        createdBy: job.createdBy?.name,
      }
    })
    exportToExcel(
      exportInventory,
      `${company.companyName}-items(${new Date().toLocaleDateString()})`
    )
  }, [currentJobs, company])

  const onChange = (e) => {
    const { name, value } = e.target

    // Check if the field is itemWeight or itemVolume
    if (name === 'itemWeight' || name === 'itemVolume') {
      // Check if the value is a valid number
      if (isNaN(value)) {
        // If it's not a valid number, keep the previous value
        return
      } else {
        // If it's a valid number, update the state with the new value
        setNewItem({ ...newItem, [name]: value })
      }
    } else {
      // For other fields, just update normally
      setNewItem({ ...newItem, [name]: value })
    }
  }

  const handleCreateClick = () => {
    const itemToAdd = {
      ...newItem,
      company: company._id,
      createdBy: user._id,
    }
    dispatch(addInventoryItem(itemToAdd))
      .unwrap()
      .then(() => {
        toast.success('Successfully added new item')
        handleModalClose()
      })
  }

  const handleModalClose = () => {
    setCreateModalOpen(false)
    setNewItem(initialValues)
  }

  const handleItemActionClick = (event) => {
    setAnchorEl(event.currentTarget) // Open menu when the IconButton is clicked
  }

  const handleClose = () => {
    setAnchorEl(null) // Close the menu
  }

  const handleEditClick = (row) => {
    console.log('Edit', row)
    handleClose()
  }

  const handleDeleteClick = (row) => {
    console.log('Delete', row)
    handleClose()
  }

  const finalColumns = useMemo(() => [
    {
      headerName: 'Item Name',
      field: 'itemName',
      type: 'string',
      flex: 1,
    },
    {
      headerName: 'Item Weight',
      field: 'itemWeight',
      type: 'string',
      flex: 1,
    },
    {
      headerName: 'Item Volume',
      field: 'itemVolume',
      type: 'string',
      flex: 1,
    },
    {
      headerName: `Created By`,
      field: 'createdBy',
      type: 'string',
      flex: 1,
      valueGetter: ({ name }) => name,
    },
    {
      headerName: 'Date Created',
      field: 'createdAt',
      type: 'date',
      flex: 1,
      valueFormatter: (date) => new Date(date).toLocaleDateString(),
    },
    {
      headerName: 'Actions',
      field: '_id',
      type: 'string',
      disableColumnMenu: true,
      filterable: false,
      sortable: false,
      renderCell: (row) => (
        <>
          <IconButton onClick={handleItemActionClick}>
            <MoreVertOutlinedIcon fontSize='small' />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleEditClick(row)}>
              <ListItemIcon>
                <EditOutlinedIcon fontSize='small' />
              </ListItemIcon>
              Edit
            </MenuItem>
            <MenuItem onClick={() => handleDeleteClick(row)}>
              <ListItemIcon>
                <DeleteOutlineOutlinedIcon fontSize='small' />
              </ListItemIcon>
              Delete
            </MenuItem>
          </Menu>
        </>
      ),
    },
  ])

  if (isLoading || !inventoryItems) return <Spinner />
  return (
    <>
      <Seo title='Dashboard: Inventory Item List' />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth='xl'>
          <Stack spacing={4}>
            <Stack direction='row' justifyContent='space-between' spacing={4}>
              <Stack spacing={1}>
                <Typography variant='h4'>Inventory Items</Typography>
                <Stack alignItems='center' direction='row' spacing={1}>
                  <Button
                    color='inherit'
                    size='small'
                    onClick={exportInventory}
                    disabled={!inventoryItems?.length}
                    startIcon={
                      <SvgIcon>
                        <DownloadOutlinedIcon />
                      </SvgIcon>
                    }
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <Stack alignItems='center' direction='row' spacing={3}>
                <Button
                  color='primary'
                  onClick={() => setCreateModalOpen(true)}
                  startIcon={
                    <SvgIcon>
                      <AddOutlined />
                    </SvgIcon>
                  }
                  variant='contained'
                >
                  Add New Item
                </Button>
              </Stack>
            </Stack>

            <>
              <Card>
                <DataGrid
                  getRowId={_.property('_id')}
                  loading={isLoading || !inventoryItems}
                  rows={inventoryItems || []}
                  columns={finalColumns}
                  slotProps={{
                    toolbar: {
                      showQuickFilter: true,
                    },
                  }}
                />
              </Card>
            </>
          </Stack>
        </Container>
      </Box>
      <Dialog
        open={createModalOpen}
        onClose={handleModalClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Create New Item</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: 13, mb: 2 }}>
            Items you add here will be available for use in your inventory while
            creating estimates
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='itemName'
            name='itemName'
            label='Name'
            type='text'
            fullWidth
            onChange={onChange}
            value={newItem.itemName}
          />
          <TextField
            margin='dense'
            id='itemWeight'
            name='itemWeight'
            label='Item Weight'
            type='text'
            fullWidth
            onChange={onChange}
            value={newItem.itemWeight}
          />
          <TextField
            margin='dense'
            id='itemVolume'
            name='itemVolume'
            label='Item Volume'
            type='text'
            fullWidth
            onChange={onChange}
            value={newItem.itemVolume}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color='primary'>
            Cancel
          </Button>
          <Button
            disabled={
              newItem.itemName.length === 0 ||
              newItem.itemWeight.length === 0 ||
              newItem.itemVolume.length === 0
            }
            onClick={handleCreateClick}
            color='primary'
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Page
