import React, { useState } from 'react'
import {
  Button,
  Link,
  Stack,
  SvgIcon,
  Typography,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { paths } from 'src/paths'
import { RouterLink } from '../router-link'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import { SeverityPill } from '../severity-pill'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { useDispatch } from 'react-redux'
import { toast } from 'react-hot-toast'
import { useRouter } from 'src/hooks/use-router'
import { deleteEmployee } from 'src/store/employees/employeeSlice'

function EmployeeEditPageHeader({ editClick, employee, isDetails }) {
  const dispatch = useDispatch()
  const router = useRouter()
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  const handleOpenConfirmModal = () => {
    setIsConfirmModalOpen(true)
  }

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false)
  }

  const handleEmployeeDelete = () => {
    dispatch(deleteEmployee(employee._id))
      .unwrap()
      .then(() => {
        toast.success('Employee successfully deleted')
        router.push(paths.dashboard.employees.index)
      })
      .finally(() => {
        handleCloseConfirmModal()
      })
  }

  if (!employee) return null
  return (
    <Container maxWidth='xl'>
      <Stack spacing={4}>
        <div>
          <Link
            color='text.primary'
            component={RouterLink}
            href={paths.dashboard.employees.index}
            sx={{
              alignItems: 'center',
              display: 'inline-flex',
            }}
            underline='hover'
          >
            <SvgIcon sx={{ mr: 1 }} fontSize='small'>
              <ArrowBackOutlinedIcon />
            </SvgIcon>
            <Typography variant='subtitle2'>Employees</Typography>
          </Link>
        </div>
        <Stack
          alignItems='flex-start'
          direction={{
            xs: 'column',
            md: 'row',
          }}
          justifyContent='space-between'
          spacing={4}
        >
          <Stack
            justifyContent='space-between'
            alignItems='center'
            spacing={2}
            direction={{
              xs: 'column',
              md: 'row',
            }}
            sx={{ width: '100%' }}
          >
            <Stack alignItems='center' direction='row' spacing={2}>
              <Stack spacing={1}>
                <Typography variant='h4'>{employee.name}</Typography>
                <Stack alignItems='center' direction='row' spacing={1}>
                  <SeverityPill>{employee.email || ''}</SeverityPill>
                </Stack>
              </Stack>
            </Stack>

            <Stack
              sx={{ marginLeft: 'auto' }}
              alignItems='center'
              direction='row'
              spacing={2}
            >
              {isDetails && (
                <>
                  <Button
                    onClick={editClick}
                    size='small'
                    endIcon={
                      <SvgIcon fontSize='small'>
                        <EditOutlinedIcon />
                      </SvgIcon>
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    color='error'
                    variant='outlined'
                    size='small'
                    onClick={handleOpenConfirmModal}
                  >
                    Delete
                  </Button>
                </>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      {/* Confirmation Modal */}
      <Dialog
        open={isConfirmModalOpen}
        onClose={handleCloseConfirmModal}
        aria-labelledby='confirm-delete-title'
        aria-describedby='confirm-delete-description'
      >
        <DialogTitle id='confirm-delete-title'>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id='confirm-delete-description'>
            Are you sure you want to delete this employee? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmModal} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={handleEmployeeDelete}
            color='error'
            variant='contained'
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default EmployeeEditPageHeader
