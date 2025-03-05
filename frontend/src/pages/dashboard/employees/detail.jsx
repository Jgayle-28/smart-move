import { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Grid2 as Grid,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material'
import { Seo } from 'src/components/seo'
import { usePageView } from 'src/hooks/use-page-view'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import Spinner from 'src/components/shared/Spinner'
import { toast } from 'react-hot-toast'
import {
  clearFocusEmployee,
  getCurrentEmployee,
  updateEmployee,
} from 'src/store/employees/employeeSlice'
import EmployeeEditPageHeader from 'src/components/employees/EmployeeEditPageHeader'
import { EmployeeBasicDetails } from 'src/components/employees/EmployeeBasicDetails'
import EmployeeJobs from 'src/components/employees/EmployeeJobs'
import { initialFormState } from 'src/constants/employees'
import EmployeeForm from 'src/components/employees/EmployeeForm'

const Page = () => {
  const [employeeModalOpen, setEmployeeModalOpen] = useState(false)
  const [formData, setFormData] = useState(initialFormState)

  const dispatch = useDispatch()
  const { employeeId } = useParams()

  const { isLoading, focusEmployee } = useSelector((state) => state.employees)

  useEffect(() => {
    if (employeeId) dispatch(getCurrentEmployee(employeeId))
    return () => {
      dispatch(clearFocusEmployee())
    }
  }, [employeeId])

  useEffect(() => {
    if (focusEmployee) setFormData(focusEmployee)
  }, [focusEmployee])

  const handleEmployeeModalClose = () => {
    setEmployeeModalOpen(false)
    setFormData(initialFormState)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleEmployeeSaveClick = () => {
    dispatch(updateEmployee(formData))
      .unwrap()
      .then((res) => {
        toast.success('Employee successfully updated')
        // dispatch(getEmployees(user.company))
        setEmployeeModalOpen(false)
        // setFormData(initialFormState)
      })
  }

  usePageView()

  if (isLoading || !focusEmployee) return <Spinner />
  return (
    <>
      <Seo title='Dashboard: Employee Details' />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth='xl'>
          <Stack spacing={4}>
            {/* Header */}
            <Stack spacing={4}>
              <EmployeeEditPageHeader
                editClick={() => setEmployeeModalOpen(true)}
                employee={focusEmployee}
                isDetails={true}
              />
            </Stack>
            {/* Main details */}
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, lg: 4 }}>
                <EmployeeBasicDetails employee={focusEmployee} />
              </Grid>
              <Grid size={{ xs: 12, lg: 8 }}>
                <EmployeeJobs employeeJobs={focusEmployee.jobs} />
              </Grid>
            </Grid>
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
    </>
  )
}

export default Page
