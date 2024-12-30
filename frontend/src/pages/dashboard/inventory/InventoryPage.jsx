import { useEffect, useMemo, useState } from 'react'
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
  Alert,
} from '@mui/material'
import { Seo } from 'src/components/seo'
import { usePageView } from 'src/hooks/use-page-view'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import {
  addInventoryItem,
  clearInventoryItems,
  deleteInventoryItem,
  getInventoryItems,
  updateInventoryItem,
} from 'src/store/inventory/inventorySlice'
import toast from 'react-hot-toast'
import _ from 'lodash'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'

const initialValues = {
  itemName: '',
  itemWeight: '',
  itemVolume: '',
  itemRoom: '',
}

const Page = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [newItem, setNewItem] = useState(initialValues)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [isEdit, setIsEdit] = useState(false)

  const { company } = useSelector((state) => state.company)
  const { user } = useSelector((state) => state.auth)
  const { inventoryItems, isLoading } = useSelector((state) => state.inventory)

  const dispatch = useDispatch()
  usePageView()

  useEffect(() => {
    dispatch(getInventoryItems(user.company))
    return () => {
      dispatch(clearInventoryItems())
    }
  }, [user, dispatch])

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

  // Actions ---------------------
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

  const handleUpdateClick = () => {
    const itemToAdd = {
      ...newItem,
    }
    dispatch(updateInventoryItem(itemToAdd))
      .unwrap()
      .then(() => {
        toast.success('Successfully updated item')
        dispatch(getInventoryItems(user.company))
        handleModalClose()
      })
  }

  const handleDeleteConfirmClick = () => {
    dispatch(deleteInventoryItem(deleteId))
      .unwrap()
      .then(() => {
        toast.success('Successfully deleted item')
        dispatch(getInventoryItems(user.company))
        handleDeleteModalClose()
      })
  }

  // helpers ---------------------
  const handleModalClose = () => {
    setCreateModalOpen(false)
    setIsEdit(false)
    setNewItem(initialValues)
  }

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false)
    setDeleteId(null)
  }

  const handleEditClick = (item) => {
    setNewItem(item)
    setIsEdit(true)
    setCreateModalOpen(true)
  }

  const handleDeleteClick = (id) => {
    console.log('Delete', id)
    setDeleteModalOpen(true)
    setDeleteId(id)
  }

  // Columns ---------------------
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
      headerName: '',
      field: 'itemRoom',
      type: 'boolean',
      disableExport: true,
      sortable: false,
      filterable: false,
      width: 50,
      disableColumnMenu: true,
      renderCell: (row) => (
        <>
          <IconButton onClick={() => handleEditClick(row.row)}>
            <EditOutlinedIcon fontSize='small' />
          </IconButton>
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
      renderCell: (row) => (
        <>
          <IconButton onClick={() => handleDeleteClick(row.row._id)}>
            <DeleteOutlineOutlinedIcon fontSize='small' />
          </IconButton>
        </>
      ),
    },
  ])

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
          <Stack spacing={8}>
            <Stack direction='row' justifyContent='space-between' spacing={4}>
              <Stack spacing={1}>
                <Typography variant='h4'>Inventory Items</Typography>
                <Stack alignItems='center' direction='row' spacing={1}></Stack>
              </Stack>
              <Stack alignItems='center' direction='row' spacing={3}>
                <Button
                  color='primary'
                  onClick={() => setCreateModalOpen(true)}
                  startIcon={
                    <SvgIcon>
                      <AddOutlinedIcon />
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
                  sx={{ minHeight: 400 }}
                  slots={{ toolbar: GridToolbar }}
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
      {/* EDIT / CREATE MODAL */}
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
            onClick={isEdit ? handleUpdateClick : handleCreateClick}
            color='primary'
          >
            {isEdit ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
      {/* Delete Modal */}
      <Dialog
        open={deleteModalOpen}
        onClose={handleDeleteModalClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Delete Inventory Item</DialogTitle>
        <DialogContent>
          <Alert severity='error'>
            Are you sure you want to delete this item? This action cannot be
            undone
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
